-- Create feature_flags table for runtime feature flag management
CREATE TABLE public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  enabled BOOLEAN NOT NULL DEFAULT false,
  rollout_percentage INTEGER DEFAULT 100 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  user_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

-- Anyone can read feature flags (needed for client-side checks)
CREATE POLICY "Anyone can read feature flags" ON public.feature_flags
  FOR SELECT TO authenticated, anon USING (true);

-- Only service_role can manage flags
CREATE POLICY "Service role can manage flags" ON public.feature_flags
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER set_feature_flags_updated_at
  BEFORE UPDATE ON public.feature_flags
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Insert some default feature flags
INSERT INTO public.feature_flags (name, description, enabled, rollout_percentage) VALUES
  ('new_chat_experience', 'Enable the new AI chat interface', true, 100),
  ('lazy_sections', 'Enable lazy loading for portfolio sections', true, 100),
  ('article_summaries', 'Enable AI article summarization feature', true, 100);