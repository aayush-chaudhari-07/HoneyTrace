-- HoneyTrace Database Schema: RLS Enablement and Security Policies

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION public.get_auth_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Enable RLS on every table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custody_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- USERS POLICIES
-- ============================================================================
-- Users can read their own profile, or public profiles
CREATE POLICY "Users can view profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (id = auth.uid() OR is_admin());

CREATE POLICY "Admin full access on users" ON public.users
  FOR ALL USING (is_admin());

-- ============================================================================
-- HIVES POLICIES
-- ============================================================================
-- Beekeepers can only read/write hives where they are the owner
CREATE POLICY "Beekeepers can view own hives" ON public.hives
  FOR SELECT USING (owner_id = auth.uid() OR is_admin());

CREATE POLICY "Beekeepers can insert own hives" ON public.hives
  FOR INSERT WITH CHECK (owner_id = auth.uid() OR is_admin());

CREATE POLICY "Beekeepers can update own hives" ON public.hives
  FOR UPDATE USING (owner_id = auth.uid() OR is_admin());

CREATE POLICY "Beekeepers can delete own hives" ON public.hives
  FOR DELETE USING (owner_id = auth.uid() OR is_admin());

CREATE POLICY "Admin full access on hives" ON public.hives
  FOR ALL USING (is_admin());

-- ============================================================================
-- READINGS POLICIES
-- ============================================================================
-- Beekeepers can only read/write readings for hives they own
CREATE POLICY "Beekeepers can view readings for own hives" ON public.readings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.hives WHERE id = readings.hive_id AND owner_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "Beekeepers can insert readings for own hives" ON public.readings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.hives WHERE id = readings.hive_id AND owner_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "Beekeepers can update readings for own hives" ON public.readings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.hives WHERE id = readings.hive_id AND owner_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "Beekeepers can delete readings for own hives" ON public.readings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.hives WHERE id = readings.hive_id AND owner_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "Admin full access on readings" ON public.readings
  FOR ALL USING (is_admin());

-- ============================================================================
-- BATCHES POLICIES
-- ============================================================================
-- 1. Beekeepers can manage batches they created
CREATE POLICY "Beekeepers can view own created batches" ON public.batches
  FOR SELECT USING (created_by = auth.uid() OR is_admin());

CREATE POLICY "Beekeepers can insert own batches" ON public.batches
  FOR INSERT WITH CHECK (created_by = auth.uid() OR is_admin());

CREATE POLICY "Beekeepers can update own batches" ON public.batches
  FOR UPDATE USING (created_by = auth.uid() OR is_admin());

CREATE POLICY "Beekeepers can delete own batches" ON public.batches
  FOR DELETE USING (created_by = auth.uid() OR is_admin());

-- 2. Partner roles can view batches relevant to their stage
CREATE POLICY "Partner roles can view non-draft batches" ON public.batches
  FOR SELECT USING (
    status != 'draft' AND get_auth_user_role() IN ('lab', 'bottler', 'distributor', 'retailer')
  );

-- 3. Public (anon) READ access for verified batches (needed by consumer verification)
CREATE POLICY "Public read access for verified batches" ON public.batches
  FOR SELECT USING (status != 'draft');

CREATE POLICY "Admin full access on batches" ON public.batches
  FOR ALL USING (is_admin());

-- ============================================================================
-- CUSTODY RECORDS POLICIES
-- ============================================================================
-- 1. Public (anon) READ access for custody records (needed by consumer verification)
CREATE POLICY "Public read access for custody records" ON public.custody_records
  FOR SELECT USING (true);

-- 2. Beekeepers can insert custody records for their own batches
CREATE POLICY "Beekeepers can insert custody for own batches" ON public.custody_records
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.batches WHERE id = custody_records.batch_id AND created_by = auth.uid())
    OR is_admin()
  );

-- 3. Partner roles can only update/insert custody_records for batches currently at their specific stage
CREATE POLICY "Lab role can insert custody record" ON public.custody_records
  FOR INSERT WITH CHECK (
    stage = 'lab' AND get_auth_user_role() = 'lab' AND
    EXISTS (SELECT 1 FROM public.batches WHERE id = custody_records.batch_id AND status IN ('sealed', 'lab'))
  );

CREATE POLICY "Bottler role can insert custody record" ON public.custody_records
  FOR INSERT WITH CHECK (
    stage = 'bottler' AND get_auth_user_role() = 'bottler' AND
    EXISTS (SELECT 1 FROM public.batches WHERE id = custody_records.batch_id AND status IN ('lab', 'bottler'))
  );

CREATE POLICY "Distributor role can insert custody record" ON public.custody_records
  FOR INSERT WITH CHECK (
    stage = 'distributor' AND get_auth_user_role() = 'distributor' AND
    EXISTS (SELECT 1 FROM public.batches WHERE id = custody_records.batch_id AND status IN ('bottler', 'distributor'))
  );

CREATE POLICY "Retailer role can insert custody record" ON public.custody_records
  FOR INSERT WITH CHECK (
    stage = 'shelf' AND get_auth_user_role() = 'retailer' AND
    EXISTS (SELECT 1 FROM public.batches WHERE id = custody_records.batch_id AND status IN ('distributor', 'shelf'))
  );

CREATE POLICY "Admin full access on custody_records" ON public.custody_records
  FOR ALL USING (is_admin());

-- ============================================================================
-- LAB TESTS POLICIES
-- ============================================================================
-- 1. Public (anon) READ access for lab tests (consumer verification)
CREATE POLICY "Public read access for lab_tests" ON public.lab_tests
  FOR SELECT USING (true);

-- 2. Partner role 'lab' can insert/update lab tests for batches at stage 'lab' or status in ('sealed', 'lab')
CREATE POLICY "Lab role can insert lab tests" ON public.lab_tests
  FOR INSERT WITH CHECK (
    get_auth_user_role() = 'lab' AND
    EXISTS (SELECT 1 FROM public.batches WHERE id = lab_tests.batch_id AND status IN ('sealed', 'lab'))
  );

CREATE POLICY "Lab role can update lab tests" ON public.lab_tests
  FOR UPDATE USING (
    get_auth_user_role() = 'lab' AND
    EXISTS (SELECT 1 FROM public.batches WHERE id = lab_tests.batch_id AND status IN ('sealed', 'lab'))
  );

CREATE POLICY "Admin full access on lab_tests" ON public.lab_tests
  FOR ALL USING (is_admin());

-- ============================================================================
-- FEEDBACK POLICIES
-- ============================================================================
-- 1. Public (anon) READ access for feedback
CREATE POLICY "Public read access for feedback" ON public.feedback
  FOR SELECT USING (true);

-- 2. Public (anon) WRITE access limited to INSERTING new rows only, never editing/deleting
CREATE POLICY "Public insert access for feedback" ON public.feedback
  FOR INSERT WITH CHECK (true);

-- 3. Only Admin can update or delete feedback
CREATE POLICY "Admin full access on feedback" ON public.feedback
  FOR ALL USING (is_admin());

-- ============================================================================
-- AI INSIGHTS POLICIES
-- ============================================================================
-- Beekeepers can view AI insights for their hives/batches
CREATE POLICY "Beekeepers can view AI insights for own hives/batches" ON public.ai_insights
  FOR SELECT USING (
    (hive_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.hives WHERE id = ai_insights.hive_id AND owner_id = auth.uid()))
    OR (batch_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.batches WHERE id = ai_insights.batch_id AND created_by = auth.uid()))
    OR is_admin()
  );

CREATE POLICY "Admin full access on ai_insights" ON public.ai_insights
  FOR ALL USING (is_admin());
