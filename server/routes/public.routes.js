import { Router } from "express";
import { getPublicBatch, lookupBatch, submitPublicFeedback } from "../controllers/public.controller.js";
import { publicApiRateLimiter, feedbackRateLimiter } from "../middleware/rate_limit.middleware.js";

const router = Router();

// Public consumer lookup by QR/blockchain code or UUID
router.get("/batches/lookup", publicApiRateLimiter, lookupBatch);

// Public batch verification detail
router.get("/batches/:id", publicApiRateLimiter, getPublicBatch);

// Public consumer feedback submission
router.post("/batches/:id/feedback", feedbackRateLimiter, submitPublicFeedback);

export default router;
