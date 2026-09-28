import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { supabaseAdmin } from "../server/config/supabase.js";
import { blockchainService } from "../server/services/blockchain.service.js";
import { qrService } from "../server/services/qr.service.js";
import { hivesService } from "../server/services/hives.service.js";
import { batchesService } from "../server/services/batches.service.js";
import { partnerService } from "../server/services/partner.service.js";
import { publicService } from "../server/services/public.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

/**
 * Idempotent Seed Script for HoneyTrace Demo Data
 * Creates Auth Users across all 6 roles (with password: Password123!), hives with readings & anomalies,
 * and 3 demo batches at different supply chain stages.
 */
async function seedDemoData() {
  console.log("🐝 Starting HoneyTrace Idempotent Database & Supply Chain Seed...");

  // 1. Define Demo Users across all roles
  const usersToSeed = [
    { id: "00000000-0000-4000-a000-000000000001", name: "Amara Vance (Master Beekeeper)", role: "beekeeper", email: "beekeeper@honeytrace.io", contact: "+1-555-0192" },
    { id: "00000000-0000-4000-a000-000000000002", name: "Dr. Elena Rostova (Purity Labs)", role: "lab", email: "lab@honeytrace.io", contact: "+1-555-0193" },
    { id: "00000000-0000-4000-a000-000000000003", name: "Marcus Sterling (Golden Jar Bottling)", role: "bottler", email: "bottler@honeytrace.io", contact: "+1-555-0194" },
    { id: "00000000-0000-4000-a000-000000000004", name: "SwiftLogistics ColdChain", role: "distributor", email: "distributor@honeytrace.io", contact: "+1-555-0195" },
    { id: "00000000-0000-4000-a000-000000000005", name: "GreenField Organic Market", role: "retailer", email: "retailer@honeytrace.io", contact: "+1-555-0196" },
    { id: "00000000-0000-4000-a000-000000000006", name: "HoneyTrace System Admin", role: "admin", email: "admin@honeytrace.io", contact: "+1-555-0199" },
  ];

  for (const u of usersToSeed) {
    try {
      // 1a. Ensure user exists in Supabase Auth
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const authUser = existingUsers?.users?.find((x) => x.email === u.email);

      if (!authUser) {
        await supabaseAdmin.auth.admin.createUser({
          id: u.id,
          email: u.email,
          password: "Password123!",
          email_confirm: true,
          user_metadata: { full_name: u.name, role: u.role },
        });
        console.log(`👤 Created Auth user: ${u.email}`);
      } else {
        await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
          password: "Password123!",
          user_metadata: { full_name: u.name, role: u.role },
        });
        console.log(`👤 Updated Auth user: ${u.email}`);
      }
    } catch (err) {
      console.warn(`⚠️ Supabase Auth seed note (${u.email}):`, err.message);
    }

    try {
      // 1b. Upsert into public.users table
      await supabaseAdmin.from("users").upsert(u, { onConflict: "id" });
      await supabaseAdmin.from("user_roles").upsert({ user_id: u.id, role: u.role }, { onConflict: "user_id,role" });
    } catch (err) {
      console.warn(`⚠️ User profile DB upsert note (${u.email}):`, err.message);
    }
  }

  const beekeeperId = usersToSeed[0].id;
  const labUserId = usersToSeed[1].id;
  const bottlerUserId = usersToSeed[2].id;
  const distUserId = usersToSeed[3].id;
  const retailerUserId = usersToSeed[4].id;

  // 2. Define Demo Hives (including 1 hive with anomaly)
  const hivesToSeed = [
    { id: "11111111-1111-4000-a000-111111111111", owner_id: beekeeperId, location_lat: 12.5234, location_lng: 75.8123, current_health_category: "healthy" },
    { id: "22222222-2222-4000-a000-222222222222", owner_id: beekeeperId, location_lat: 12.5289, location_lng: 75.8178, current_health_category: "healthy" },
    { id: "33333333-3333-4000-a000-333333333333", owner_id: beekeeperId, location_lat: 12.5310, location_lng: 75.8201, current_health_category: "critical" }, // Anomaly Hive
    { id: "44444444-4444-4000-a000-444444444444", owner_id: beekeeperId, location_lat: 12.5190, location_lng: 75.8055, current_health_category: "healthy" },
  ];

  for (const h of hivesToSeed) {
    await hivesService.createHive(h);
  }
  console.log("✅ 4 Hives seeded cleanly.");

  // 3. Seed Historical Readings for Hives
  const now = Date.now();
  for (const h of hivesToSeed) {
    for (let day = 14; day >= 0; day--) {
      const ts = new Date(now - day * 24 * 60 * 60 * 1000).toISOString();
      let temp = Number((34.0 + (Math.random() * 1.5 - 0.75)).toFixed(1));
      let hum = Number((54.0 + (Math.random() * 4 - 2)).toFixed(1));
      let weight = Number((42.0 - day * 0.15 + Math.random() * 0.2).toFixed(1));
      let activity = Math.floor(75 + Math.random() * 20);

      // Trigger anomaly on Hive 3 on recent days
      if (h.id === hivesToSeed[2].id && day <= 2) {
        weight = 28.5; // Sudden >30% weight drop
        temp = 41.2;  // Temperature spike
        activity = 20; // Severe activity drop
      }

      await hivesService.addReadingAndEvaluateHealth(h.id, {
        temperature: temp,
        humidity: hum,
        weight: weight,
        activity_level: activity,
        notes: day === 0 ? "Latest telemetric sensor sync" : `Daily telemetric check ${day}d ago`,
        timestamp: ts,
      });
    }
  }
  console.log("✅ Sensor Readings seeded with hive anomaly.");

  // 4. Create 3 Demo Batches at Different Lifecycle Stages

  // Batch 1: Draft Batch
  const draftBatch = await batchesService.validateAndCreateBatch({
    userId: beekeeperId,
    userRole: "beekeeper",
    source_hive_ids: [hivesToSeed[3].id],
    harvest_start_date: new Date(now - 3 * 86400000).toISOString(),
    harvest_end_date: new Date(now - 1 * 86400000).toISOString(),
    forage_location: "Highland Forest Apiary",
  });
  console.log(`📌 Demo Batch 1 [draft]: ${draftBatch.id}`);

  // Batch 2: Active Batch at Lab Stage
  const activeBatch = await batchesService.validateAndCreateBatch({
    userId: beekeeperId,
    userRole: "beekeeper",
    source_hive_ids: [hivesToSeed[1].id],
    harvest_start_date: new Date(now - 7 * 86400000).toISOString(),
    harvest_end_date: new Date(now - 5 * 86400000).toISOString(),
    forage_location: "Wild Acacia Grove",
  });
  await batchesService.sealBatch(activeBatch.id, beekeeperId, "beekeeper");
  console.log(`📌 Demo Batch 2 [sealed/lab]: ${activeBatch.id}`);

  // Batch 3: Fully Completed Batch (Delivered) with full lifecycle, QR, Lab Report, and Feedback
  const completedBatchId = "b0000000-0000-4000-a000-000000000101";
  
  // Create & seal
  const compBatch = await batchesService.validateAndCreateBatch({
    id: completedBatchId,
    userId: beekeeperId,
    userRole: "beekeeper",
    source_hive_ids: [hivesToSeed[0].id, hivesToSeed[1].id],
    harvest_start_date: new Date(now - 14 * 86400000).toISOString(),
    harvest_end_date: new Date(now - 12 * 86400000).toISOString(),
    forage_location: "Wildflower & Clover Apiary Meadow, Coorg Valley",
  });
  
  // Force fixed ID for deterministic QR link
  compBatch.id = completedBatchId;
  const qrRes = await qrService.generateAndStoreBatchQr(completedBatchId);
  compBatch.qr_code_id = qrRes.qrCodeId;
  compBatch.blockchain_record_id = `0x${completedBatchId.replace(/-/g, "").substring(0, 16)}`;
  await batchesService.sealBatch(completedBatchId, beekeeperId, "beekeeper");

  // Walk through lab -> bottler -> distributor -> retailer
  await partnerService.updatePartnerBatchStage(completedBatchId, { id: labUserId, role: "lab" }, {
    results_summary: "Purity 99.8% - NMR Verified Pure Blossom Honey. Zero adulterants detected.",
    certificate_file: "https://honeytrace.io/certificates/lab-cert-101.pdf",
  });

  await partnerService.updatePartnerBatchStage(completedBatchId, { id: bottlerUserId, role: "bottler" }, {
    jar_count: 1200,
    notes: "Packaged in eco-friendly 500g glass jars with seal.",
  });

  await partnerService.updatePartnerBatchStage(completedBatchId, { id: distUserId, role: "distributor" }, {
    transport_details: "Refrigerated Express Transit #TX-902",
    current_location: "Metro Distribution Center",
    temperature_log: "18.5°C constant climate controlled",
  });

  await partnerService.updatePartnerBatchStage(completedBatchId, { id: retailerUserId, role: "retailer" }, {
    store_name: "GreenField Organic Market",
    store_location: "742 Evergreen Terrace, Sector 4",
  });

  // Add Consumer Feedback
  await publicService.addPublicFeedback(completedBatchId, {
    rating: 5,
    tasting_notes: "Rich floral aroma with distinct wild thyme undertones. Incredible purity!",
    submitter_name: "Sophia Chen",
  });

  console.log("\n🎉 HoneyTrace Seed Complete!");
  console.log("==========================================================================");
  console.log("DEMO ACCOUNTS (Password for all accounts: Password123!):");
  console.log(" - Beekeeper:    beekeeper@honeytrace.io");
  console.log(" - Lab:          lab@honeytrace.io");
  console.log(" - Bottler:      bottler@honeytrace.io");
  console.log(" - Distributor:  distributor@honeytrace.io");
  console.log(" - Retailer:     retailer@honeytrace.io");
  console.log(" - Admin:        admin@honeytrace.io");
  console.log("==========================================================================");
  console.log(`🔗 Fully Completed Batch ID: ${completedBatchId}`);
  console.log(`📱 QR Code ID: ${qrRes.qrCodeId}`);
  console.log(`🌐 Verification Link: http://localhost:5173/verify/${completedBatchId}`);
  console.log("==========================================================================");
}

seedDemoData().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
