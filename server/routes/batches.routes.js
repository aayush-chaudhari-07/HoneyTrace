import { Router } from "express";
import {
  getBatches,
  getBatchById,
  createBatch,
  updateBatch,
  sealBatch,
  updateBatchStatus,
} from "../controllers/batches.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

// Public route for consumer verification
router.get("/:id", getBatchById);

// Authenticated routes
router.use(requireAuth);

router.get("/", getBatches);
router.post("/", requireRole("beekeeper", "admin"), createBatch);
router.patch("/:id", requireRole("beekeeper", "admin"), updateBatch);
router.post("/:id/seal", requireRole("beekeeper", "admin"), sealBatch);
router.patch("/:id/status", updateBatchStatus);

export default router;
