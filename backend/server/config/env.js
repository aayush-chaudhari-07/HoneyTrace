import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load single root .env file (located at workspace root)
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export function verifyEnvironmentVars() {
  const required = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "PORT",
    "FRONTEND_URL",
    "RPC_URL",
    "DEPLOYER_PRIVATE_KEY",
    "CONTRACT_ADDRESS",
  ];

  const optional = ["WEATHER_API_KEY", "MAPS_API_KEY", "AI_API_KEY"];

  const missingRequired = required.filter((key) => !process.env[key]);
  const missingOptional = optional.filter((key) => !process.env[key] || process.env[key].includes("your-"));

  console.log("🔍 [HoneyTrace Startup Check] Environment Variables:");
  if (missingRequired.length > 0) {
    console.error(`❌ MISSING REQUIRED ENV VARS: ${missingRequired.join(", ")}`);
  } else {
    console.log("✅ All required core environment variables present.");
  }

  if (missingOptional.length > 0) {
    console.warn(`⚠️ Missing optional external API keys (will use fallback logic): ${missingOptional.join(", ")}`);
  }
}

export default process.env;

