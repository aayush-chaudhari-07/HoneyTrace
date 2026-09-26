import dotenv from "dotenv";

dotenv.config();

/**
 * Maps Integration Layer
 * Note: HoneyTrace uses OpenStreetMap / Leaflet directly on the frontend for visual map rendering
 * with zero mandatory API keys. This service provides a thin backend wrapper for map provider configuration,
 * static tile URLs, and reverse geocoding.
 */
export const mapsService = {
  /**
   * Returns current map configuration options.
   */
  getMapConfig() {
    const mapsApiKey = process.env.MAPS_API_KEY || process.env.MAPBOX_API_KEY;
    const provider = mapsApiKey ? "mapbox" : "openstreetmap";

    return {
      provider,
      apiKeyConfigured: Boolean(mapsApiKey),
      tileUrlTemplate: mapsApiKey
        ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapsApiKey}`
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: provider === "mapbox"
        ? "© Mapbox © OpenStreetMap"
        : "© OpenStreetMap contributors",
    };
  },

  /**
   * Optional server-side reverse geocoding (latitude, longitude => human readable location name).
   * Gracefully returns null if network is offline or service fails.
   */
  async reverseGeocode(lat, lng) {
    if (lat == null || lng == null || isNaN(Number(lat)) || isNaN(Number(lng))) {
      return null;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
      const response = await fetch(url, {
        headers: { "User-Agent": "HoneyTrace-Beekeeping-Platform/1.0" },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const data = await response.json();
        return data.display_name || data.address?.county || data.address?.state || "Apiary Location";
      }
    } catch (err) {
      console.warn("⚠️ Reverse geocoding warning:", err.message);
    }

    return null;
  },
};
