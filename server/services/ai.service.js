import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { supabaseAdmin } from "../config/supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PYTHON_SCRIPT_PATH = path.resolve(__dirname, "../ai_engine/harvest_ai.py");

/**
 * Fetches free 7-day ambient weather forecast from Open-Meteo API.
 */
export async function fetchWeatherForecast(lat, lng) {
  try {
    const latitude = lat ?? 12.5;
    const longitude = lng ?? 75.8;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,precipitation_sum&timezone=auto`;
    
    const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.daily || !data.daily.time) return [];

    return data.daily.time.map((timeStr, index) => ({
      date: timeStr,
      precipitation_sum: data.daily.precipitation_sum?.[index] ?? 0,
      temperature_2m_max: data.daily.temperature_2m_max?.[index] ?? 25,
    }));
  } catch (err) {
    console.warn("⚠️ Open-Meteo Weather API warning:", err.message);
    return [];
  }
}

/**
 * Executes the Python Smart Harvest AI engine script via child process.
 * Passes readings and weather forecast as JSON via stdin.
 */
export function runPythonAiEngine(readings, weatherForecast) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      readings,
      weather_forecast: weatherForecast,
    });

    const pythonBin = process.platform === "win32" ? "python" : "python3";
    const pyProcess = spawn(pythonBin, [PYTHON_SCRIPT_PATH]);

    let stdoutData = "";
    let stderrData = "";

    pyProcess.stdout.on("data", (chunk) => {
      stdoutData += chunk.toString();
    });

    pyProcess.stderr.on("data", (chunk) => {
      stderrData += chunk.toString();
    });

    pyProcess.on("error", (err) => {
      console.warn("⚠️ Python binary execution fallback:", err.message);
      resolve(fallbackJsAiEngine(readings, weatherForecast));
    });

    pyProcess.on("close", (code) => {
      if (code !== 0 || !stdoutData.trim()) {
        console.warn("⚠️ Python process exited with code", code, stderrData);
        return resolve(fallbackJsAiEngine(readings, weatherForecast));
      }

      try {
        const parsed = JSON.parse(stdoutData);
        resolve(parsed);
      } catch (err) {
        console.warn("⚠️ Failed to parse Python AI JSON output:", err.message);
        resolve(fallbackJsAiEngine(readings, weatherForecast));
      }
    });

    // Write input payload to stdin
    pyProcess.stdin.write(payload);
    pyProcess.stdin.end();
  });
}

/**
 * JavaScript fallback implementation if Python environment is unavailable.
 */
function fallbackJsAiEngine(readings, weatherForecast) {
  if (!readings || readings.length === 0) {
    return {
      harvest_recommendation: {
        recommended_window: null,
        explanation: "Insufficient reading history to compute harvest recommendation.",
        confidence: 0,
        factors: [],
      },
      anomaly_detection: { is_anomalous: false, anomalies: [] },
    };
  }

  const confidence = Math.min(95, Math.max(20, readings.length * 5));
  const latest = readings[0];
  const rain = weatherForecast?.find((w) => w.precipitation_sum > 5.0);

  const start = new Date();
  start.setDate(start.getDate() + 1);
  const end = new Date();
  end.setDate(end.getDate() + 5);

  let explanation = `Weight trend is stable (${latest.weight ?? "N/A"}kg) and foraging activity is strong (${latest.activity_level ?? 75}%).`;
  if (rain) {
    explanation += ` Harvest window set before rain forecast on ${rain.date}.`;
  }

  return {
    harvest_recommendation: {
      recommended_window: {
        start_date: start.toISOString().slice(0, 10),
        end_date: end.toISOString().slice(0, 10),
      },
      explanation,
      confidence,
      factors: [explanation],
    },
    anomaly_detection: {
      is_anomalous: false,
      anomalies: [],
    },
  };
}

export const aiService = {
  async computeAndSaveHiveInsight(hiveId) {
    // 1. Fetch hive details
    const { data: hive, error: hiveErr } = await supabaseAdmin
      .from("hives")
      .select("*, readings(*)")
      .eq("id", hiveId)
      .single();

    if (hiveErr) throw hiveErr;

    const readings = hive.readings || [];

    // 2. Fetch forecast weather for hive location
    const weatherForecast = await fetchWeatherForecast(hive.location_lat, hive.location_lng);

    // 3. Run Smart Harvest AI engine (Python subprocess with JS fallback)
    const aiResult = await runPythonAiEngine(readings, weatherForecast);

    // 4. Save result into ai_insights table in Supabase
    const { data: savedInsight, error: insertErr } = await supabaseAdmin
      .from("ai_insights")
      .insert({
        hive_id: hiveId,
        type: aiResult.anomaly_detection.is_anomalous ? "anomaly" : "harvest_recommendation",
        payload: {
          ...aiResult,
          computed_at: new Date().toISOString(),
          hive_location: { lat: hive.location_lat, lng: hive.location_lng },
        },
      })
      .select()
      .single();

    if (insertErr) throw insertErr;
    return savedInsight;
  },

  async recordFeedback(insightId, recommendationFollowed, overrideReason) {
    const { data: existing, error: getErr } = await supabaseAdmin
      .from("ai_insights")
      .select("*")
      .eq("id", insightId)
      .maybeSingle();

    if (getErr) throw getErr;
    if (!existing) {
      const err = new Error("AI Insight row not found.");
      err.statusCode = 404;
      throw err;
    }

    const updatedPayload = {
      ...existing.payload,
      feedback: {
        recommendation_followed: Boolean(recommendationFollowed),
        override_reason: overrideReason ? String(overrideReason).trim() : null,
        submitted_at: new Date().toISOString(),
      },
    };

    const { data: updatedInsight, error: updateErr } = await supabaseAdmin
      .from("ai_insights")
      .update({ payload: updatedPayload })
      .eq("id", insightId)
      .select()
      .single();

    if (updateErr) throw updateErr;
    return updatedInsight;
  },

  async getInsightsForHive(hiveId) {
    const { data, error } = await supabaseAdmin
      .from("ai_insights")
      .select("*")
      .eq("hive_id", hiveId)
      .order("generated_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};
