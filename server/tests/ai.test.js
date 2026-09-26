import assert from "node:assert";
import test from "node:test";
import app from "../app.js";
import { runPythonAiEngine } from "../services/ai.service.js";

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
// 1. Python AI Engine Execution & Calculation Tests
// ============================================================================
test("Python AI engine: computes harvest recommendation for stable weight plateau", async () => {
  const readings = [
    { timestamp: "2026-09-01T10:00:00Z", weight: 40.0, temperature: 34.0, humidity: 55, activity_level: 80 },
    { timestamp: "2026-09-05T10:00:00Z", weight: 45.0, temperature: 34.2, humidity: 54, activity_level: 82 },
    { timestamp: "2026-09-10T10:00:00Z", weight: 48.0, temperature: 34.1, humidity: 55, activity_level: 85 },
    { timestamp: "2026-09-15T10:00:00Z", weight: 48.1, temperature: 34.5, humidity: 56, activity_level: 84 },
    { timestamp: "2026-09-20T10:00:00Z", weight: 48.2, temperature: 34.3, humidity: 55, activity_level: 80 },
  ];

  const weather = [
    { date: "2026-09-28", precipitation_sum: 8.5, temperature_2m_max: 26 },
  ];

  const result = await runPythonAiEngine(readings, weather);

  assert.ok(result.harvest_recommendation);
  assert.strictEqual(result.harvest_recommendation.confidence > 30, true);
  assert.ok(result.harvest_recommendation.recommended_window);
  assert.match(result.harvest_recommendation.explanation, /weight/i);
});

test("Python AI engine: detects sudden 25% weight drop anomaly", async () => {
  const readings = [
    { timestamp: "2026-09-01T10:00:00Z", weight: 50.0, temperature: 34.0, humidity: 55, activity_level: 80 },
    { timestamp: "2026-09-02T10:00:00Z", weight: 37.0, temperature: 34.0, humidity: 55, activity_level: 80 }, // 26% drop
  ];

  const result = await runPythonAiEngine(readings, []);

  assert.strictEqual(result.anomaly_detection.is_anomalous, true);
  assert.strictEqual(result.anomaly_detection.anomalies.length > 0, true);
  assert.match(result.anomaly_detection.anomalies[0].explanation, /dropped sharply/i);
});

test("Python AI engine: detects activity drop anomaly (swarming indicator)", async () => {
  const readings = [
    { timestamp: "2026-09-01T10:00:00Z", weight: 45.0, temperature: 34.0, humidity: 55, activity_level: 85 },
    { timestamp: "2026-09-02T10:00:00Z", weight: 44.8, temperature: 34.0, humidity: 55, activity_level: 20 }, // 65% drop
  ];

  const result = await runPythonAiEngine(readings, []);

  assert.strictEqual(result.anomaly_detection.is_anomalous, true);
  const activityAnomaly = result.anomaly_detection.anomalies.find((a) => a.metric === "activity_level");
  assert.ok(activityAnomaly);
  assert.match(activityAnomaly.explanation, /Activity dropped sharply/i);
});

// ============================================================================
// 2. HTTP API Protection & Feedback Tests
// ============================================================================
test("Unauthenticated GET /api/hives/:id/ai-insight returns 401 Unauthorized", async () => {
  const res = await makeRequest("/api/hives/hive-123/ai-insight");
  assert.strictEqual(res.status, 401);
});

test("Unauthenticated POST /api/hives/:id/ai-insight/feedback returns 401 Unauthorized", async () => {
  const res = await makeRequest("/api/hives/hive-123/ai-insight/feedback", {
    method: "POST",
    body: { insight_id: "insight-123", recommendation_followed: true },
  });
  assert.strictEqual(res.status, 401);
});
