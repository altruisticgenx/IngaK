-- Create a cache table for AI-generated article summaries
CREATE TABLE IF NOT EXISTS public.article_summaries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  bullets TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  model TEXT NOT NULL DEFAULT 'google/gemini-2.5-flash',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (deny-by-default)
ALTER TABLE public.article_summaries ENABLE ROW LEVEL SECURITY;

-- Public read-only access (blog summaries are public content)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'article_summaries'
      AND policyname = 'Public can read article summaries'
  ) THEN
    CREATE POLICY "Public can read article summaries"
    ON public.article_summaries
    FOR SELECT
    USING (true);
  END IF;
END $$;

-- updated_at maintenance
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_article_summaries_updated_at ON public.article_summaries;
CREATE TRIGGER set_article_summaries_updated_at
BEFORE UPDATE ON public.article_summaries
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Performance index (unique constraint already exists, but explicit index is fine)
CREATE INDEX IF NOT EXISTS idx_article_summaries_article_id
ON public.article_summaries (article_id);
