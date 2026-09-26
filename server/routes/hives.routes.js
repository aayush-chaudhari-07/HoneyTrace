import { Router } from "express";
import {
  getHives,
  getHiveById,
  createHive,
  updateHive,
  addReading,
  getReadings,
} from "../controllers/hives.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getHives);
router.get("/:id", getHiveById);
router.post("/", requireRole("beekeeper", "admin"), createHive);
router.put("/:id", requireRole("beekeeper", "admin"), updateHive);
router.get("/:hiveId/readings", getReadings);
router.post("/readings", requireRole("beekeeper", "admin"), addReading);

export default router;
