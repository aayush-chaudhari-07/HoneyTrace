import { Router } from "express";
import { completeProfile, getMe } from "../controllers/users.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/complete-profile", completeProfile);
router.get("/me", getMe);

export default router;
