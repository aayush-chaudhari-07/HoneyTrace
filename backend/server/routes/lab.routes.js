import { Router } from "express";
import { getLabTests, addLabTest } from "../controllers/lab.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

// Public read access for lab certificates (consumer verification)
router.get("/batch/:batchId", getLabTests);

// Authenticated lab test upload for partner role 'lab' or 'admin'
router.post("/", requireAuth, requireRole("lab", "admin"), addLabTest);

export default router;
