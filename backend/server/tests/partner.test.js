import { describe, it } from "node:test";
import assert from "node:assert";
import { partnerService, ROLE_STAGE_MAP } from "../services/partner.service.js";

describe("Partner Services & Role-Stage Progression", () => {
  it("should define correct role-to-stage mapping for supply chain lifecycle", () => {
    assert.strictEqual(ROLE_STAGE_MAP.lab.currentStatus, "sealed");
    assert.strictEqual(ROLE_STAGE_MAP.lab.targetStatus, "bottler");
    assert.strictEqual(ROLE_STAGE_MAP.lab.stageName, "lab");

    assert.strictEqual(ROLE_STAGE_MAP.bottler.currentStatus, "lab");
    assert.strictEqual(ROLE_STAGE_MAP.bottler.targetStatus, "distributor");
    assert.strictEqual(ROLE_STAGE_MAP.bottler.stageName, "bottler");

    assert.strictEqual(ROLE_STAGE_MAP.distributor.currentStatus, "bottler");
    assert.strictEqual(ROLE_STAGE_MAP.distributor.targetStatus, "shelf");
    assert.strictEqual(ROLE_STAGE_MAP.distributor.stageName, "distributor");

    assert.deepStrictEqual(ROLE_STAGE_MAP.retailer.currentStatus, ["distributor", "shelf"]);
    assert.strictEqual(ROLE_STAGE_MAP.retailer.targetStatus, "delivered");
    assert.strictEqual(ROLE_STAGE_MAP.retailer.stageName, "shelf");
  });

  it("should format string & base64 certificate upload references correctly", async () => {
    const urlRef = await partnerService.uploadCertificateFile("batch-123", "https://example.com/cert.pdf");
    assert.strictEqual(urlRef, "https://example.com/cert.pdf");

    const textRef = await partnerService.uploadCertificateFile("batch-123", "Standard Lab Purity Certificate #8892");
    assert.ok(typeof textRef === "string");
  });
});
