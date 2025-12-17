-- Add restrictive RLS policies for article_summaries
-- Only the service role (edge functions) should be able to modify summaries

-- Deny all INSERT for anonymous/authenticated users
CREATE POLICY "Service role only can insert summaries"
ON public.article_summaries
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Deny all UPDATE for anonymous/authenticated users  
CREATE POLICY "Service role only can update summaries"
ON public.article_summaries
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Deny all DELETE for anonymous/authenticated users
CREATE POLICY "Service role only can delete summaries"
ON public.article_summaries
FOR DELETE
TO anon, authenticated
USING (false);