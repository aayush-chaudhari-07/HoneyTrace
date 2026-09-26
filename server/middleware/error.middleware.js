/**
 * Global Error Handling Middleware
 */
export const errorHandler = (err, req, res, _next) => {
  console.error("❌ Express Error Handler Caught:", err);

  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode === 200 ? 500 : statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
