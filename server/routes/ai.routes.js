import { Router } from "express";
import { getHiveInsights, getBatchInsights, createInsight } from "../controllers/ai.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/hive/:hiveId", getHiveInsights);
router.get("/batch/:batchId", getBatchInsights);
router.post("/", createInsight);

export default router;
