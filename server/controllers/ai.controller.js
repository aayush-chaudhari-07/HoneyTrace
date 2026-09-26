import { aiService } from "../services/ai.service.js";

export const getHiveInsights = async (req, res, next) => {
  try {
    const insights = await aiService.getInsightsForHive(req.params.hiveId);
    res.json({ insights });
  } catch (err) {
    next(err);
  }
};

export const getBatchInsights = async (req, res, next) => {
  try {
    const insights = await aiService.getInsightsForBatch(req.params.batchId);
    res.json({ insights });
  } catch (err) {
    next(err);
  }
};

export const createInsight = async (req, res, next) => {
  try {
    const { hive_id, batch_id, type, payload } = req.body;
    const insight = await aiService.createInsight({
      hive_id,
      batch_id,
      type,
      payload,
    });
    res.status(201).json({ insight });
  } catch (err) {
    next(err);
  }
};
