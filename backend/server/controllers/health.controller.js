export const getHealth = (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "HoneyTrace API Backend",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
