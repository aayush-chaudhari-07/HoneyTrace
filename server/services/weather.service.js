import dotenv from "dotenv";

dotenv.config();

// In-memory weather cache: key => { data, timestamp }
const weatherCache = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache TTL

/**
 * Weather Service with OpenWeatherMap & Open-Meteo fallback + 30-minute in-memory caching.
 * Always handles failures gracefully without crashing, returning `weather: null` if down.
 */
export const weatherService = {
  /**
   * Fetches current weather and short 5-day forecast for given lat/lng.
   */
  async getWeatherForLocation(lat, lng) {
    if (lat == null || lng == null || isNaN(Number(lat)) || isNaN(Number(lng))) {
      return null;
    }

    const latitude = Number(lat);
    const longitude = Number(lng);
    const cacheKey = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
    const now = Date.now();

    // 1. Check in-memory cache
    if (weatherCache.has(cacheKey)) {
      const cached = weatherCache.get(cacheKey);
      if (now - cached.timestamp < CACHE_TTL_MS) {
        return {
          ...cached.data,
          cached: true,
        };
      }
    }

    const apiKey = process.env.WEATHER_API_KEY;

    // 2. Attempt fetch via OpenWeatherMap if API key is provided
    if (apiKey && apiKey !== "your_openweather_api_key_here") {
      try {
        const owmRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`,
          { signal: AbortSignal.timeout(4000) }
        );

        if (owmRes.ok) {
          const owmData = await owmRes.json();
          const weatherObj = {
            current: {
              temp: owmData.main?.temp ?? 25,
              humidity: owmData.main?.humidity ?? 55,
              condition: owmData.weather?.[0]?.main || "Clear",
              wind_speed: owmData.wind?.speed ?? 10,
            },
            forecast: [],
            source: "openweathermap",
            cached: false,
          };

          weatherCache.set(cacheKey, { data: weatherObj, timestamp: now });
          return weatherObj;
        }
      } catch (err) {
        console.warn("⚠️ OpenWeatherMap API call failed, falling back to Open-Meteo:", err.message);
      }
    }

    // 3. Fallback to Open-Meteo free tier API (zero key required)
    try {
      const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
      const omRes = await fetch(omUrl, { signal: AbortSignal.timeout(4000) });

      if (omRes.ok) {
        const omData = await omRes.json();
        const currentTemp = omData.current?.temperature_2m ?? 24.5;
        const currentHum = omData.current?.relative_humidity_2m ?? 55;
        const currentWind = omData.current?.wind_speed_10m ?? 12;

        const dailyForecast = (omData.daily?.time || []).map((t, idx) => ({
          date: t,
          temp_max: omData.daily?.temperature_2m_max?.[idx] ?? 26,
          temp_min: omData.daily?.temperature_2m_min?.[idx] ?? 18,
          precipitation_sum: omData.daily?.precipitation_sum?.[idx] ?? 0,
        }));

        const weatherObj = {
          current: {
            temp: currentTemp,
            humidity: currentHum,
            condition: currentHum > 80 ? "Rainy" : currentTemp > 30 ? "Hot" : "Optimal Clear",
            wind_speed: currentWind,
          },
          forecast: dailyForecast,
          source: "open-meteo",
          cached: false,
        };

        weatherCache.set(cacheKey, { data: weatherObj, timestamp: now });
        return weatherObj;
      }
    } catch (err) {
      console.warn("⚠️ Open-Meteo API call failed, falling back to graceful null:", err.message);
    }

    // 4. Fallback if network is entirely offline / unreachable
    return null;
  },

  /**
   * Clears in-memory weather cache (useful for testing).
   */
  clearCache() {
    weatherCache.clear();
  },
};
