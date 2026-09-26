import assert from "node:assert";
import test from "node:test";
import {
  isValidStatusTransition,
  generateBlockchainRecordId,
  generateQrCodeId,
  STATUS_ORDER,
} from "../services/batches.service.js";

// ============================================================================
// 1. Status Transition Lifecycle Tests
// ============================================================================
test("Status lifecycle: allows sequential progression through all stages", () => {
  for (let i = 0; i < STATUS_ORDER.length - 1; i++) {
    const current = STATUS_ORDER[i];
    const next = STATUS_ORDER[i + 1];
    const res = isValidStatusTransition(current, next);
    assert.strictEqual(res.valid, true, `Transition from ${current} to ${next} should be valid`);
  }
});

test("Status lifecycle: rejects skipping stages (e.g. draft -> bottler)", () => {
  const res = isValidStatusTransition("draft", "bottler");
  assert.strictEqual(res.valid, false);
  assert.match(res.reason, /Cannot skip stages/i);
});

test("Status lifecycle: rejects reversing stages (e.g. lab -> draft)", () => {
  const res = isValidStatusTransition("lab", "draft");
  assert.strictEqual(res.valid, false);
  assert.match(res.reason, /Cannot reverse or re-apply stage/i);
});

test("Status lifecycle: rejects invalid status values", () => {
  const res = isValidStatusTransition("draft", "invalid_status");
  assert.strictEqual(res.valid, false);
  assert.match(res.reason, /Unknown status values/i);
});

// ============================================================================
// 2. Blockchain Record ID & QR Code Generation Tests
// ============================================================================
test("Blockchain & QR ID generator: produces valid hex hash and QR format", () => {
  const batchId = "11111111-2222-3333-4444-555555555555";
  const blockchainId = generateBlockchainRecordId(batchId);
  const qrId = generateQrCodeId(batchId);

  assert.match(blockchainId, /^0x[A-Z0-9]{12,}/i);
  assert.strictEqual(qrId, `QR-${batchId.toUpperCase()}`);
});
