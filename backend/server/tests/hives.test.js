import assert from "node:assert";
import test from "node:test";
import app from "../app.js";
import { evaluateHiveHealth, validateReadingRanges } from "../services/hives.service.js";
import { requireRole } from "../middleware/auth.middleware.js";

// Helper function to mock HTTP requests against Express app
async function makeRequest(path, { method = "GET", headers = {}, body = null } = {}) {
  const reqHeaders = new Headers(headers);
  if (body && !reqHeaders.has("content-type")) {
    reqHeaders.set("content-type", "application/json");
  }

  return new Promise((resolve, reject) => {
    const server = app.listen(0, async () => {
      const port = server.address().port;
      try {
        const response = await fetch(`http://localhost:${port}${path}`, {
          method,
          headers: reqHeaders,
          body: body ? JSON.stringify(body) : null,
        });
        const json = await response.json().catch(() => ({}));
        server.close(() => resolve({ status: response.status, body: json }));
      } catch (err) {
        server.close(() => reject(err));
      }
    });
  });
}

// ============================================================================
// 1. Reading Sensor Range Validation Tests
// ============================================================================
test("Reading validation: rejects temperature outside -20°C to 60°C", () => {
  const errors = validateReadingRanges({ temperature: 85 });
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /Temperature/i);
});

test("Reading validation: rejects humidity outside 0% to 100%", () => {
  const errors = validateReadingRanges({ humidity: 120 });
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /Humidity/i);
});

test("Reading validation: rejects negative weight or weight > 200kg", () => {
  const errors = validateReadingRanges({ weight: -5 });
  assert.strictEqual(errors.length, 1);
  assert.match(errors[0], /Weight/i);
});

test("Reading validation: passes for valid metric ranges", () => {
  const errors = validateReadingRanges({
    temperature: 34.5,
    humidity: 55,
    weight: 42,
    activity_level: 80,
  });
  assert.strictEqual(errors.length, 0);
});

// ============================================================================
// 2. Health Category & Anomaly Recomputation Tests
// ============================================================================
test("Health recomputation: optimal readings produce 'healthy' category", () => {
  const curr = { temperature: 34, humidity: 55, weight: 45, activity_level: 85 };
  const prev = { weight: 46 };
  const res = evaluateHiveHealth(curr, prev);

  assert.strictEqual(res.category, "healthy");
  assert.strictEqual(res.reasons.length, 0);
});

test("Health recomputation: single anomaly produces 'needs_attention' category", () => {
  const curr = { temperature: 38, humidity: 55, weight: 45, activity_level: 80 }; // Temp high
  const prev = { weight: 46 };
  const res = evaluateHiveHealth(curr, prev);

  assert.strictEqual(res.category, "needs_attention");
  assert.strictEqual(res.reasons.length, 1);
  assert.match(res.primaryReason, /Temperature/i);
});

test("Health recomputation: weight drop > 15% produces 'needs_attention'", () => {
  const curr = { temperature: 34, humidity: 55, weight: 40, activity_level: 80 }; // Weight dropped 20%
  const prev = { weight: 50 };
  const res = evaluateHiveHealth(curr, prev);

  assert.strictEqual(res.category, "needs_attention");
  assert.match(res.primaryReason, /Weight dropped 20.0%/i);
});

test("Health recomputation: weight drop > 30% produces 'critical' category", () => {
  const curr = { temperature: 34, humidity: 55, weight: 30, activity_level: 80 }; // Weight dropped 40%
  const prev = { weight: 50 };
  const res = evaluateHiveHealth(curr, prev);

  assert.strictEqual(res.category, "critical");
});

test("Health recomputation: multiple simultaneous anomalies produce 'critical' category", () => {
  const curr = { temperature: 39, humidity: 75, weight: 45, activity_level: 10 }; // Temp high, humidity high, activity low
  const prev = { weight: 46 };
  const res = evaluateHiveHealth(curr, prev);

  assert.strictEqual(res.category, "critical");
  assert.strictEqual(res.reasons.length >= 2, true);
});

// ============================================================================
// 3. HTTP Route Protection & Role Tests
// ============================================================================
test("Unauthenticated GET /api/hives returns 401 Unauthorized", async () => {
  const res = await makeRequest("/api/hives");
  assert.strictEqual(res.status, 401);
});

test("Lab partner hitting GET /api/hives returns 403 Forbidden", () => {
  const req = {
    user: { id: "lab-user-1", role: "lab" },
  };
  let statusCode = 0;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json() {
      return this;
    },
  };
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  const hivesAccessMiddleware = requireRole("beekeeper", "admin");
  hivesAccessMiddleware(req, res, next);

  assert.strictEqual(nextCalled, false);
  assert.strictEqual(statusCode, 403);
});

test("Beekeeper hitting GET /api/hives passes role check", () => {
  const req = {
    user: { id: "beekeeper-1", role: "beekeeper" },
  };
  const res = {};
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  const hivesAccessMiddleware = requireRole("beekeeper", "admin");
  hivesAccessMiddleware(req, res, next);

  assert.strictEqual(nextCalled, true);
});
