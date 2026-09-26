import { describe, it } from "node:test";
import assert from "node:assert";

import { blockchainService, hashCustodyData, batchIdToBytes32 } from "../services/blockchain.service.js";
import { qrService } from "../services/qr.service.js";
import { computeTrustScore } from "../services/trust_score.service.js";
import { batchesService } from "../services/batches.service.js";

describe("Blockchain, QR Code & Trust Score Services", () => {
  const testBatchId = "11111111-2222-3333-4444-555555555555";
  const testActor = "0x1234567890123456789012345678901234567890";

  describe("Blockchain Service & Hashing", () => {
    it("should compute deterministic keccak256 hash for custody data", () => {
      const data = { temp: 22, location: "Apiary A" };
      const hash1 = hashCustodyData(testBatchId, "beekeeper", testActor, data);
      const hash2 = hashCustodyData(testBatchId, "beekeeper", testActor, data);

      assert.strictEqual(typeof hash1, "string");
      assert.ok(hash1.startsWith("0x"));
      assert.strictEqual(hash1.length, 66);
      assert.strictEqual(hash1, hash2, "Hashes must be identical for identical inputs");
    });

    it("should format UUID into valid bytes32 string", () => {
      const bytes32Val = batchIdToBytes32(testBatchId);
      assert.strictEqual(typeof bytes32Val, "string");
      assert.ok(bytes32Val.startsWith("0x"));
    });

    it("should record custody stage and retrieve history", async () => {
      const rec = await blockchainService.recordCustodyStage(
        testBatchId,
        "beekeeper",
        testActor,
        { batch_notes: "Initial harvest" }
      );

      assert.ok(rec.txHash);
      assert.ok(rec.dataHash);
      assert.strictEqual(typeof rec.timestamp, "number");

      const history = await blockchainService.getCustodyHistoryOnChain(testBatchId);
      assert.ok(Array.isArray(history));
      assert.ok(history.length >= 1);
      assert.strictEqual(history[0].stage, "beekeeper");
    });

    it("should detect mismatch during cross-check when DB hash differs", () => {
      const dbRecords = [
        { stage: "beekeeper", data_hash: "0x1111111111111111111111111111111111111111111111111111111111111111" },
      ];
      const chainRecords = [
        { stage: "beekeeper", dataHash: "0x2222222222222222222222222222222222222222222222222222222222222222" },
      ];

      const check = blockchainService.crossCheckCustody(dbRecords, chainRecords);
      assert.strictEqual(check.matched, false);
      assert.strictEqual(check.data_integrity_warning, true);
      assert.ok(check.details.includes("Data hash mismatch"));
    });

    it("should pass cross-check when DB and on-chain records match", () => {
      const hash = "0x9999999999999999999999999999999999999999999999999999999999999999";
      const dbRecords = [{ stage: "beekeeper", data_hash: hash }];
      const chainRecords = [{ stage: "beekeeper", dataHash: hash }];

      const check = blockchainService.crossCheckCustody(dbRecords, chainRecords);
      assert.strictEqual(check.matched, true);
      assert.strictEqual(check.data_integrity_warning, false);
    });
  });

  describe("QR Code Service", () => {
    it("should generate a QR code data URL and verification URL for a batch", async () => {
      const result = await qrService.generateAndStoreBatchQr(testBatchId);

      assert.ok(result.qrImageUrl);
      assert.ok(result.qrImageUrl.startsWith("data:image/png;base64,"));
      assert.ok(result.verificationUrl.includes(`/verify/${testBatchId}`));
      assert.strictEqual(result.qrCodeId, `QR-${testBatchId.toUpperCase()}`);
    });
  });

  describe("Trust Score Computation", () => {
    it("should compute trust score 0-100 with breakdown factors", () => {
      const custodyRecords = [
        { stage: "beekeeper", timestamp: new Date().toISOString(), data_hash: "0xhash" },
        { stage: "lab", timestamp: new Date().toISOString(), data_hash: "0xhash" },
      ];
      const labTests = [{ results_summary: "Purity 99.8% - PASSED" }];
      const onChainRecords = [
        { stage: "beekeeper", dataHash: "0xhash" },
        { stage: "lab", dataHash: "0xhash" },
      ];

      const trust = computeTrustScore({
        batch: { created_at: new Date().toISOString() },
        custodyRecords,
        labTests,
        onChainRecords,
      });

      assert.strictEqual(typeof trust.trust_score, "number");
      assert.ok(trust.trust_score >= 0 && trust.trust_score <= 100);
      assert.ok(Array.isArray(trust.breakdown));
      assert.strictEqual(trust.breakdown.length, 4);
      assert.strictEqual(trust.data_integrity_warning, false);
    });

    it("should penalize trust score if data integrity warning is raised", () => {
      const dbRecords = [{ stage: "beekeeper", data_hash: "0xAAA" }];
      const chainRecords = [{ stage: "beekeeper", dataHash: "0xBBB" }];

      const trust = computeTrustScore({
        batch: {},
        custodyRecords: dbRecords,
        labTests: [],
        onChainRecords: chainRecords,
      });

      assert.strictEqual(trust.data_integrity_warning, true);
      const integrityFactor = trust.breakdown.find((f) => f.factor === "Blockchain Cryptographic Match");
      assert.strictEqual(integrityFactor.points, 0);
    });
  });
});
