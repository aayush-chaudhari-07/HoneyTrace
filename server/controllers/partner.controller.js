import { partnerService } from "../services/partner.service.js";

export const getPendingBatches = async (req, res, next) => {
  try {
    const batches = await partnerService.getPendingBatches(req.userRole);
    res.status(200).json({ batches });
  } catch (err) {
    next(err);
  }
};

export const updatePartnerBatch = async (req, res, next) => {
  try {
    const updatedBatch = await partnerService.updatePartnerBatchStage(
      req.params.id,
      req.user,
      req.body
    );

    res.status(200).json({
      message: `Batch custody stage successfully updated for role '${req.userRole}'`,
      batch: updatedBatch,
    });
  } catch (err) {
    next(err);
  }
};
