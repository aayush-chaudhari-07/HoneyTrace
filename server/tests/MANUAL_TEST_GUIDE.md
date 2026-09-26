# HoneyTrace Backend Authentication & Authorization Manual Test Guide

This guide provides step-by-step instructions and `curl` commands to manually test and verify the authentication and authorization endpoints and middleware of the HoneyTrace backend.

---

## 1. Prerequisites & Environment Setup

Ensure the server environment variables are configured in `.env`:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
```

Start the Express backend server:

```bash
npm run server
```

The server runs at `http://localhost:5000`.

---

## 2. Test Cases & `curl` Commands

### Test 1: Unauthenticated Request to Protected Route (Expect `401 Unauthorized`)
Try hitting the `/api/users/me` endpoint without providing an `Authorization` header.

**Command:**
```bash
curl -X GET http://localhost:5000/api/users/me
```

**Expected Response (`401 Unauthorized`):**
```json
{
  "error": "Unauthorized: Missing or invalid Authorization header"
}
```

---

### Test 2: Invalid JWT Token Request (Expect `401 Unauthorized`)
Provide an invalid or expired Bearer token in the `Authorization` header.

**Command:**
```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer invalid.jwt.token.value"
```

**Expected Response (`401 Unauthorized`):**
```json
{
  "error": "Unauthorized: Invalid or expired token"
}
```

---

### Test 3: Beekeeper Hitting Lab-Only Route (Expect `403 Forbidden`)
When a user with role `beekeeper` attempts to post a lab test result to `/api/lab`:

**Command:**
```bash
curl -X POST http://localhost:5000/api/lab \
  -H "Authorization: Bearer <BEEKEEPER_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "batch_id": "00000000-0000-0000-0000-000000000000",
    "results_summary": "Pollen moisture 17.5%, HMF 12mg/kg"
  }'
```

**Expected Response (`403 Forbidden`):**
```json
{
  "error": "Forbidden: Action requires one of roles [lab, admin], but current role is 'beekeeper'"
}
```

---

### Test 4: Complete Profile Endpoint (`POST /api/users/complete-profile`)
Called right after frontend signup to create/update the corresponding record in `public.users`.

**Command:**
```bash
curl -X POST http://localhost:5000/api/users/complete-profile \
  -H "Authorization: Bearer <USER_SUPABASE_JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Meera Iyer",
    "role": "beekeeper",
    "contact": "+91 98765 43210"
  }'
```

**Expected Response (`200 OK`):**
```json
{
  "message": "Profile completed successfully",
  "user": {
    "id": "11111111-2222-3333-4444-555555555555",
    "name": "Meera Iyer",
    "role": "beekeeper",
    "email": "meera@apiary.com",
    "contact": "+91 98765 43210",
    "created_at": "2026-09-26T21:00:00.000Z"
  }
}
```

---

### Test 5: Get Current Profile Endpoint (`GET /api/users/me`)
Returns the authenticated user's database profile and role, used by the frontend to route users post-login.

**Command:**
```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer <USER_SUPABASE_JWT>"
```

**Expected Response (`200 OK`):**
```json
{
  "user": {
    "id": "11111111-2222-3333-4444-555555555555",
    "name": "Meera Iyer",
    "role": "beekeeper",
    "email": "meera@apiary.com",
    "contact": "+91 98765 43210",
    "created_at": "2026-09-26T21:00:00.000Z"
  }
}
```

---

### Test 6: Running Automated Integration Tests
To run the automated suite at any time:

```bash
node --test server/tests/auth.test.js
```
