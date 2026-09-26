import { batchesService } from "../services/batches.service.js";

export const getBatches = async (req, res, next) => {
  try {
    const batches = await batchesService.listBatches(req.user?.id, req.userRole);
    res.json({ batches });
  } catch (err) {
    next(err);
  }
};

export const getBatchById = async (req, res, next) => {
  try {
    const batch = await batchesService.getBatchById(req.params.id);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }
    // Allow public access for non-draft batches (consumer verification)
    if (batch.status === "draft" && (!req.user || (req.userRole !== "admin" && batch.created_by !== req.user.id))) {
      return res.status(403).json({ error: "Access denied to draft batch" });
    }
    res.json({ batch });
  } catch (err) {
    next(err);
  }
};

export const createBatch = async (req, res, next) => {
  try {
    const { source_hive_ids, harvest_start_date, harvest_end_date, forage_location } = req.body;
    const batchData = {
      source_hive_ids: source_hive_ids || [],
      harvest_start_date,
      harvest_end_date,
      forage_location,
      status: "draft",
      created_by: req.user.id,
    };
    const batch = await batchesService.createBatch(batchData);
    res.status(201).json({ batch });
  } catch (err) {
    next(err);
  }
};

export const updateBatchStatus = async (req, res, next) => {
  try {
    const { status, blockchain_record_id, qr_code_id } = req.body;
    const batch = await batchesService.updateBatchStatus(req.params.id, status, {
      blockchain_record_id,
      qr_code_id,
    });
    res.json({ batch });
  } catch (err) {
    next(err);
  }
};
