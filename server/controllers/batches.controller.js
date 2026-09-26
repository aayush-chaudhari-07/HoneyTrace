import { batchesService } from "../services/batches.service.js";

export const getBatches = async (req, res, next) => {
  try {
    const batches = await batchesService.listBatches(req.user?.id, req.userRole);
    res.status(200).json({ batches });
  } catch (err) {
    next(err);
  }
};

export const getBatchById = async (req, res, next) => {
  try {
    const batch = await batchesService.getBatchDetail(req.params.id);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    // Allow public access for non-draft batches (consumer verification)
    if (batch.status === "draft" && (!req.user || (req.userRole !== "admin" && batch.created_by !== req.user.id))) {
      return res.status(403).json({ error: "Access denied to draft batch" });
    }

    res.status(200).json({ batch });
  } catch (err) {
    next(err);
  }
};

export const createBatch = async (req, res, next) => {
  try {
    const { source_hive_ids, harvest_start_date, harvest_end_date, forage_location } = req.body;

    const batch = await batchesService.validateAndCreateBatch({
      userId: req.user.id,
      userRole: req.userRole,
      source_hive_ids,
      harvest_start_date,
      harvest_end_date,
      forage_location,
    });

    res.status(201).json({
      message: "Batch created successfully in draft status",
      batch,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBatch = async (req, res, next) => {
  try {
    const { forage_location, harvest_start_date, harvest_end_date } = req.body;

    const updated = await batchesService.updateDraftBatch(
      req.params.id,
      { forage_location, harvest_start_date, harvest_end_date },
      req.user.id,
      req.userRole
    );

    res.status(200).json({
      message: "Draft batch updated successfully",
      batch: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const sealBatch = async (req, res, next) => {
  try {
    const sealedBatch = await batchesService.sealBatch(
      req.params.id,
      req.user.id,
      req.userRole
    );

    res.status(200).json({
      message: "Batch sealed successfully with blockchain record and QR code generated",
      batch: sealedBatch,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBatchStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Target status is required" });
    }

    const updated = await batchesService.updateBatchStatusWithLifecycle(
      req.params.id,
      status,
      req.user.id,
      req.userRole
    );

    res.status(200).json({
      message: `Batch status transitioned to '${status}'`,
      batch: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const getBatchTrustScore = async (req, res, next) => {
  try {
    const trustScoreData = await batchesService.getBatchTrustScore(req.params.id);
    if (!trustScoreData) {
      return res.status(404).json({ error: "Batch not found" });
    }
    res.status(200).json(trustScoreData);
  } catch (err) {
    next(err);
  }
};

