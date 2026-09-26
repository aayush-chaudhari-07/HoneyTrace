import { custodyService } from "../services/custody.service.js";
import { batchesService } from "../services/batches.service.js";

const STAGE_PERMISSIONS = {
  beekeeper: ["beekeeper", "admin"],
  lab: ["lab", "admin"],
  bottler: ["bottler", "admin"],
  distributor: ["distributor", "admin"],
  shelf: ["retailer", "admin"],
};

export const getCustodyRecords = async (req, res, next) => {
  try {
    const result = await custodyService.getCustodyForBatch(req.params.batchId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const addCustodyRecord = async (req, res, next) => {
  try {
    const { batch_id, stage, storage_reference, extra_data } = req.body;

    const allowedRoles = STAGE_PERMISSIONS[stage];
    if (!allowedRoles || (!allowedRoles.includes(req.userRole) && req.userRole !== "admin")) {
      return res.status(403).json({
        error: `Forbidden: Updating custody stage '${stage}' requires role [${allowedRoles ? allowedRoles.join(", ") : "admin"}]`,
      });
    }

    const batch = await batchesService.getBatchById(batch_id);
    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    const record = await custodyService.addCustodyRecord({
      batch_id,
      stage,
      actor_user_id: req.user.id,
      storage_reference,
      extra_data: extra_data || {},
    });

    // Update batch status to match custody stage if applicable
    const statusMap = {
      lab: "lab",
      bottler: "bottler",
      distributor: "distributor",
      shelf: "shelf",
    };
    if (statusMap[stage] && batch.status !== statusMap[stage]) {
      try {
        await batchesService.updateBatchStatusWithLifecycle(batch_id, statusMap[stage], req.user.id, req.userRole);
      } catch (e) {
        console.warn("⚠️ Batch status update note:", e.message);
      }
    }

    res.status(201).json({ custody_record: record });
  } catch (err) {
    next(err);
  }
};
