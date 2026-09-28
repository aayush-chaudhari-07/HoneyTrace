# 🐝 HoneyTrace — Hive-to-Jar Traceability Platform

HoneyTrace is an end-to-end honey traceability and smart beekeeping platform that tracks honey from hive to jar to home using blockchain verification, IoT hive monitoring, and AI insights.

---

## 📁 Repository Structure

```
/honeytrace
  ├── /frontend      # React + Vite + Tailwind CSS app
  ├── /backend       # Node.js + Express API server (with Hardhat & Smart Contracts)
  ├── /api           # Vercel Serverless Function Entrypoint
  ├── /contracts     # Solidity Smart Contracts (HoneyCustody.sol)
  ├── .env           # Single root environment configuration file
  ├── vercel.json    # Vercel build & route rewrites config
  └── README.md      # Platform documentation & setup guide
```

---

## 🛠️ Prerequisites

- **Node.js**: `v20.0.0` or higher
- **npm**: `v9.0.0` or higher

Check versions:
```bash
node -v
npm -v
```

---

## 🚀 Quick Local Setup (Single Command)

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Seed Demo Accounts & Data
Run the idempotent seed script to populate all 6 demo role accounts, hives, sensor readings, and batches:
```bash
npm run seed
```

### 3. Start Everything (Single Command)
Run ONE command to start local Hardhat node, Express backend server, and Vite frontend app concurrently:
```bash
npm run dev
```

- **Frontend URL**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Hardhat RPC**: `http://127.0.0.1:8545`

---

## 🔄 Individual Fallback Commands

If you prefer running services in separate terminal windows:

1. **Start Hardhat Node**:
   ```bash
   npm run dev:hardhat
   ```
2. **Deploy Smart Contract to Local Node**:
   ```bash
   npm run deploy:local
   ```
3. **Start Backend Server**:
   ```bash
   npm run dev:backend
   ```
4. **Start Frontend App**:
   ```bash
   npm run dev:frontend
   ```
5. **Run Backend Test Suite (50 Automated Tests)**:
   ```bash
   npm run test:backend
   ```

---

## 🔑 Demo Account Credentials

All accounts are pre-configured with the default demo password: **`Password123!`**

| Role | Email | Password | Landing Workspace Page |
|---|---|---|---|
| **Beekeeper** | `beekeeper@honeytrace.io` | `Password123!` | `/dashboard` |
| **Lab Analyst** | `lab@honeytrace.io` | `Password123!` | `/partner` |
| **Bottler** | `bottler@honeytrace.io` | `Password123!` | `/partner` |
| **Distributor** | `distributor@honeytrace.io` | `Password123!` | `/partner` |
| **Retailer** | `retailer@honeytrace.io` | `Password123!` | `/partner` |
| **Admin** | `admin@honeytrace.io` | `Password123!` | `/admin` |

---

## 🎬 5-Minute Click-by-Click Demo Script (`DEMO_SCRIPT`)

1. **Beekeeper Flow (Harvest & Batch Creation)**:
   - Navigate to `http://localhost:5173/login` and sign in as `beekeeper@honeytrace.io`.
   - View hive hexagon map on `/dashboard`. Select a hive to view sensor charts & AI harvest recommendation.
   - Go to `/batches`, click **Create New Batch**, select source hives, and save draft.
   - Click **Seal Batch**. The app generates an immutable QR code and records the `beekeeper` custody stage on-chain.

2. **Supply Chain Partner Progression (Chain of Custody)**:
   - **Lab Stage**: Log in as `lab@honeytrace.io`. Open `/partner`, locate the pending sealed batch, input NMR purity test summary (e.g. `99.8% Pure Blossom Honey`), and click **Record Lab Test**.
   - **Bottling Stage**: Log in as `bottler@honeytrace.io`. Open `/partner`, locate batch at lab stage, input jar count (`1,200 jars`), and submit.
   - **Distributor Stage**: Log in as `distributor@honeytrace.io`. Open `/partner`, input cold-chain transit details, and advance status to `shelf`.
   - **Retailer Stage**: Log in as `retailer@honeytrace.io`. Open `/partner`, input store details, and mark as `delivered`.

3. **Public Consumer Verification**:
   - Open `http://localhost:5173/verify/b0000000-0000-4000-a000-000000000101` (or scan QR code).
   - View origin apiary details, full supply chain custody timeline, cryptographic data hashes, lab certificates, and calculated **Trust Score** (100/100).
   - Leave consumer rating & tasting notes in the live feedback form.

---

## 🚀 Deploying to Vercel (`DEPLOY`)

HoneyTrace is structured for single-project deployment on Vercel (Vite Static Frontend + Express Serverless API Handler).

### Step-by-Step Vercel Deployment:

1. **Push to GitHub**:
   Ensure all codebase updates are committed to your GitHub repository.

2. **Import Project in Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new) -> **Import Repository**.
   - Select `honey-trace-main` (or your repository name).
   - Keep Framework Preset as **Vite** or **Other**.
   - Set Root Directory as `./`.

3. **Configure Vercel Environment Variables**:
   In Vercel **Project Settings -> Environment Variables**, add the following:

#### Frontend Environment Variables (Public)
| Variable | Value | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://<your-project>.supabase.co` | Supabase Project API URL |
| `VITE_SUPABASE_ANON_KEY` | `<your-anon-jwt>` | Supabase Anonymous Client Key |
| `VITE_BACKEND_URL` | `/api` | Relative API path for Vercel Serverless |

#### Secret Backend Environment Variables (Private - Never exposed to client)
| Variable | Value | Description |
|---|---|---|
| `PORT` | `5000` | Backend Port (internal fallback) |
| `NODE_ENV` | `production` | Production environment flag |
| `FRONTEND_URL` | `https://<your-vercel-domain>.vercel.app` | Production domain for CORS |
| `PUBLIC_SITE_URL` | `https://<your-vercel-domain>.vercel.app` | Base URL for generated QR verification links |
| `SUPABASE_URL` | `https://<your-project>.supabase.co` | Supabase Project API URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `<your-service-role-key>` | Supabase Service Role Secret Key |
| `RPC_URL` | `https://rpc-amoy.polygon.technology` | Polygon Amoy RPC Endpoint |
| `DEPLOYER_PRIVATE_KEY` | `<your-wallet-private-key>` | EVM Wallet Private Key for smart contract txs |
| `CONTRACT_ADDRESS` | `0x...` | Deployed HoneyCustody contract address on Amoy |
| `WEATHER_API_KEY` | `<your-openweather-key>` | (Optional) OpenWeatherMap API Key |
| `MAPS_API_KEY` | `<your-mapbox-key>` | (Optional) Mapbox API Key |

4. **Deploy**:
   Click **Deploy**. Vercel will build the frontend into `frontend/dist` and serve `/api/*` requests via `api/index.js`.

---

## 📋 Post-Deploy Checklist

- [ ] **Supabase Site URL & Redirect URLs**:
  In Supabase Dashboard -> **Authentication** -> **URL Configuration**:
  - Set **Site URL** to `https://<your-vercel-domain>.vercel.app`
  - Add `https://<your-vercel-domain>.vercel.app/**` to **Redirect URLs**.
- [ ] **Supabase Auth Email Confirmation**:
  If you want instant login on signup without email verification, disable **Confirm email** under **Authentication -> Providers -> Email** in your Supabase Dashboard.
- [ ] **Database SQL Migrations**:
  Run the SQL files located in `backend/supabase/migrations/` inside the Supabase Dashboard **SQL Editor**:
  1. `20260926000000_create_enums_and_tables.sql`
  2. `20260926000001_enable_rls_and_policies.sql`
  3. `20260926000002_create_storage_bucket.sql`
  4. `20260926000003_auth_users_trigger.sql`
- [ ] **Deploy Smart Contract to Polygon Amoy Testnet**:
  To deploy the smart contract on-chain:
  ```bash
  RPC_URL=https://rpc-amoy.polygon.technology DEPLOYER_PRIVATE_KEY=<your-key> npm run deploy:amoy
  ```
  Copy the generated contract address into Vercel environment variable `CONTRACT_ADDRESS`.

---

## 🛡️ Security Check & Auditing

- `.env` is listed in `.gitignore` and is not committed in repository history.
- Secret backend keys (`SUPABASE_SERVICE_ROLE_KEY`, `DEPLOYER_PRIVATE_KEY`) are never imported or accessed in client-side code (`/frontend`).
- CORS origin restricts production backend API access strictly to `FRONTEND_URL`.