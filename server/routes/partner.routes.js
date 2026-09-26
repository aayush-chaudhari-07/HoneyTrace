import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import { getPendingBatches, updatePartnerBatch } from "../controllers/partner.controller.js";

const router = Router();

router.use(requireAuth);

const partnerRoles = ["lab", "bottler", "distributor", "retailer", "admin"];

router.get("/pending-batches", requireRole(...partnerRoles), getPendingBatches);
router.post("/batches/:id/update", requireRole(...partnerRoles), updatePartnerBatch);

export default router;
