import { describe, it } from "node:test";
import assert from "node:assert";
import { hivesService } from "../services/hives.service.js";
import { aiService } from "../services/ai.service.js";
import { batchesService } from "../services/batches.service.js";
import { partnerService } from "../services/partner.service.js";
import { publicService } from "../services/public.service.js";

describe("HoneyTrace End-to-End Supply Chain Lifecycle", () => {
  let createdHiveId = null;
  let createdBatchId = null;

  const testBeekeeper = { id: "00000000-0000-4000-a000-000000000001", role: "beekeeper" };
  const testLabUser = { id: "00000000-0000-4000-a000-000000000002", role: "lab" };
  const testBottlerUser = { id: "00000000-0000-4000-a000-000000000003", role: "bottler" };
  const testDistributorUser = { id: "00000000-0000-4000-a000-000000000004", role: "distributor" };
  const testRetailerUser = { id: "00000000-0000-4000-a000-000000000005", role: "retailer" };

  const hasSupabase = Boolean(
    process.env.SUPABASE_URL &&
      !process.env.SUPABASE_URL.includes("your-supabase") &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("your_supabase")
  );

  it("1. Should create a hive and log a telemetry sensor reading", async (t) => {
    if (!hasSupabase) {
      t.skip("Skipping live Supabase database test - SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
      return;
    }

    const hive = await hivesService.createHive({
      owner_id: testBeekeeper.id,
      location_lat: 12.5234,
      location_lng: 75.8123,
      current_health_category: "healthy",
    });

    assert.ok(hive.id);
    createdHiveId = hive.id;

    const readingRes = await hivesService.addReadingAndEvaluateHealth(hive.id, {
      temperature: 34.2,
      humidity: 55.0,
      weight: 42.5,
      activity_level: 80,
      notes: "Optimal conditions during mid-day check",
    });

    assert.strictEqual(readingRes.health.category, "healthy");
    assert.ok(readingRes.reading.id);
  });


  it("2. Should compute AI harvest recommendation for the hive", async (t) => {
    if (!hasSupabase) {
      t.skip("Skipping live Supabase database test - SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
      return;
    }
    const insight = await aiService.computeAndSaveHiveInsight(createdHiveId);
    assert.ok(insight);
    assert.ok(insight.payload);
  });

  it("3. Should create and seal a batch, generating QR code and blockchain ID", async (t) => {
    if (!hasSupabase) {
      t.skip("Skipping live Supabase database test - SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
      return;
    }
    const batch = await batchesService.validateAndCreateBatch({
      userId: testBeekeeper.id,
      userRole: testBeekeeper.role,
      source_hive_ids: [createdHiveId],
      harvest_start_date: new Date(Date.now() - 7 * 86400000).toISOString(),
      harvest_end_date: new Date().toISOString(),
      forage_location: "Coorg Wildflower Apiary",
    });

    assert.strictEqual(batch.status, "draft");
    createdBatchId = batch.id;

    const sealed = await batchesService.sealBatch(batch.id, testBeekeeper.id, testBeekeeper.role);

    assert.strictEqual(sealed.status, "sealed");
    assert.ok(sealed.qr_code_id);
    assert.ok(sealed.blockchain_record_id);
    assert.ok(sealed.qr_image_url);
  });

  it("4. Should walk batch through all 4 partner stage updates (lab -> bottler -> distributor -> shelf)", async (t) => {
    if (!hasSupabase) {
      t.skip("Skipping live Supabase database test - SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
      return;
    }
    // A. Lab update
    const labUpdate = await partnerService.updatePartnerBatchStage(createdBatchId, testLabUser, {
      results_summary: "99.9% Pure Honey - Certified Pure",
      certificate_file: "https://honeytrace.io/certs/e2e-cert.pdf",
    });
    assert.strictEqual(labUpdate.status, "bottler");

    // B. Bottler update
    const bottlerUpdate = await partnerService.updatePartnerBatchStage(createdBatchId, testBottlerUser, {
      jar_count: 500,
      notes: "Packaged in eco-friendly glass jars",
    });
    assert.strictEqual(bottlerUpdate.status, "distributor");

    // C. Distributor update
    const distUpdate = await partnerService.updatePartnerBatchStage(createdBatchId, testDistributorUser, {
      transport_details: "Express Transit #E2E",
      current_location: "Central Hub",
      temperature_log: "18°C",
    });
    assert.strictEqual(distUpdate.status, "shelf");

    // D. Retailer update
    const retailUpdate = await partnerService.updatePartnerBatchStage(createdBatchId, testRetailerUser, {
      store_name: "Nature Harvest Store",
      store_location: "Main Street, Sector 1",
    });
    assert.strictEqual(retailUpdate.status, "delivered");
  });

  it("5. Should fetch public verification payload and confirm full history & high trust score", async (t) => {
    if (!hasSupabase) {
      t.skip("Skipping live Supabase database test - SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
      return;
    }
    const publicData = await publicService.getPublicBatchDetail(createdBatchId);

    assert.strictEqual(publicData.id, createdBatchId);
    assert.strictEqual(publicData.status, "delivered");
    assert.strictEqual(publicData.custody_records.length, 5);
    assert.strictEqual(publicData.lab_tests.length, 1);
    assert.ok(publicData.trust_score >= 80);
    assert.strictEqual(publicData.data_integrity_warning, false);
  });

  it("6. Should submit consumer feedback for the verified batch", async (t) => {
    if (!hasSupabase) {
      t.skip("Skipping live Supabase database test - SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.");
      return;
    }
    const fb = await publicService.addPublicFeedback(createdBatchId, {
      rating: 5,
      tasting_notes: "Exquisite wildflower flavor and rich texture.",
      submitter_name: "E2E Tester",
    });

    assert.strictEqual(fb.rating, 5);
    assert.strictEqual(fb.submitter_name, "E2E Tester");
  });
});

