ALTER TABLE public.trail_steps
  ADD COLUMN IF NOT EXISTS document_url text,
  ADD COLUMN IF NOT EXISTS document_label text,
  ADD COLUMN IF NOT EXISTS prev_hash text,
  ADD COLUMN IF NOT EXISTS block_hash text;

CREATE OR REPLACE FUNCTION public.ht_step_hash(_prev text, _batch text, _pos int, _stage text, _place text, _date date, _note text)
RETURNS text LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT encode(sha256(convert_to(concat_ws('|', coalesce(_prev,'GENESIS'), _batch, _pos::text, _stage, coalesce(_place,''), _date::text, coalesce(_note,'')), 'UTF8')), 'hex')
$$;

CREATE OR REPLACE FUNCTION public.chain_trail_step()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  SELECT block_hash INTO NEW.prev_hash FROM public.trail_steps
    WHERE batch_id = NEW.batch_id AND position < NEW.position AND id <> NEW.id
    ORDER BY position DESC LIMIT 1;
  NEW.block_hash := public.ht_step_hash(NEW.prev_hash, NEW.batch_id, NEW.position, NEW.stage, NEW.place, NEW.step_date, NEW.note);
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trail_steps_chain ON public.trail_steps;
CREATE TRIGGER trail_steps_chain BEFORE INSERT ON public.trail_steps FOR EACH ROW EXECUTE FUNCTION public.chain_trail_step();

DO $$
DECLARE r record; prev text; cur_batch text := NULL;
BEGIN
  FOR r IN SELECT * FROM public.trail_steps ORDER BY batch_id, position LOOP
    IF cur_batch IS DISTINCT FROM r.batch_id THEN prev := NULL; cur_batch := r.batch_id; END IF;
    UPDATE public.trail_steps SET prev_hash = prev,
      block_hash = public.ht_step_hash(prev, r.batch_id, r.position, r.stage, r.place, r.step_date, r.note)
      WHERE id = r.id RETURNING block_hash INTO prev;
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.public_batch_hives(_batch_id text)
RETURNS TABLE(name text, location text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT h.name, h.location FROM public.batch_hives bh JOIN public.hives h ON h.id = bh.hive_id WHERE bh.batch_id = _batch_id
$$;
REVOKE EXECUTE ON FUNCTION public.public_batch_hives(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.public_batch_hives(text) TO anon, authenticated;

CREATE TABLE IF NOT EXISTS public.tasting_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id text NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  name text CHECK (name IS NULL OR char_length(name) <= 60),
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  note text NOT NULL CHECK (char_length(note) BETWEEN 3 AND 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS tasting_notes_batch_idx ON public.tasting_notes(batch_id, created_at DESC);
GRANT SELECT, INSERT ON public.tasting_notes TO anon, authenticated;
GRANT ALL ON public.tasting_notes TO service_role;
ALTER TABLE public.tasting_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads tasting notes" ON public.tasting_notes;
CREATE POLICY "Anyone reads tasting notes" ON public.tasting_notes FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Anyone adds tasting notes" ON public.tasting_notes;
CREATE POLICY "Anyone adds tasting notes" ON public.tasting_notes FOR INSERT TO anon, authenticated WITH CHECK (true);