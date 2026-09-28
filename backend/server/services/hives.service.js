import { supabaseAdmin } from "../config/supabase.js";
import { weatherService } from "./weather.service.js";

const inMemoryHives = new Map();
const inMemoryReadings = new Map();

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
    try {
      let query = supabaseAdmin.from("hives").select("*, readings(*)");
      if (ownerId) query = query.eq("owner_id", ownerId);
      const { data: hives, error } = await query.order("created_at", { ascending: false });

      if (!error && hives) {
        return hives.map((h) => {
          const sortedReadings = [...(h.readings || [])].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          const latestReading = sortedReadings[0] || null;
          const { readings, ...hiveFields } = h;
          return { ...hiveFields, latest_reading: latestReading };
        });
      }
    } catch (err) {
      console.warn("⚠️ listHives fell back to in-memory store:", err.message);
    }

    // Fallback store
    const list = Array.from(inMemoryHives.values()).filter((h) => !ownerId || h.owner_id === ownerId);
    return list.map((h) => {
      const hReadings = (inMemoryReadings.get(h.id) || []).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      return { ...h, latest_reading: hReadings[0] || null };
    });
  },

  async getHiveById(id) {
    let data = null;
    let dbReadings = [];

    try {
      const res = await supabaseAdmin
        .from("hives")
        .select("*, readings(*)")
        .eq("id", id)
        .maybeSingle();

      if (!res.error && res.data) {
        data = res.data;
        dbReadings = res.data.readings || [];
      }
    } catch (err) {
      console.warn("⚠️ getHiveById fell back to in-memory store:", err.message);
    }

    if (!data) {
      data = inMemoryHives.get(id);
      dbReadings = inMemoryReadings.get(id) || [];
    }

    if (!data) return null;

    const readings = [...dbReadings].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

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
    const id = hiveData.id || `hive-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const fullHive = {
      id,
      owner_id: hiveData.owner_id,
      location_lat: hiveData.location_lat ?? 12.52,
      location_lng: hiveData.location_lng ?? 75.81,
      current_health_category: hiveData.current_health_category || "healthy",
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabaseAdmin
        .from("hives")
        .insert(hiveData)
        .select()
        .single();

      if (!error && data) {
        inMemoryHives.set(data.id, data);
        return data;
      }
    } catch (err) {
      console.warn("⚠️ createHive fell back to in-memory store:", err.message);
    }

    inMemoryHives.set(fullHive.id, fullHive);
    return fullHive;
  },

  async updateHive(id, updateData) {
    try {
      const { data, error } = await supabaseAdmin
        .from("hives")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        inMemoryHives.set(id, data);
        return data;
      }
    } catch (err) {
      console.warn("⚠️ updateHive fell back to in-memory store:", err.message);
    }

    const existing = inMemoryHives.get(id) || { id, current_health_category: "healthy" };
    const updated = { ...existing, ...updateData };
    inMemoryHives.set(id, updated);
    return updated;
  },

  async addReadingAndEvaluateHealth(hiveId, readingPayload) {
    let existingReadings = [];
    try {
      const { data } = await supabaseAdmin
        .from("readings")
        .select("*")
        .eq("hive_id", hiveId)
        .order("timestamp", { ascending: false });

      if (data) existingReadings = data;
    } catch (err) {
      console.warn("⚠️ addReadingAndEvaluateHealth existing readings fallback:", err.message);
    }

    if (existingReadings.length === 0) {
      existingReadings = (inMemoryReadings.get(hiveId) || []).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }

    const previousReading = existingReadings.length > 0 ? existingReadings[0] : null;

    const newReadingObj = {
      id: `reading-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      hive_id: hiveId,
      temperature: readingPayload.temperature !== undefined ? readingPayload.temperature : null,
      humidity: readingPayload.humidity !== undefined ? readingPayload.humidity : null,
      weight: readingPayload.weight !== undefined ? readingPayload.weight : null,
      activity_level: readingPayload.activity_level !== undefined ? readingPayload.activity_level : null,
      notes: readingPayload.notes || null,
      timestamp: readingPayload.timestamp || new Date().toISOString(),
    };

    let newReading = newReadingObj;
    try {
      const { data: inserted, error } = await supabaseAdmin
        .from("readings")
        .insert({
          hive_id: hiveId,
          temperature: newReadingObj.temperature,
          humidity: newReadingObj.humidity,
          weight: newReadingObj.weight,
          activity_level: newReadingObj.activity_level,
          notes: newReadingObj.notes,
          timestamp: newReadingObj.timestamp,
        })
        .select()
        .single();

      if (!error && inserted) newReading = inserted;
    } catch (err) {
      console.warn("⚠️ insert reading fell back to in-memory store:", err.message);
    }

    const readingsList = inMemoryReadings.get(hiveId) || [];
    readingsList.unshift(newReading);
    inMemoryReadings.set(hiveId, readingsList);

    const health = evaluateHiveHealth(newReading, previousReading);

    let updatedHive = await this.updateHive(hiveId, { current_health_category: health.category });

    return {
      reading: newReading,
      hive: updatedHive,
      health,
    };
  },

  async getReadingsForHive(hiveId, { startDate, endDate, sort = "desc" }) {
    try {
      let query = supabaseAdmin.from("readings").select("*").eq("hive_id", hiveId);
      if (startDate) query = query.gte("timestamp", startDate);
      if (endDate) query = query.lte("timestamp", endDate);
      const ascending = sort.toLowerCase() === "asc";
      const { data, error } = await query.order("timestamp", { ascending });
      if (!error && data) return data;
    } catch (err) {
      console.warn("⚠️ getReadingsForHive fell back to in-memory store:", err.message);
    }

    let list = inMemoryReadings.get(hiveId) || [];
    if (startDate) list = list.filter((r) => new Date(r.timestamp) >= new Date(startDate));
    if (endDate) list = list.filter((r) => new Date(r.timestamp) <= new Date(endDate));
    list.sort((a, b) =>
      sort.toLowerCase() === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return list;
  },

  async getInsights(ownerId) {
    const hives = await this.listHives(ownerId);
    const attentionHives = hives.filter((h) =>
      ["critical", "needs_attention"].includes(h.current_health_category)
    );

    const insights = attentionHives.map((h) => {
      const hReadings = (inMemoryReadings.get(h.id) || []).sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      const currentReading = hReadings[0] || null;
      const previousReading = hReadings[1] || null;

      const health = evaluateHiveHealth(currentReading, previousReading);
      return {
        ...h,
        reason: health.primaryReason,
        reasons: health.reasons,
        latest_reading: currentReading,
      };
    });

    insights.sort((a, b) => {
      if (a.current_health_category === "critical" && b.current_health_category !== "critical") return -1;
      if (a.current_health_category !== "critical" && b.current_health_category === "critical") return 1;
      return 0;
    });

    return insights;
  },
};
