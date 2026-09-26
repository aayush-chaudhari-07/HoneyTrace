-- HoneyTrace Storage: Create "batch-documents" Bucket and Storage Policies

-- 1. Create batch-documents storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'batch-documents',
  'batch-documents',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Policies for batch-documents bucket

-- Public read access to all files in batch-documents
CREATE POLICY "Public read access for batch-documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'batch-documents');

-- Authenticated-only insert access
CREATE POLICY "Authenticated insert access for batch-documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'batch-documents' AND auth.role() = 'authenticated'
  );

-- Authenticated-only update access
CREATE POLICY "Authenticated update access for batch-documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'batch-documents' AND auth.role() = 'authenticated'
  );

-- Authenticated-only delete access
CREATE POLICY "Authenticated delete access for batch-documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'batch-documents' AND auth.role() = 'authenticated'
  );
