/**
 * Simple in-memory sliding window rate limiter middleware for public API protection.
 */
const requestStore = new Map();

/**
 * Cleans up expired entries periodically to prevent memory leaks.
 */
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ipKey, record] of requestStore.entries()) {
    if (now > record.resetTime) {
      requestStore.delete(ipKey);
    }
  }
}, 60000);

if (cleanupTimer.unref) {
  cleanupTimer.unref();
}


export function createRateLimiter({ windowMs = 60000, maxRequests = 60, message = "Too many requests. Please try again later." }) {
  return (req, res, next) => {
    // Get client IP address
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || "127.0.0.1";
    const key = `${req.baseUrl || ""}${req.path}_${ip}`;
    const now = Date.now();

    let record = requestStore.get(key);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + windowMs,
      };
      requestStore.set(key, record);
      return next();
    }

    record.count += 1;

    if (record.count > maxRequests) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSeconds);
      return res.status(429).json({
        error: message,
        retryAfterSeconds,
      });
    }

    next();
  };
}

export const publicApiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
  message: "Too many public API requests. Please slow down.",
});

export const feedbackRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
  message: "Feedback submission rate limit exceeded. Please wait a few minutes before submitting another review.",
});
