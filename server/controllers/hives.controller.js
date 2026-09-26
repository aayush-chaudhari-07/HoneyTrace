import { hivesService } from "../services/hives.service.js";

export const getHives = async (req, res, next) => {
  try {
    const ownerId = req.userRole === "admin" ? null : req.user.id;
    const hives = await hivesService.listHives(ownerId);
    res.json({ hives });
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
    res.json({ hive });
  } catch (err) {
    next(err);
  }
};

export const createHive = async (req, res, next) => {
  try {
    const { location_lat, location_lng, current_health_category } = req.body;
    const hiveData = {
      owner_id: req.user.id,
      location_lat,
      location_lng,
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
    res.json({ hive: updated });
  } catch (err) {
    next(err);
  }
};

export const addReading = async (req, res, next) => {
  try {
    const { hive_id, temperature, humidity, weight, activity_level, notes } = req.body;
    const hive = await hivesService.getHiveById(hive_id);
    if (!hive) {
      return res.status(404).json({ error: "Target hive not found" });
    }
    if (req.userRole !== "admin" && hive.owner_id !== req.user.id) {
      return res.status(403).json({ error: "Access denied to log readings for this hive" });
    }

    const reading = await hivesService.addReading({
      hive_id,
      temperature,
      humidity,
      weight,
      activity_level,
      notes,
    });

    res.status(201).json({ reading });
  } catch (err) {
    next(err);
  }
};

export const getReadings = async (req, res, next) => {
  try {
    const readings = await hivesService.getReadingsForHive(req.params.hiveId);
    res.json({ readings });
  } catch (err) {
    next(err);
  }
};
