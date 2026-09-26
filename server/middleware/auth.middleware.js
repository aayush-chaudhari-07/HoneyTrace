import { supabaseAdmin } from "../config/supabase.js";

/**
 * Middleware to verify Supabase JWT token and attach user + user role to request.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !authData.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Retrieve user record from public.users to get their role
    const { data: userRecord, error: userError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (userError) {
      return res.status(500).json({ error: "Failed to fetch user role information" });
    }

    req.user = authData.user;
    req.userRecord = userRecord;
    req.userRole = userRecord?.role || "beekeeper";

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware factory to enforce specific user role requirements.
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({ error: "Unauthorized: Authentication required" });
    }

    if (req.userRole === "admin" || allowedRoles.includes(req.userRole)) {
      return next();
    }

    return res.status(403).json({
      error: `Forbidden: Action requires one of roles: [${allowedRoles.join(", ")}]`,
    });
  };
};
