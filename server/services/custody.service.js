import { supabaseAdmin } from "../config/supabase.js";
import { blockchainService } from "./blockchain.service.js";

export const custodyService = {
  async getCustodyForBatch(batchId) {
    const { data: dbRecords, error } = await supabaseAdmin
      .from("custody_records")
      .select("*, users:actor_user_id(name, role)")
      .eq("batch_id", batchId)
      .order("timestamp", { ascending: true });

    if (error) throw error;

    // Fetch on-chain history and cross-check
    const onChainRecords = await blockchainService.getCustodyHistoryOnChain(batchId);
    const crossCheck = blockchainService.crossCheckCustody(dbRecords || [], onChainRecords);

    return {
      custody_records: dbRecords || [],
      on_chain_records: onChainRecords,
      cross_check: crossCheck,
    };
  },

  async addCustodyRecord(recordData) {
    // 1. Hash and record stage on blockchain contract / ledger
    const chainResult = await blockchainService.recordCustodyStage(
      recordData.batch_id,
      recordData.stage,
      recordData.actor_user_id,
      recordData.extra_data || {}
    );

    // 2. Insert into Supabase custody_records table with data_hash & storage_reference
    const payload = {
      batch_id: recordData.batch_id,
      stage: recordData.stage,
      actor_user_id: recordData.actor_user_id,
      timestamp: recordData.timestamp || new Date().toISOString(),
      data_hash: chainResult.dataHash,
      storage_reference: chainResult.txHash || recordData.storage_reference || null,
      extra_data: recordData.extra_data || {},
    };

    const { data, error } = await supabaseAdmin
      .from("custody_records")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      blockchain_tx_hash: chainResult.txHash,
      on_chain_record_id: chainResult.onChainRecordId,
    };
  },
};
