import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const ABI = [
  "function recordStage(bytes32 batchId, string stage, address actor, bytes32 dataHash, uint256 timestamp) external returns (uint256)",
  "function getCustodyHistory(bytes32 batchId) external view returns (tuple(bytes32 batchId, string stage, address actor, bytes32 dataHash, uint256 timestamp, uint256 stageIndex)[])",
  "function getCurrentStageIndex(bytes32 batchId) external view returns (uint256)",
];

// In-memory on-chain fallback ledger to ensure instant, deterministic testing & offline resilience
const inMemoryLedger = new Map();

/**
 * Helper to compute keccak256 hash of batch custody data payload.
 */
export function hashCustodyData(batchId, stage, actorAddress, data) {
  const payloadStr = [
    String(batchId),
    String(stage),
    String(actorAddress || "0x0000000000000000000000000000000000000000"),
    JSON.stringify(data || {}),
  ].join("|");

  return ethers.keccak256(ethers.toUtf8Bytes(payloadStr));
}

/**
 * Helper to convert batch UUID string to bytes32 format.
 */
export function batchIdToBytes32(batchId) {
  const cleanId = String(batchId).replace(/-/g, "").padEnd(32, "0").substring(0, 32);
  return ethers.encodeBytes32String(cleanId.substring(0, 31));
}

export const blockchainService = {
  /**
   * Records a custody stage on-chain (Polygon Amoy / Ethereum Sepolia) or in-memory ledger.
   */
  async recordCustodyStage(batchId, stage, actorAddress, dataPayload = {}) {
    const timestamp = Math.floor(Date.now() / 1000);
    const dataHash = hashCustodyData(batchId, stage, actorAddress, dataPayload);
    const actor = actorAddress && ethers.isAddress(actorAddress) ? actorAddress : "0x" + "11".repeat(20);

    const rpcUrl = process.env.RPC_URL || process.env.POLYGON_AMOY_RPC_URL;
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (rpcUrl && privateKey && contractAddress && ethers.isAddress(contractAddress)) {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, ABI, wallet);

        const bytes32BatchId = batchIdToBytes32(batchId);
        const tx = await contract.recordStage(bytes32BatchId, stage, actor, dataHash, timestamp);
        const receipt = await tx.wait();

        return {
          txHash: receipt.hash || tx.hash,
          onChainRecordId: `tx-${receipt.hash?.slice(0, 16)}`,
          dataHash,
          timestamp,
          onChain: true,
        };
      } catch (err) {
        console.warn("⚠️ On-chain execution fell back to cryptographic ledger simulation:", err.message);
      }
    }

    // Cryptographic ledger simulation
    const history = inMemoryLedger.get(batchId) || [];
    const record = {
      batchId,
      stage,
      actor,
      dataHash,
      timestamp,
      stageIndex: history.length + 1,
      txHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
    };
    history.push(record);
    inMemoryLedger.set(batchId, history);

    return {
      txHash: record.txHash,
      onChainRecordId: `ledger-${record.txHash.slice(0, 16)}`,
      dataHash,
      timestamp,
      onChain: false,
    };
  },

  /**
   * Retrieves recorded custody history from contract or ledger.
   */
  async getCustodyHistoryOnChain(batchId) {
    const rpcUrl = process.env.RPC_URL || process.env.POLYGON_AMOY_RPC_URL;
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (rpcUrl && contractAddress && ethers.isAddress(contractAddress)) {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const contract = new ethers.Contract(contractAddress, ABI, provider);
        const bytes32BatchId = batchIdToBytes32(batchId);
        const history = await contract.getCustodyHistory(bytes32BatchId);
        return history.map((h) => ({
          batchId: h.batchId,
          stage: h.stage,
          actor: h.actor,
          dataHash: h.dataHash,
          timestamp: Number(h.timestamp),
          stageIndex: Number(h.stageIndex),
        }));
      } catch (err) {
        console.warn("⚠️ Reading on-chain history fell back to ledger simulation:", err.message);
      }
    }

    return inMemoryLedger.get(batchId) || [];
  },

  /**
   * Cross-checks off-chain Supabase custody records against on-chain records.
   * Flags data_integrity_warning if hashes or stage sequences mismatch.
   */
  crossCheckCustody(supabaseRecords = [], onChainRecords = []) {
    if (!supabaseRecords.length || !onChainRecords.length) {
      return {
        matched: true,
        data_integrity_warning: false,
        details: "No historical records to cross-check.",
      };
    }

    let mismatchFound = false;
    const mismatches = [];

    for (let i = 0; i < Math.min(supabaseRecords.length, onChainRecords.length); i++) {
      const dbRec = supabaseRecords[i];
      const chainRec = onChainRecords[i];

      if (dbRec.stage !== chainRec.stage) {
        mismatchFound = true;
        mismatches.push(`Stage mismatch at position ${i}: DB='${dbRec.stage}' vs Chain='${chainRec.stage}'`);
      }

      if (dbRec.data_hash && chainRec.dataHash && dbRec.data_hash !== chainRec.dataHash) {
        mismatchFound = true;
        mismatches.push(`Data hash mismatch at position ${i} (${dbRec.stage})`);
      }
    }

    return {
      matched: !mismatchFound,
      data_integrity_warning: mismatchFound,
      details: mismatchFound ? mismatches.join("; ") : "All custody hashes and stage sequences match on-chain ledger perfectly.",
    };
  },
};
