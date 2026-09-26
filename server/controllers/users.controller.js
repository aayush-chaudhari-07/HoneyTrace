import { usersService } from "../services/users.service.js";

export const completeProfile = async (req, res, next) => {
  try {
    const { name, role, contact } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Name is required" });
    }

    const ALLOWED_ROLES = ["beekeeper", "lab", "bottler", "distributor", "retailer", "admin"];
    const userRole = role && ALLOWED_ROLES.includes(role) ? role : "beekeeper";

    const userProfile = await usersService.completeProfile({
      userId: req.user.id,
      email: req.user.email,
      name: name.trim(),
      role: userRole,
      contact: contact ? String(contact).trim() : null,
    });

    res.status(200).json({
      message: "Profile completed successfully",
      user: userProfile,
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userProfile = await usersService.getUserById(req.user.id);
    res.status(200).json({
      user: userProfile || req.user,
    });
  } catch (err) {
    next(err);
  }
};
