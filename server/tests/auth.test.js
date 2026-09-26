import assert from "node:assert";
import test from "node:test";
import app from "../app.js";
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

test("1. Unauthenticated request to protected route returns 401 Unauthorized", async () => {
  const res = await makeRequest("/api/users/me");
  assert.strictEqual(res.status, 401);
  assert.match(res.body.error, /Unauthorized/i);
});

test("2. Invalid token request to protected route returns 401 Unauthorized", async () => {
  const res = await makeRequest("/api/users/me", {
    headers: { Authorization: "Bearer invalid.jwt.token" },
  });
  assert.strictEqual(res.status, 401);
  assert.match(res.body.error, /Unauthorized/i);
});

test("3. requireRole middleware blocks a beekeeper hitting a lab-only route with 403 Forbidden", () => {
  const req = {
    user: { id: "user-123", email: "beekeeper@apiary.com", role: "beekeeper" },
  };
  let statusCode = 0;
  let jsonBody = null;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(obj) {
      jsonBody = obj;
      return this;
    },
  };
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  const labOnlyMiddleware = requireRole("lab");
  labOnlyMiddleware(req, res, next);

  assert.strictEqual(nextCalled, false, "next() should not be called for forbidden role");
  assert.strictEqual(statusCode, 403, "Response status should be 403 Forbidden");
  assert.match(jsonBody.error, /Forbidden/i);
  assert.match(jsonBody.error, /beekeeper/i);
});

test("4. requireRole middleware allows a lab user hitting a lab-only route", () => {
  const req = {
    user: { id: "user-456", email: "lab@testing.com", role: "lab" },
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

  const labOnlyMiddleware = requireRole("lab");
  labOnlyMiddleware(req, res, next);

  assert.strictEqual(nextCalled, true, "next() should be called when role matches");
  assert.strictEqual(statusCode, 0, "Response status should remain unmodified on success");
});

test("5. requireRole middleware allows an admin user to bypass role restrictions", () => {
  const req = {
    user: { id: "admin-789", email: "admin@honeytrace.com", role: "admin" },
  };
  const res = {};
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  const labOnlyMiddleware = requireRole("lab");
  labOnlyMiddleware(req, res, next);

  assert.strictEqual(nextCalled, true, "Admin should bypass role restrictions");
});

test("6. Health check endpoint is public and returns 200 OK", async () => {
  const res = await makeRequest("/health");
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.status, "ok");
});
