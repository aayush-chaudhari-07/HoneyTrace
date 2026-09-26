import dotenv from "dotenv";
import { supabaseAdmin } from "../server/config/supabase.js";
import { blockchainService } from "../server/services/blockchain.service.js";
import { qrService } from "../server/services/qr.service.js";

dotenv.config();

/**
 * Seed Script for HoneyTrace Demo Data
 * Creates users for all roles, hives, historical readings, and a fully completed batch demo lifecycle.
 */
async function seedDemoData() {
  console.log("🐝 Starting HoneyTrace Database & Supply Chain Seed...");

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
    const { error } = await supabaseAdmin.from("users").upsert(u, { onConflict: "id" });
    if (error) console.warn(`⚠️ User upsert warning (${u.email}):`, error.message);
  }
  console.log("✅ Users seeded cleanly.");

  const beekeeperId = usersToSeed[0].id;

  // 2. Define Demo Hives
  const hivesToSeed = [
    { id: "11111111-1111-4000-a000-111111111111", owner_id: beekeeperId, location_lat: 12.5234, location_lng: 75.8123, current_health_category: "healthy" },
    { id: "22222222-2222-4000-a000-222222222222", owner_id: beekeeperId, location_lat: 12.5289, location_lng: 75.8178, current_health_category: "healthy" },
    { id: "33333333-3333-4000-a000-333333333333", owner_id: beekeeperId, location_lat: 12.5310, location_lng: 75.8201, current_health_category: "needs_attention" },
    { id: "44444444-4444-4000-a000-444444444444", owner_id: beekeeperId, location_lat: 12.5190, location_lng: 75.8055, current_health_category: "healthy" },
  ];

  for (const h of hivesToSeed) {
    const { error } = await supabaseAdmin.from("hives").upsert(h, { onConflict: "id" });
    if (error) console.warn(`⚠️ Hive upsert warning (${h.id}):`, error.message);
  }
  console.log("✅ 4 Hives seeded cleanly.");

  // 3. Seed Historical Readings for Hives
  const readingsToInsert = [];
  const now = Date.now();
  for (const h of hivesToSeed) {
    for (let day = 14; day >= 0; day--) {
      const ts = new Date(now - day * 24 * 60 * 60 * 1000).toISOString();
      const temp = Number((34.0 + (Math.random() * 1.5 - 0.75)).toFixed(1));
      const hum = Number((54.0 + (Math.random() * 4 - 2)).toFixed(1));
      const weight = Number((42.0 - day * 0.15 + Math.random() * 0.2).toFixed(1));
      const activity = Math.floor(75 + Math.random() * 20);

      readingsToInsert.push({
        hive_id: h.id,
        timestamp: ts,
        temperature: temp,
        humidity: hum,
        weight: weight,
        activity_level: activity,
        notes: `Daily telemetric sensor check ${day} days ago`,
      });
    }
  }

  const { error: rErr } = await supabaseAdmin.from("readings").insert(readingsToInsert);
  if (rErr) console.warn("⚠️ Readings insertion warning:", rErr.message);
  console.log(`✅ ${readingsToInsert.length} Sensor Readings seeded.`);

  // 4. Walk a Full Batch Lifecycle through all stages
  const demoBatchId = "b0000000-0000-4000-a000-000000000101";

  // Cleanup existing batch & related rows if already present
  await supabaseAdmin.from("batches").delete().eq("id", demoBatchId);

  // Stage 1: Create Batch (draft)
  const { data: batchDraft, error: bErr } = await supabaseAdmin
    .from("batches")
    .insert({
      id: demoBatchId,
      source_hive_ids: [hivesToSeed[0].id, hivesToSeed[1].id],
      harvest_start_date: new Date(now - 14 * 86400000).toISOString(),
      harvest_end_date: new Date(now - 12 * 86400000).toISOString(),
      forage_location: "Wildflower & Clover Apiary Meadow, Coorg Valley",
      status: "draft",
      created_by: beekeeperId,
    })
    .select()
    .single();

  if (bErr) throw bErr;
  console.log(`📌 Stage 1 [draft]: Batch created -> ${batchDraft.id}`);

  // Stage 2: Seal Batch (sealed)
  const qrRes = await qrService.generateAndStoreBatchQr(demoBatchId);
  const chain1 = await blockchainService.recordCustodyStage(demoBatchId, "beekeeper", beekeeperId, {
    sealed_at: new Date(now - 12 * 86400000).toISOString(),
    qr_code_id: qrRes.qrCodeId,
  });

  await supabaseAdmin.from("custody_records").insert({
    batch_id: demoBatchId,
    stage: "beekeeper",
    actor_user_id: beekeeperId,
    timestamp: new Date(now - 12 * 86400000).toISOString(),
    data_hash: chain1.dataHash,
    storage_reference: chain1.txHash,
    extra_data: { sealed_at: new Date(now - 12 * 86400000).toISOString(), notes: "Harvested and sealed at source apiary" },
  });

  await supabaseAdmin
    .from("batches")
    .update({
      status: "sealed",
      blockchain_record_id: `0x${demoBatchId.replace(/-/g, "").substring(0, 16)}`,
      qr_code_id: qrRes.qrCodeId,
    })
    .eq("id", demoBatchId);

  console.log("📌 Stage 2 [sealed]: Batch sealed & initial custody recorded on-chain.");

  // Stage 3: Lab Purity Testing (lab)
  const labUserId = usersToSeed[1].id;
  const labData = {
    results_summary: "Purity 99.8% - NMR Verified Pure Blossom Honey. Zero adulterants detected.",
    certificate_url: "https://honeytrace.io/certificates/lab-cert-101.pdf",
  };

  const chain2 = await blockchainService.recordCustodyStage(demoBatchId, "lab", labUserId, labData);

  await supabaseAdmin.from("lab_tests").insert({
    batch_id: demoBatchId,
    results_summary: labData.results_summary,
    certificate_storage_reference: labData.certificate_url,
    created_at: new Date(now - 9 * 86400000).toISOString(),
  });

  await supabaseAdmin.from("custody_records").insert({
    batch_id: demoBatchId,
    stage: "lab",
    actor_user_id: labUserId,
    timestamp: new Date(now - 9 * 86400000).toISOString(),
    data_hash: chain2.dataHash,
    storage_reference: chain2.txHash,
    extra_data: labData,
  });

  await supabaseAdmin.from("batches").update({ status: "bottler" }).eq("id", demoBatchId);
  console.log("📌 Stage 3 [lab]: Lab test recorded & status advanced to 'bottler'.");

  // Stage 4: Bottling (bottler)
  const bottlerUserId = usersToSeed[2].id;
  const bottlerData = { jar_count: 1200, notes: "Packaged in eco-friendly 500g glass jars with seal." };
  const chain3 = await blockchainService.recordCustodyStage(demoBatchId, "bottler", bottlerUserId, bottlerData);

  await supabaseAdmin.from("custody_records").insert({
    batch_id: demoBatchId,
    stage: "bottler",
    actor_user_id: bottlerUserId,
    timestamp: new Date(now - 6 * 86400000).toISOString(),
    data_hash: chain3.dataHash,
    storage_reference: chain3.txHash,
    extra_data: bottlerData,
  });

  await supabaseAdmin.from("batches").update({ status: "distributor" }).eq("id", demoBatchId);
  console.log("📌 Stage 4 [bottler]: 1,200 Jars bottled & status advanced to 'distributor'.");

  // Stage 5: Logistics & Distribution (distributor)
  const distUserId = usersToSeed[3].id;
  const distData = {
    transport_details: "Refrigerated Express Transit #TX-902",
    current_location: "Metro Distribution Center",
    temperature_log: "18.5°C constant climate controlled",
  };
  const chain4 = await blockchainService.recordCustodyStage(demoBatchId, "distributor", distUserId, distData);

  await supabaseAdmin.from("custody_records").insert({
    batch_id: demoBatchId,
    stage: "distributor",
    actor_user_id: distUserId,
    timestamp: new Date(now - 3 * 86400000).toISOString(),
    data_hash: chain4.dataHash,
    storage_reference: chain4.txHash,
    extra_data: distData,
  });

  await supabaseAdmin.from("batches").update({ status: "shelf" }).eq("id", demoBatchId);
  console.log("📌 Stage 5 [distributor]: Transit completed & status advanced to 'shelf'.");

  // Stage 6: Retailer & Final Delivery (shelf -> delivered)
  const retailerUserId = usersToSeed[4].id;
  const retailData = {
    store_name: "GreenField Organic Market",
    store_location: "742 Evergreen Terrace, Sector 4",
  };
  const chain5 = await blockchainService.recordCustodyStage(demoBatchId, "shelf", retailerUserId, retailData);

  await supabaseAdmin.from("custody_records").insert({
    batch_id: demoBatchId,
    stage: "shelf",
    actor_user_id: retailerUserId,
    timestamp: new Date(now - 1 * 86400000).toISOString(),
    data_hash: chain5.dataHash,
    storage_reference: chain5.txHash,
    extra_data: retailData,
  });

  await supabaseAdmin.from("batches").update({ status: "delivered" }).eq("id", demoBatchId);
  console.log("📌 Stage 6 [shelf/delivered]: Stocked at GreenField Market & marked 'delivered'.");

  // 5. Seed Consumer Feedback
  await supabaseAdmin.from("feedback").insert({
    batch_id: demoBatchId,
    rating: 5,
    tasting_notes: "Rich floral aroma with distinct wild thyme undertones. Incredible purity!",
    submitter_name: "Sophia Chen",
  });

  console.log("\n🎉 HoneyTrace Demo Data Seeding Complete!");
  console.log(`🔗 Demo Batch Verification ID: ${demoBatchId}`);
  console.log(`📱 QR Code ID: ${qrRes.qrCodeId}`);
}

seedDemoData().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
