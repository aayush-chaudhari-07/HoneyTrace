import { describe, it } from "node:test";
import assert from "node:assert";
import { sanitizeText, publicService } from "../services/public.service.js";
import { createRateLimiter } from "../middleware/rate_limit.middleware.js";

describe("Public Consumer Verification & Feedback Services", () => {
  describe("Input Sanitization", () => {
    it("should strip HTML and script tags from text fields", () => {
      const rawHtml = "  <script>alert('xss')</script><b>Delicious Honey!</b>  ";
      const clean = sanitizeText(rawHtml);

      assert.strictEqual(clean, "alert('xss')Delicious Honey!");
      assert.strictEqual(clean.includes("<script>"), false);
      assert.strictEqual(clean.includes("<b>"), false);
    });

    it("should handle empty or non-string inputs gracefully", () => {
      assert.strictEqual(sanitizeText(null), "");
      assert.strictEqual(sanitizeText(undefined), "");
      assert.strictEqual(sanitizeText("   "), "");
    });
  });

  describe("Rate Limiter Middleware", () => {
    it("should enforce request count thresholds and set Retry-After header when exceeded", () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        maxRequests: 2,
        message: "Rate limit exceeded",
      });

      const req = { baseUrl: "/api/public", path: "/batches/1", socket: { remoteAddress: "127.0.0.1" }, headers: {} };
      let statusValue = null;
      let jsonValue = null;
      let headers = {};

      const res = {
        setHeader(name, val) {
          headers[name] = val;
        },
        status(code) {
          statusValue = code;
          return this;
        },
        json(obj) {
          jsonValue = obj;
        },
      };

      let nextCalled = 0;
      const next = () => {
        nextCalled++;
      };

      limiter(req, res, next); // request 1 -> ok
      limiter(req, res, next); // request 2 -> ok
      assert.strictEqual(nextCalled, 2);

      limiter(req, res, next); // request 3 -> should block (429)
      assert.strictEqual(statusValue, 429);
      assert.strictEqual(jsonValue.error, "Rate limit exceeded");
      assert.ok(headers["Retry-After"] > 0);
    });
  });
});
