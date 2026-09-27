/**
 * Request Logging Middleware for debugging and API audit trails.
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const statusEmoji = statusCode >= 400 ? "❌" : "✅";

    // Log request summary in non-test environments
    if (process.env.NODE_ENV !== "test") {
      console.log(`${statusEmoji} [${new Date().toISOString()}] ${method} ${originalUrl} -> ${statusCode} (${duration}ms)`);
    }
  });

  next();
};
