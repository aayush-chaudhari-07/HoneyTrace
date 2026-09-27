import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthRoutes from "./routes/health.routes.js";
import usersRoutes from "./routes/users.routes.js";
import hivesRoutes from "./routes/hives.routes.js";
import batchesRoutes from "./routes/batches.routes.js";
import custodyRoutes from "./routes/custody.routes.js";
import labRoutes from "./routes/lab.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import partnerRoutes from "./routes/partner.routes.js";
import publicRoutes from "./routes/public.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { requestLogger } from "./middleware/logger.middleware.js";

dotenv.config();

const app = express();

// CORS Configuration reading FRONTEND_URL from environment variable
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching frontendUrl
      if (!origin || origin === frontendUrl || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS origin: ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);


// Health Check Endpoints
app.use("/", healthRoutes);
app.use("/api", healthRoutes);

// API Routes
app.use("/api/users", usersRoutes);
app.use("/api/hives", hivesRoutes);
app.use("/api/batches", batchesRoutes);
app.use("/api/custody", custodyRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/ai", aiRoutes);



// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

// Global Error Handler
app.use(errorHandler);

export default app;
