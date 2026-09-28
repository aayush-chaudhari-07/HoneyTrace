import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

/**
 * Deployment Script for HoneyCustody Smart Contract to Local Hardhat node or Polygon Amoy / Sepolia.
 */
async function main() {
  const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8545";
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  console.log("🐝 Deploying HoneyCustody smart contract...");
  console.log(`🔗 Target RPC: ${rpcUrl}`);

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`👤 Deployer Address: ${wallet.address}`);
  try {
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Deployer Balance: ${ethers.formatEther(balance)} ETH/MATIC`);
  } catch (e) {
    console.warn("⚠️ Could not query account balance from RPC, proceeding with deployment...", e.message);
  }

  // ABI and Bytecode for HoneyCustody
  const artifactPath = path.resolve(__dirname, "../artifacts/contracts/HoneyCustody.sol/HoneyCustody.json");
  if (!fs.existsSync(artifactPath)) {
    console.error("❌ Artifact not found at:", artifactPath);
    console.log("Run 'npx hardhat compile' inside /backend first.");
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const deployedAddress = await contract.getAddress();
  console.log(`✅ HoneyCustody contract successfully deployed to: ${deployedAddress}`);

  // Automatically update .env file with new CONTRACT_ADDRESS
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, "utf8");
    if (envContent.includes("CONTRACT_ADDRESS=")) {
      envContent = envContent.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${deployedAddress}`);
    } else {
      envContent += `\nCONTRACT_ADDRESS=${deployedAddress}\n`;
    }
    fs.writeFileSync(envPath, envContent, "utf8");
    console.log(`📝 Updated .env with CONTRACT_ADDRESS=${deployedAddress}`);
  }
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err.message);
  process.exit(1);
});
