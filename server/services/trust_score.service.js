import { blockchainService } from "./blockchain.service.js";

/**
 * Computes a simple "Trust Score" (0–100) for a honey batch based on:
 * - Percentage of custody stages completed (up to 60 pts)
 * - Whether lab test results exist and passed (up to 20 pts)
 * - Whether on-chain and off-chain custody records match (up to 15 pts)
 * - Recency of last update (up to 5 pts)
 */
export function computeTrustScore({ batch, custodyRecords = [], labTests = [], onChainRecords = [] }) {
  let score = 0;
  const breakdown = [];

  // 1. Custody Stages Completion (max 60 pts)
  const STAGES = ["beekeeper", "lab", "bottler", "distributor", "shelf"];
  const completedStages = new Set(custodyRecords.map((c) => c.stage));
  const completedCount = STAGES.filter((s) => completedStages.has(s)).length;

  const custodyPoints = Math.round((completedCount / STAGES.length) * 60);
  score += custodyPoints;
  breakdown.push({
    factor: "Custody Chain Progress",
    points: custodyPoints,
    maxPoints: 60,
    detail: `${completedCount} of 5 supply chain stages completed`,
  });

  // 2. Lab Test Verification (max 20 pts)
  let labPoints = 0;
  let labDetail = "No lab test recorded yet";
  if (labTests && labTests.length > 0) {
    const latestTest = labTests[0];
    const summary = String(latestTest.results_summary || "").toLowerCase();
    if (summary.includes("pass") || summary.includes("verified") || summary.includes("clean") || summary.includes("pure")) {
      labPoints = 20;
      labDetail = "Lab test passed & verified";
    } else {
      labPoints = 10;
      labDetail = "Lab test recorded";
    }
  }
  score += labPoints;
  breakdown.push({
    factor: "Lab Purity Test",
    points: labPoints,
    maxPoints: 20,
    detail: labDetail,
  });

  // 3. On-chain vs Off-chain Integrity Match (max 15 pts)
  let integrityPoints = 15;
  let integrityDetail = "On-chain ledger hash match verified";
  const crossCheck = blockchainService.crossCheckCustody(custodyRecords, onChainRecords);
  if (crossCheck.data_integrity_warning) {
    integrityPoints = 0;
    integrityDetail = "Warning: Data mismatch detected between off-chain database and on-chain ledger";
  }
  score += integrityPoints;
  breakdown.push({
    factor: "Blockchain Cryptographic Match",
    points: integrityPoints,
    maxPoints: 15,
    detail: integrityDetail,
  });

  // 4. Recency of Last Update (max 5 pts)
  let recencyPoints = 1;
  let recencyDetail = "Older batch update";
  if (custodyRecords.length > 0) {
    const lastUpdate = new Date(custodyRecords[custodyRecords.length - 1].timestamp || Date.now());
    const daysDiff = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff <= 30) {
      recencyPoints = 5;
      recencyDetail = "Updated within last 30 days";
    } else if (daysDiff <= 60) {
      recencyPoints = 3;
      recencyDetail = "Updated within last 60 days";
    }
  } else if (batch?.created_at) {
    const daysDiff = (Date.now() - new Date(batch.created_at).getTime()) / (1000 * 60 * 60 * 24);
    if (daysDiff <= 30) recencyPoints = 5;
  }
  score += recencyPoints;
  breakdown.push({
    factor: "Update Recency",
    points: recencyPoints,
    maxPoints: 5,
    detail: recencyDetail,
  });

  const finalScore = Math.min(100, Math.max(0, score));

  return {
    trust_score: finalScore,
    breakdown,
    data_integrity_warning: crossCheck.data_integrity_warning,
  };
}
