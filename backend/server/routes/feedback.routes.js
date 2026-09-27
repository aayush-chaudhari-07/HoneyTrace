import { Router } from "express";
import { getFeedback, addFeedback } from "../controllers/feedback.controller.js";

const router = Router();

// Public read access for consumer tasting feedback
router.get("/batch/:batchId", getFeedback);

// Public insert access for consumer tasting feedback (insert-only allowed)
router.post("/", addFeedback);

export default router;
