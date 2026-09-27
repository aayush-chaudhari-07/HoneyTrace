import { supabaseAdmin } from "../config/supabase.js";

/**
 * Middleware to verify Supabase JWT token, fetch user profile & role from database,
 * and attach it to req.user.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !authData.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }

    // Fetch corresponding user record (with role) from public.users table
    const { data: userRow, error: userError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .maybeSingle();

    if (userError) {
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    // Attach user profile object to req.user
    req.user = {
      id: authData.user.id,
      email: authData.user.email || userRow?.email,
      role: userRow?.role || "beekeeper",
      name: userRow?.name || authData.user.user_metadata?.full_name || "",
      contact: userRow?.contact || null,
      created_at: userRow?.created_at || authData.user.created_at,
      authUser: authData.user,
    };

    req.userRole = req.user.role;

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware factory to enforce specific user role requirements.
 * Rejects with 403 Forbidden if req.user.role is not in allowed list (admin bypasses).
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "Unauthorized: Authentication required" });
    }

    const role = req.user.role;
    if (role === "admin" || allowedRoles.includes(role)) {
      return next();
    }

    return res.status(403).json({
      error: `Forbidden: Action requires one of roles [${allowedRoles.join(", ")}], but current role is '${role}'`,
    });
  };
};
