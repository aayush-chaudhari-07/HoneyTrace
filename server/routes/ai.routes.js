import { Router } from "express";
import {
  getHiveAiInsight,
  recordInsightFeedback,
  internalRecommend,
  internalDetectAnomaly,
} from "../controllers/ai.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Internal microservice endpoints (called by Node backend / services)
router.post("/internal/ai/recommend", internalRecommend);
router.post("/internal/ai/detect-anomaly", internalDetectAnomaly);

// Public / Authenticated frontend API endpoints
router.get("/hives/:id/ai-insight", requireAuth, getHiveAiInsight);
router.post("/hives/:id/ai-insight/feedback", requireAuth, recordInsightFeedback);

export default router;
