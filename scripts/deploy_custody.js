import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

/**
 * Deployment Script for HoneyCustody Smart Contract to Polygon Amoy or Ethereum Sepolia.
 * Reads RPC_URL and DEPLOYER_PRIVATE_KEY from environment variables (never hardcoded).
 */
async function main() {
  const rpcUrl = process.env.RPC_URL || process.env.POLYGON_AMOY_RPC_URL || process.env.SEPOLIA_RPC_URL;
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (!rpcUrl || !privateKey) {
    console.error("❌ Error: Missing RPC_URL or DEPLOYER_PRIVATE_KEY in environment variables.");
    console.log("Usage: RPC_URL=<url> DEPLOYER_PRIVATE_KEY=<key> node scripts/deploy_custody.js");
    process.exit(1);
  }

  console.log("🐝 Deploying HoneyCustody smart contract to network...");
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`👤 Deployer Address: ${wallet.address}`);
  const balance = await provider.getBalance(wallet.address);
  console.log(`💰 Deployer Balance: ${ethers.formatEther(balance)} ETH/MATIC`);

  // ABI and Bytecode for HoneyCustody
  const artifactPath = path.resolve("artifacts/contracts/HoneyCustody.sol/HoneyCustody.json");
  let abi, bytecode;

  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    abi = artifact.abi;
    bytecode = artifact.bytecode;
  } else {
    console.log("ℹ️ Compiled artifact not found on disk, initializing ContractFactory from standard interface...");
    // Fallback standard ABI definition
    abi = [
      "function recordStage(bytes32 batchId, string stage, address actor, bytes32 dataHash, uint256 timestamp) external returns (uint256)",
      "function getCustodyHistory(bytes32 batchId) external view returns (tuple(bytes32 batchId, string stage, address actor, bytes32 dataHash, uint256 timestamp, uint256 stageIndex)[])",
      "function getCurrentStageIndex(bytes32 batchId) external view returns (uint256)",
    ];
    bytecode = "0x608060405234801561001057600080fd5b50610...placeholder"; // Bytecode placeholder
  }

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const deployedAddress = await contract.getAddress();
  console.log(`✅ HoneyCustody contract successfully deployed to: ${deployedAddress}`);

  console.log("\nCopy this address into your .env file:");
  console.log(`CONTRACT_ADDRESS=${deployedAddress}`);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
