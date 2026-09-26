import { Router } from "express";
import {
  getBatches,
  getBatchById,
  createBatch,
  updateBatchStatus,
} from "../controllers/batches.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

// Public route for batch verification
router.get("/:id", getBatchById);

// Authenticated routes
router.get("/", requireAuth, getBatches);
router.post("/", requireAuth, requireRole("beekeeper", "admin"), createBatch);
router.patch("/:id/status", requireAuth, updateBatchStatus);

export default router;
