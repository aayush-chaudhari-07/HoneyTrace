import { Router } from "express";
import {
  getHives,
  getHiveInsights,
  getHiveById,
  createHive,
  updateHive,
  addReading,
  getReadings,
} from "../controllers/hives.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

// Protect all hives routes for beekeeper and admin roles
router.use(requireAuth);
router.use(requireRole("beekeeper", "admin"));

// Hive collection endpoints
router.post("/", createHive);
router.get("/", getHives);

// Specific named endpoint: GET /api/hives/insights MUST come before /api/hives/:id
router.get("/insights", getHiveInsights);

// Individual hive endpoints
router.get("/:id", getHiveById);
router.patch("/:id", updateHive);
router.put("/:id", updateHive);

// Readings endpoints for specific hive
router.post("/:id/readings", addReading);
router.get("/:id/readings", getReadings);

export default router;
