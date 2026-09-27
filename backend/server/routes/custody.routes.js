import { Router } from "express";
import { getCustodyRecords, addCustodyRecord } from "../controllers/custody.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Public read access for consumer jar verification
router.get("/batch/:batchId", getCustodyRecords);

// Authenticated stage updates for partner roles & beekeeper
router.post("/", requireAuth, addCustodyRecord);

export default router;
