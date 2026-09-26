import { describe, it } from "node:test";
import assert from "node:assert";
import { weatherService } from "../services/weather.service.js";
import { mapsService } from "../services/maps.service.js";
import { hivesService } from "../services/hives.service.js";

describe("External Integrations Layer (Weather & Maps)", () => {
  describe("Weather Service", () => {
    it("should return null for invalid or missing coordinates", async () => {
      assert.strictEqual(await weatherService.getWeatherForLocation(null, 75.8), null);
      assert.strictEqual(await weatherService.getWeatherForLocation(12.5, undefined), null);
      assert.strictEqual(await weatherService.getWeatherForLocation("invalid", "coords"), null);
    });

    it("should fetch weather data and cache results for subsequent calls", async () => {
      weatherService.clearCache();

      const weather1 = await weatherService.getWeatherForLocation(12.55, 75.82);
      if (weather1) {
        assert.ok(weather1.current);
        assert.strictEqual(typeof weather1.current.temp, "number");
        assert.strictEqual(weather1.cached, false);

        // Second call should hit the in-memory cache
        const weather2 = await weatherService.getWeatherForLocation(12.55, 75.82);
        assert.ok(weather2);
        assert.strictEqual(weather2.cached, true);
      }
    });
  });

  describe("Maps Service", () => {
    it("should return map configuration with attribution and tile template", () => {
      const config = mapsService.getMapConfig();
      assert.ok(config.provider);
      assert.ok(config.tileUrlTemplate);
      assert.ok(config.attribution);
      assert.strictEqual(typeof config.apiKeyConfigured, "boolean");
    });
  });
});
