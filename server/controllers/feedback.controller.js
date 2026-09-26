import { feedbackService } from "../services/feedback.service.js";

export const getFeedback = async (req, res, next) => {
  try {
    const feedback = await feedbackService.getFeedbackForBatch(req.params.batchId);
    res.json({ feedback });
  } catch (err) {
    next(err);
  }
};

export const addFeedback = async (req, res, next) => {
  try {
    const { batch_id, rating, tasting_notes, submitter_name } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const feedback = await feedbackService.addFeedback({
      batch_id,
      rating,
      tasting_notes,
      submitter_name,
    });

    res.status(201).json({ feedback });
  } catch (err) {
    next(err);
  }
};
