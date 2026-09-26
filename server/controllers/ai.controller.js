import { aiService } from "../services/ai.service.js";

export const getHiveAiInsight = async (req, res, next) => {
  try {
    const hiveId = req.params.id || req.params.hiveId;
    if (!hiveId) {
      return res.status(400).json({ error: "Hive ID is required" });
    }

    const insight = await aiService.computeAndSaveHiveInsight(hiveId);

    res.status(200).json({
      message: "Smart Harvest AI insight generated and saved",
      insight,
    });
  } catch (err) {
    next(err);
  }
};

export const recordInsightFeedback = async (req, res, next) => {
  try {
    const { insight_id, recommendation_followed, override_reason } = req.body;

    if (!insight_id) {
      return res.status(400).json({ error: "insight_id is required" });
    }
    if (recommendation_followed === undefined || recommendation_followed === null) {
      return res.status(400).json({ error: "recommendation_followed (boolean) is required" });
    }

    const updatedInsight = await aiService.recordFeedback(
      insight_id,
      recommendation_followed,
      override_reason
    );

    res.status(200).json({
      message: "Beekeeper AI harvest feedback recorded successfully",
      insight: updatedInsight,
    });
  } catch (err) {
    next(err);
  }
};

export const internalRecommend = async (req, res, next) => {
  try {
    const { hive_id } = req.body;
    const hiveId = hive_id || req.body.hiveId;
    if (!hiveId) {
      return res.status(400).json({ error: "hive_id is required" });
    }

    const insight = await aiService.computeAndSaveHiveInsight(hiveId);
    res.status(200).json(insight);
  } catch (err) {
    next(err);
  }
};

export const internalDetectAnomaly = async (req, res, next) => {
  try {
    const { hive_id } = req.body;
    const hiveId = hive_id || req.body.hiveId;
    if (!hiveId) {
      return res.status(400).json({ error: "hive_id is required" });
    }

    const insight = await aiService.computeAndSaveHiveInsight(hiveId);
    res.status(200).json({
      hive_id: hiveId,
      anomaly_detection: insight.payload?.anomaly_detection,
    });
  } catch (err) {
    next(err);
  }
};
