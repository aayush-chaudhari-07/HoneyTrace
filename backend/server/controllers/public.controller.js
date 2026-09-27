import { publicService } from "../services/public.service.js";

export const getPublicBatch = async (req, res, next) => {
  try {
    const batch = await publicService.getPublicBatchDetail(req.params.id);
    res.status(200).json({ batch });
  } catch (err) {
    next(err);
  }
};

export const lookupBatch = async (req, res, next) => {
  try {
    const result = await publicService.lookupBatchByCode(req.query.code);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const submitPublicFeedback = async (req, res, next) => {
  try {
    const feedback = await publicService.addPublicFeedback(req.params.id, req.body);
    res.status(201).json({
      message: "Thank you for your feedback! Your review has been saved.",
      feedback,
    });
  } catch (err) {
    next(err);
  }
};
