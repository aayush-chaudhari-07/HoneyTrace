# 🐝 HoneyTrace — Hive-to-Jar Traceability Platform

HoneyTrace is an end-to-end honey traceability and smart beekeeping platform that tracks honey from hive to jar to home using blockchain verification, IoT hive monitoring, and AI insights.

---

## 📁 Repository Structure

```
/honeytrace
  ├── /frontend      # Self-contained React + Vite + Tailwind CSS app
  ├── /backend       # Node.js + Express API server
  ├── .env           # Single root environment configuration file
  └── README.md      # Setup documentation
```

---

## 🛠️ Prerequisites

Make sure the following tools are installed on your machine:
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher (comes with Node.js)

Verify your installation:
```bash
node -v
npm -v
```

---

## 🚀 Quick Setup Instructions

### 1. Install Dependencies

You can install dependencies for both services from the root directory or inside each folder:

#### Option A: From Root (Recommended)
```bash
npm run install:all
```

#### Option B: Per Directory
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

---

### 2. Environment Configuration

The repository uses **EXACTLY ONE `.env` file**, located in the main project root folder (`/.env`). Both the frontend (via Vite `envDir`) and backend (via `dotenv`) read from this single root file.

Create a file named `.env` in the root folder with the following inline structure:

```env
# ==============================================================================
# HoneyTrace Single Root Environment Configuration (.env)
# ==============================================================================

# Frontend Variables (Vite client-side)
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key
VITE_BACKEND_URL=http://localhost:5000

# Backend Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Supabase Backend Service Credentials
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
SUPABASE_ANON_KEY=your-supabase-publishable-key

# Blockchain Configuration (EVM RPC & Smart Contract)
RPC_URL=http://127.0.0.1:8545
DEPLOYER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

# Third-Party Integration API Keys
WEATHER_API_KEY=your-weather-api-key
MAPS_API_KEY=your-maps-api-key

# AI Configuration (Optional)
AI_API_KEY=your-ai-api-key
AI_API_ENDPOINT=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o-mini

# Database Migration Connection URL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/honeytrace
```

---

### 3. Running the Applications Locally

#### Running the Backend (Port 5000)
Open a terminal window and run:
```bash
cd backend
npm run dev
```
- **Backend API URL**: `http://localhost:5000`
- **Health Check Endpoint**: `http://localhost:5000/health`

#### Running the Frontend (Port 5173)
Open a second terminal window and run:
```bash
cd frontend
npm run dev
```
- **Frontend Local URL**: `http://localhost:5173`

---

## 🧪 Testing Backend Services

To run the automated backend test suite (covering health, users, hives, batches, custody, lab reports, AI engine, and blockchain trust score calculation):

```bash
cd backend
npm test
```

---

## 🌐 Connecting Local Frontend & Backend

- The backend allows requests from `FRONTEND_URL` (`http://localhost:5173`) via CORS.
- The frontend points to `VITE_BACKEND_URL` (`http://localhost:5000`) for API calls.

---

## 📋 Features Overview

- **Beekeeper Dashboard**: Track hive metrics, sensor readings, and harvest readiness.
- **Consumer Verification**: Verify jar authenticity and view complete supply chain trail via QR code (`/verify/:batchId`).
- **Chain of Custody**: Record honey movement through harvest, lab analysis, bottling, and retail.
- **AI Anomaly Detection**: Smart analysis of hive temperatures, humidity, and activity.