import { supabaseAdmin } from "../config/supabase.js";
import { weatherService } from "./weather.service.js";

/**
 * Validates sensor reading values to ensure they fall within realistic ranges.
 */

export function validateReadingRanges(body) {
  const errors = [];
  const { temperature, humidity, weight, activity_level } = body;

  if (temperature !== undefined && temperature !== null && temperature !== "") {
    const t = Number(temperature);
    if (isNaN(t) || t < -20 || t > 60) {
      errors.push("Temperature must be a realistic value between -20°C and 60°C");
    }
  }

  if (humidity !== undefined && humidity !== null && humidity !== "") {
    const h = Number(humidity);
    if (isNaN(h) || h < 0 || h > 100) {
      errors.push("Humidity must be a percentage between 0% and 100%");
    }
  }

  if (weight !== undefined && weight !== null && weight !== "") {
    const w = Number(weight);
    if (isNaN(w) || w < 0 || w > 200) {
      errors.push("Weight must be a value between 0kg and 200kg");
    }
  }

  if (activity_level !== undefined && activity_level !== null && activity_level !== "") {
    const a = Number(activity_level);
    if (isNaN(a) || a < 0 || a > 100) {
      errors.push("Activity level must be a percentage between 0% and 100%");
    }
  }

  return errors;
}

/**
 * Computes hive health category and anomaly reasons based on current & previous readings.
 */
export function evaluateHiveHealth(currentReading, previousReading) {
  const reasons = [];
  let isSevereDrop = false;

  if (currentReading) {
    const temp = currentReading.temperature !== null ? Number(currentReading.temperature) : NaN;
    const hum = currentReading.humidity !== null ? Number(currentReading.humidity) : NaN;
    const weight = currentReading.weight !== null ? Number(currentReading.weight) : NaN;
    const activity = currentReading.activity_level !== null ? Number(currentReading.activity_level) : NaN;

    // Temperature check (32°C – 36°C optimal)
    if (!isNaN(temp) && (temp < 32 || temp > 36)) {
      reasons.push(`Temperature is ${temp}°C (outside optimal 32–36°C)`);
    }

    // Humidity check (50% – 60% optimal)
    if (!isNaN(hum) && (hum < 50 || hum > 60)) {
      reasons.push(`Humidity is ${hum}% (outside optimal 50–60%)`);
    }

    // Activity check (< 30% low threshold)
    if (!isNaN(activity) && activity < 30) {
      reasons.push(`Flight activity level is low at ${activity}%`);
    }

    // Weight drop check
    if (previousReading && previousReading.weight != null) {
      const prevW = Number(previousReading.weight);
      if (!isNaN(prevW) && prevW > 0 && !isNaN(weight)) {
        const dropPct = ((prevW - weight) / prevW) * 100;
        if (dropPct > 15) {
          reasons.push(`Weight dropped ${dropPct.toFixed(1)}% since last reading`);
          if (dropPct > 30) {
            isSevereDrop = true;
          }
        }
      }
    }
  }

  let category = "healthy";
  if (isSevereDrop || reasons.length >= 2) {
    category = "critical";
  } else if (reasons.length === 1) {
    category = "needs_attention";
  }

  const primaryReason = reasons.length > 0 ? reasons[0] : "Hive metrics are within optimal ranges";

  return { category, reasons, primaryReason };
}

export const hivesService = {
  async listHives(ownerId) {
    let query = supabaseAdmin
      .from("hives")
      .select("*, readings(*)");

    if (ownerId) {
      query = query.eq("owner_id", ownerId);
    }

    const { data: hives, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;

    // Attach latest_reading summary to each hive
    return hives.map((h) => {
      const sortedReadings = [...(h.readings || [])].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      const latestReading = sortedReadings[0] || null;
      const { readings, ...hiveFields } = h;
      return {
        ...hiveFields,
        latest_reading: latestReading,
      };
    });
  },

  async getHiveById(id) {
    const { data, error } = await supabaseAdmin
      .from("hives")
      .select("*, readings(*)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    // Sort readings descending by timestamp
    const readings = [...(data.readings || [])].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Fetch weather context for hive coordinates with fallback handling
    let weather = null;
    try {
      weather = await weatherService.getWeatherForLocation(data.location_lat, data.location_lng);
    } catch (err) {
      console.warn("⚠️ Weather fetch fallback for hive:", err.message);
    }

    return {
      ...data,
      readings,
      latest_reading: readings[0] || null,
      weather,
    };
  },


  async createHive(hiveData) {
    const { data, error } = await supabaseAdmin
      .from("hives")
      .insert(hiveData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateHive(id, updateData) {
    const { data, error } = await supabaseAdmin
      .from("hives")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addReadingAndEvaluateHealth(hiveId, readingPayload) {
    // 1. Fetch previous readings for this hive
    const { data: existingReadings } = await supabaseAdmin
      .from("readings")
      .select("*")
      .eq("hive_id", hiveId)
      .order("timestamp", { ascending: false });

    const previousReading = existingReadings && existingReadings.length > 0 ? existingReadings[0] : null;

    // 2. Insert new reading
    const { data: newReading, error: readingError } = await supabaseAdmin
      .from("readings")
      .insert({
        hive_id: hiveId,
        temperature: readingPayload.temperature !== undefined ? readingPayload.temperature : null,
        humidity: readingPayload.humidity !== undefined ? readingPayload.humidity : null,
        weight: readingPayload.weight !== undefined ? readingPayload.weight : null,
        activity_level: readingPayload.activity_level !== undefined ? readingPayload.activity_level : null,
        notes: readingPayload.notes || null,
        timestamp: readingPayload.timestamp || new Date().toISOString(),
      })
      .select()
      .single();

    if (readingError) throw readingError;

    // 3. Evaluate new health category
    const health = evaluateHiveHealth(newReading, previousReading);

    // 4. Update hive with new current_health_category
    const { data: updatedHive, error: hiveError } = await supabaseAdmin
      .from("hives")
      .update({ current_health_category: health.category })
      .eq("id", hiveId)
      .select()
      .single();

    if (hiveError) throw hiveError;

    return {
      reading: newReading,
      hive: updatedHive,
      health,
    };
  },

  async getReadingsForHive(hiveId, { startDate, endDate, sort = "desc" }) {
    let query = supabaseAdmin
      .from("readings")
      .select("*")
      .eq("hive_id", hiveId);

    if (startDate) {
      query = query.gte("timestamp", startDate);
    }
    if (endDate) {
      query = query.lte("timestamp", endDate);
    }

    const ascending = sort.toLowerCase() === "asc";
    const { data, error } = await query.order("timestamp", { ascending });
    if (error) throw error;
    return data;
  },

  async getInsights(ownerId) {
    let query = supabaseAdmin
      .from("hives")
      .select("*, readings(*)")
      .in("current_health_category", ["critical", "needs_attention"]);

    if (ownerId) {
      query = query.eq("owner_id", ownerId);
    }

    const { data: hives, error } = await query;
    if (error) throw error;

    const insights = hives.map((h) => {
      const sortedReadings = [...(h.readings || [])].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      const currentReading = sortedReadings[0] || null;
      const previousReading = sortedReadings[1] || null;

      const health = evaluateHiveHealth(currentReading, previousReading);
      const { readings, ...hiveFields } = h;

      return {
        ...hiveFields,
        reason: health.primaryReason,
        reasons: health.reasons,
        latest_reading: currentReading,
      };
    });

    // Sort: critical first, then needs_attention
    insights.sort((a, b) => {
      if (a.current_health_category === "critical" && b.current_health_category !== "critical") return -1;
      if (a.current_health_category !== "critical" && b.current_health_category === "critical") return 1;
      return 0;
    });

    return insights;
  },
};
