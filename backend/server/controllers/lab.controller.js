import { labService } from "../services/lab.service.js";

export const getLabTests = async (req, res, next) => {
  try {
    const labTests = await labService.getLabTestsForBatch(req.params.batchId);
    res.json({ lab_tests: labTests });
  } catch (err) {
    next(err);
  }
};

export const addLabTest = async (req, res, next) => {
  try {
    const { batch_id, results_summary, certificate_storage_reference } = req.body;

    if (req.userRole !== "lab" && req.userRole !== "admin") {
      return res.status(403).json({ error: "Forbidden: Only Lab or Admin role can add lab test results" });
    }

    const labTest = await labService.addLabTest({
      batch_id,
      results_summary,
      certificate_storage_reference,
    });

    res.status(201).json({ lab_test: labTest });
  } catch (err) {
    next(err);
  }
};
