import { hivesService, validateReadingRanges } from "../services/hives.service.js";

export const getHives = async (req, res, next) => {
  try {
    const ownerId = req.userRole === "admin" ? null : req.user.id;
    const hives = await hivesService.listHives(ownerId);
    res.status(200).json({ hives });
  } catch (err) {
    next(err);
  }
};

export const getHiveInsights = async (req, res, next) => {
  try {
    const ownerId = req.userRole === "admin" ? null : req.user.id;
    const insights = await hivesService.getInsights(ownerId);
    res.status(200).json({ insights });
  } catch (err) {
    next(err);
  }
};

export const getHiveById = async (req, res, next) => {
  try {
    const hive = await hivesService.getHiveById(req.params.id);
    if (!hive) {
      return res.status(404).json({ error: "Hive not found" });
    }
    if (req.userRole !== "admin" && hive.owner_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied to this hive" });
    }
    res.status(200).json({ hive });
  } catch (err) {
    next(err);
  }
};

export const createHive = async (req, res, next) => {
  try {
    const { location_lat, location_lng, current_health_category } = req.body;
    const hiveData = {
      owner_id: req.user.id,
      location_lat: location_lat !== undefined ? Number(location_lat) : null,
      location_lng: location_lng !== undefined ? Number(location_lng) : null,
      current_health_category: current_health_category || "healthy",
    };

    const hive = await hivesService.createHive(hiveData);
    res.status(201).json({ hive });
  } catch (err) {
    next(err);
  }
};

export const updateHive = async (req, res, next) => {
  try {
    const hive = await hivesService.getHiveById(req.params.id);
    if (!hive) {
      return res.status(404).json({ error: "Hive not found" });
    }
    if (req.userRole !== "admin" && hive.owner_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied to update this hive" });
    }

    const updated = await hivesService.updateHive(req.params.id, req.body);
    res.status(200).json({ hive: updated });
  } catch (err) {
    next(err);
  }
};

export const addReading = async (req, res, next) => {
  try {
    const hiveId = req.params.id || req.body.hive_id;
    if (!hiveId) {
      return res.status(400).json({ error: "Hive ID is required" });
    }

    // 1. Validate reading ranges before saving
    const validationErrors = validateReadingRanges(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: "Invalid sensor reading range",
        details: validationErrors,
      });
    }

    // 2. Verify hive ownership
    const hive = await hivesService.getHiveById(hiveId);
    if (!hive) {
      return res.status(404).json({ error: "Target hive not found" });
    }
    if (req.userRole !== "admin" && hive.owner_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied to add reading for this hive" });
    }

    // 3. Add reading & recompute current_health_category
    const result = await hivesService.addReadingAndEvaluateHealth(hiveId, req.body);

    res.status(201).json({
      message: "Reading added and hive health category recomputed",
      reading: result.reading,
      hive: result.hive,
      health: result.health,
    });
  } catch (err) {
    next(err);
  }
};

export const getReadings = async (req, res, next) => {
  try {
    const hiveId = req.params.id;
    const hive = await hivesService.getHiveById(hiveId);
    if (!hive) {
      return res.status(404).json({ error: "Hive not found" });
    }
    if (req.userRole !== "admin" && hive.owner_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied to hive readings" });
    }

    const { start_date, end_date, sort } = req.query;
    const readings = await hivesService.getReadingsForHive(hiveId, {
      startDate: start_date,
      endDate: end_date,
      sort: sort || "desc",
    });

    res.status(200).json({ readings });
  } catch (err) {
    next(err);
  }
};
