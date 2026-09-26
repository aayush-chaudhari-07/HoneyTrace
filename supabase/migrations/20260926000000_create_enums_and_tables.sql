-- HoneyTrace Database Schema: Enums and Tables

-- 1. Create Enums
CREATE TYPE user_role AS ENUM (
  'beekeeper',
  'lab',
  'bottler',
  'distributor',
  'retailer',
  'admin'
);

CREATE TYPE health_category AS ENUM (
  'healthy',
  'needs_attention',
  'critical'
);

CREATE TYPE batch_status AS ENUM (
  'draft',
  'sealed',
  'lab',
  'bottler',
  'distributor',
  'shelf',
  'delivered'
);

CREATE TYPE custody_stage AS ENUM (
  'beekeeper',
  'lab',
  'bottler',
  'distributor',
  'shelf'
);

CREATE TYPE ai_insight_type AS ENUM (
  'harvest_recommendation',
  'anomaly'
);

-- 2. Create Users Table (links with Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'beekeeper',
  email TEXT NOT NULL UNIQUE,
  contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Hives Table
CREATE TABLE public.hives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  location_lat NUMERIC,
  location_lng NUMERIC,
  current_health_category health_category NOT NULL DEFAULT 'healthy',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Create Readings Table
CREATE TABLE public.readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hive_id UUID NOT NULL REFERENCES public.hives(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  temperature NUMERIC,
  humidity NUMERIC,
  weight NUMERIC,
  activity_level NUMERIC,
  notes TEXT
);

-- 5. Create Batches Table
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_hive_ids UUID[] NOT NULL DEFAULT '{}'::UUID[],
  harvest_start_date TIMESTAMPTZ,
  harvest_end_date TIMESTAMPTZ,
  forage_location TEXT,
  status batch_status NOT NULL DEFAULT 'draft',
  blockchain_record_id TEXT,
  qr_code_id TEXT,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Create Custody Records Table
CREATE TABLE public.custody_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  stage custody_stage NOT NULL,
  actor_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data_hash TEXT NOT NULL,
  storage_reference TEXT,
  extra_data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 7. Create Lab Tests Table
CREATE TABLE public.lab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  results_summary TEXT NOT NULL,
  certificate_storage_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Create Feedback Table
CREATE TABLE public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  tasting_notes TEXT,
  submitter_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Create AI Insights Table
CREATE TABLE public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hive_id UUID REFERENCES public.hives(id) ON DELETE CASCADE,
  batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
  type ai_insight_type NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Indexes for performance
CREATE INDEX idx_hives_owner_id ON public.hives(owner_id);
CREATE INDEX idx_readings_hive_id ON public.readings(hive_id);
CREATE INDEX idx_readings_timestamp ON public.readings(timestamp);
CREATE INDEX idx_batches_created_by ON public.batches(created_by);
CREATE INDEX idx_batches_status ON public.batches(status);
CREATE INDEX idx_custody_records_batch_id ON public.custody_records(batch_id);
CREATE INDEX idx_lab_tests_batch_id ON public.lab_tests(batch_id);
CREATE INDEX idx_feedback_batch_id ON public.feedback(batch_id);
CREATE INDEX idx_ai_insights_hive_id ON public.ai_insights(hive_id);
CREATE INDEX idx_ai_insights_batch_id ON public.ai_insights(batch_id);
