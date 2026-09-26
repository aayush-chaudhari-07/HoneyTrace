/**
 * Centralized Error Handling Middleware for consistent API error responses.
 */
export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV !== "test") {
    console.error(`❌ [API ERROR] ${req.method} ${req.originalUrl} -> Status ${statusCode}:`, message);
  }

  res.status(statusCode).json({
    error: message,
    status: statusCode,
    timestamp: new Date().toISOString(),
    path: req.originalUrl || req.path,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
