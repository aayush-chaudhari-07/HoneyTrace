ALTER TABLE public.trail_steps ADD COLUMN IF NOT EXISTS details jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.trail_steps ADD COLUMN IF NOT EXISTS actor_role text;

DROP POLICY IF EXISTS "Labs upload certificates" ON storage.objects;
CREATE POLICY "Labs upload certificates" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'lab-certificates' AND public.has_role(auth.uid(), 'lab'::public.app_role) AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "Labs read own certificates" ON storage.objects;
CREATE POLICY "Labs read own certificates" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'lab-certificates' AND (storage.foldername(name))[1] = auth.uid()::text);