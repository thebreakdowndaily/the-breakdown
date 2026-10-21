-- Needed by the Pages Function API to store publication decisions.
-- Verify public.stories.id is UUID before applying this migration.
CREATE TABLE IF NOT EXISTS public.pipeline_log (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  story_id UUID NOT NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by TEXT NOT NULL DEFAULT 'system',
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pipeline_log_story_created
  ON public.pipeline_log (story_id, created_at DESC, id DESC);
ALTER TABLE public.pipeline_log ENABLE ROW LEVEL SECURITY;
-- Access is through the Pages Function's server-side service key only.
-- Never expose SUPABASE_SERVICE_KEY to client-side code.
