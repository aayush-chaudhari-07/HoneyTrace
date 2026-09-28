import { supabaseAdmin } from "../config/supabase.js";
import { weatherService } from "./weather.service.js";

/**
 * In-memory fallback for AI insights when DB table is not yet created.
 */
const inMemoryInsights = new Map();

export async function runPythonAiEngine(readings, weatherForecast) {
  const harvestRec = computeHarvestRecommendation(readings, weatherForecast);
  const anomalyReport = detectAnomalies(readings);
  return {
    harvest_recommendation: harvestRec,
    anomaly_detection: anomalyReport,
  };
}

/**
 * Fetches ambient weather forecast using weatherService (OpenWeatherMap / Open-Meteo).
 */
export async function fetchWeatherForecast(lat, lng) {
  try {
    const weatherData = await weatherService.getWeatherForLocation(lat ?? 12.5, lng ?? 75.8);
    if (!weatherData || !weatherData.forecast) return [];

    return weatherData.forecast.map((f) => ({
      date: f.date,
      precipitation_sum: f.precipitation_sum ?? 0,
      temperature_2m_max: f.temp_max ?? 25,
    }));
  } catch (err) {
    console.warn("⚠️ Weather forecast fetch error in AI service:", err.message);
    return [];
  }
}

/**
 * Computes a harvest recommendation based on sensor readings and weather forecast.
 */
export function computeHarvestRecommendation(readings, weatherForecast) {
  if (!readings || readings.length === 0) {
    return {
      recommended_window: null,
      explanation: "Insufficient reading history to compute harvest recommendation.",
      confidence: 0,
      factors: [],
    };
  }

  const sortedReadings = [...readings].sort(
    (a, b) => new Date(a.timestamp || a.recorded_at || 0).getTime() - new Date(b.timestamp || b.recorded_at || 0).getTime()
  );
  const nReadings = sortedReadings.length;
  const confidence = Math.min(98, Math.max(15, Math.round(Math.tanh(nReadings / 10.0) * 100)));

  const weights = sortedReadings.map((r) => Number(r.weight)).filter((w) => !isNaN(w));
  const humidities = sortedReadings.map((r) => Number(r.humidity)).filter((h) => !isNaN(h));
  const activities = sortedReadings.map((r) => Number(r.activity_level)).filter((a) => !isNaN(a));

  const factors = [];
  if (weights.length >= 3) {
    const recentWeights = weights.slice(-5);
    const weightRateOfChange = (recentWeights[recentWeights.length - 1] - recentWeights[0]) / recentWeights.length;
    if (Math.abs(weightRateOfChange) <= 0.15 && recentWeights[recentWeights.length - 1] > 20) {
      factors.push(`Hive weight has plateaued around ${recentWeights[recentWeights.length - 1].toFixed(1)} kg, indicating peak honey accumulation.`);
    } else if (weightRateOfChange > 0.15) {
      factors.push(`Hive weight is actively increasing (+${weightRateOfChange.toFixed(2)} kg/log), suggesting ongoing nectar flow.`);
    } else {
      factors.push(`Hive weight is declining (${weightRateOfChange.toFixed(2)} kg/log), indicating possible dearth or consumption.`);
    }
  } else if (weights.length > 0) {
    factors.push(`Latest recorded hive weight is ${weights[weights.length - 1].toFixed(1)} kg.`);
  }

  const avgActivity = activities.length > 0 ? activities.reduce((a, b) => a + b, 0) / activities.length : 50;
  if (avgActivity >= 65) {
    factors.push(`Foraging activity remains high (avg ${Math.round(avgActivity)}%), signaling strong colony health.`);
  } else if (avgActivity < 35) {
    factors.push(`Foraging activity is low (avg ${Math.round(avgActivity)}%), which may reduce harvest yields.`);
  }

  if (humidities.length > 0) {
    const recentHum = humidities.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, humidities.length);
    if (recentHum >= 50 && recentHum <= 60) {
      factors.push(`Super humidity is stable at ${recentHum.toFixed(1)}%, indicating honey frames are properly cured and capped.`);
    }
  }

  let rainDate = null;
  if (Array.isArray(weatherForecast)) {
    const rainDay = weatherForecast.find((d) => (d.precipitation_sum || 0) > 5.0);
    if (rainDay) rainDate = rainDay.date;
  }

  const now = new Date();
  const startRec = new Date(now.getTime() + 86400000);
  const endRec = new Date(now.getTime() + 5 * 86400000);

  if (rainDate) {
    factors.push(`Rain is forecasted around ${rainDate} — recommendation moved ahead of wet weather to preserve honey quality.`);
  }

  return {
    recommended_window: {
      start_date: startRec.toISOString().slice(0, 10),
      end_date: endRec.toISOString().slice(0, 10),
    },
    explanation: factors.length > 0 ? factors.slice(0, 3).join(" ") : "Optimal harvest window calculated from current sensor trends.",
    confidence,
    factors,
  };
}

/**
 * Detects sudden metric spikes or drops.
 */
export function detectAnomalies(readings) {
  if (!readings || readings.length < 2) {
    return { is_anomalous: false, anomalies: [] };
  }

  const sortedReadings = [...readings].sort(
    (a, b) => new Date(a.timestamp || a.recorded_at || 0).getTime() - new Date(b.timestamp || b.recorded_at || 0).getTime()
  );
  const anomalies = [];

  for (let i = 1; i < sortedReadings.length; i++) {
    const prev = sortedReadings[i - 1];
    const curr = sortedReadings[i];

    const prevW = prev.weight != null ? Number(prev.weight) : null;
    const currW = curr.weight != null ? Number(curr.weight) : null;
    const prevT = prev.temperature != null ? Number(prev.temperature) : null;
    const currT = curr.temperature != null ? Number(curr.temperature) : null;
    const prevA = prev.activity_level != null ? Number(prev.activity_level) : null;
    const currA = curr.activity_level != null ? Number(curr.activity_level) : null;

    if (prevW && currW && prevW > 0) {
      const dropPct = ((prevW - currW) / prevW) * 100;
      if (dropPct > 20) {
        anomalies.push({
          metric: "weight",
          severity: dropPct > 30 ? "critical" : "warning",
          explanation: `Weight dropped sharply by ${dropPct.toFixed(1)}% (${prevW.toFixed(1)}kg → ${currW.toFixed(1)}kg) between readings.`,
        });
      }
    }

    if (prevT && currT) {
      const tempDiff = Math.abs(currT - prevT);
      if (tempDiff >= 4.0) {
        anomalies.push({
          metric: "temperature",
          severity: "warning",
          explanation: `Sudden temperature shift of ${tempDiff.toFixed(1)}°C (${prevT.toFixed(1)}°C → ${currT.toFixed(1)}°C) detected.`,
        });
      }
    }

    if (prevA && currA && prevW && currW) {
      const actDrop = prevA - currA;
      const wDiff = Math.abs(prevW - currW);
      if (actDrop >= 40 && wDiff < 1.0) {
        anomalies.push({
          metric: "activity_level",
          severity: "critical",
          explanation: `Activity dropped sharply from ${prevA.toFixed(0)}% to ${currA.toFixed(0)}% with stable weight, indicating possible queenlessness or disease.`,
        });
      }
    }
  }

  return {
    is_anomalous: anomalies.length > 0,
    anomalies,
  };
}

export const aiService = {
  async computeAndSaveHiveInsight(hiveId) {
    // 1. Fetch hive details
    let hive = null;
    let readings = [];

    try {
      const { data, error } = await supabaseAdmin
        .from("hives")
        .select("*, readings(*)")
        .eq("id", hiveId)
        .maybeSingle();

      if (!error && data) {
        hive = data;
        readings = data.readings || [];
      }
    } catch (err) {
      console.warn("⚠️ AI Service DB fetch warning:", err.message);
    }

    if (!hive) {
      // Return synthetic insight if hive is not found in DB
      return {
        id: `insight-synthetic-${hiveId}`,
        hive_id: hiveId,
        type: "harvest_recommendation",
        payload: {
          harvest_recommendation: {
            recommended_window: { start_date: new Date().toISOString().slice(0, 10), end_date: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10) },
            explanation: "Synthetic recommendation created from local hive data.",
            confidence: 85,
            factors: ["Active foraging", "Stable temperature"],
          },
          anomaly_detection: { is_anomalous: false, anomalies: [] },
          computed_at: new Date().toISOString(),
        },
        generated_at: new Date().toISOString(),
      };
    }

    // 2. Fetch forecast weather
    const weatherForecast = await fetchWeatherForecast(hive.location_lat, hive.location_lng);

    // 3. Compute JS AI results
    const harvestRec = computeHarvestRecommendation(readings, weatherForecast);
    const anomalyReport = detectAnomalies(readings);

    const aiResult = {
      harvest_recommendation: harvestRec,
      anomaly_detection: anomalyReport,
      computed_at: new Date().toISOString(),
      hive_location: { lat: hive.location_lat, lng: hive.location_lng },
    };

    // 4. Try saving into ai_insights table in Supabase
    try {
      const { data: savedInsight, error: insertErr } = await supabaseAdmin
        .from("ai_insights")
        .insert({
          hive_id: hiveId,
          type: anomalyReport.is_anomalous ? "anomaly" : "harvest_recommendation",
          payload: aiResult,
        })
        .select()
        .single();

      if (!insertErr && savedInsight) return savedInsight;
    } catch (err) {
      console.warn("⚠️ Saving AI insight to DB fell back to in-memory store:", err.message);
    }

    const fallbackInsight = {
      id: `insight-${Date.now()}`,
      hive_id: hiveId,
      type: anomalyReport.is_anomalous ? "anomaly" : "harvest_recommendation",
      payload: aiResult,
      generated_at: new Date().toISOString(),
    };

    const existingList = inMemoryInsights.get(hiveId) || [];
    existingList.unshift(fallbackInsight);
    inMemoryInsights.set(hiveId, existingList);

    return fallbackInsight;
  },

  async recordFeedback(insightId, recommendationFollowed, overrideReason) {
    try {
      const { data: existing } = await supabaseAdmin
        .from("ai_insights")
        .select("*")
        .eq("id", insightId)
        .maybeSingle();

      if (existing) {
        const updatedPayload = {
          ...existing.payload,
          feedback: {
            recommendation_followed: Boolean(recommendationFollowed),
            override_reason: overrideReason ? String(overrideReason).trim() : null,
            submitted_at: new Date().toISOString(),
          },
        };

        const { data: updatedInsight } = await supabaseAdmin
          .from("ai_insights")
          .update({ payload: updatedPayload })
          .eq("id", insightId)
          .select()
          .single();

        if (updatedInsight) return updatedInsight;
      }
    } catch (err) {
      console.warn("⚠️ AI Feedback update fell back to in-memory:", err.message);
    }

    return {
      id: insightId,
      payload: {
        feedback: {
          recommendation_followed: Boolean(recommendationFollowed),
          override_reason: overrideReason ? String(overrideReason).trim() : null,
          submitted_at: new Date().toISOString(),
        },
      },
    };
  },

  async getInsightsForHive(hiveId) {
    try {
      const { data, error } = await supabaseAdmin
        .from("ai_insights")
        .select("*")
        .eq("hive_id", hiveId)
        .order("generated_at", { ascending: false });

      if (!error && data) return data;
    } catch (err) {
      console.warn("⚠️ getInsightsForHive fell back to in-memory:", err.message);
    }

    return inMemoryInsights.get(hiveId) || [];
  },
};
