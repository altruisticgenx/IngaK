import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.88.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type SummarizeRequest = {
  articleId: string;
  title: string;
  content: string;
};

type SummaryPayload = {
  summary: string;
  bullets: string[];
  cached: boolean;
};

function extractFirstJsonObject(text: string): { summary?: unknown; bullets?: unknown } | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as { summary?: unknown; bullets?: unknown };
  } catch {
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as Partial<SummarizeRequest>;
    const articleId = typeof payload.articleId === "string" ? payload.articleId.trim() : "";
    const title = typeof payload.title === "string" ? payload.title.trim() : "";
    const content = typeof payload.content === "string" ? payload.content.trim() : "";

    if (!articleId || !title || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields: articleId, title, content" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Backend is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: cached } = await supabase
      .from("article_summaries")
      .select("summary, bullets")
      .eq("article_id", articleId)
      .maybeSingle();

    if (cached?.summary) {
      const cachedBullets = Array.isArray(cached.bullets) ? cached.bullets.filter((b) => typeof b === "string") : [];
      const cachedResponse: SummaryPayload = { summary: cached.summary, bullets: cachedBullets, cached: true };
      return new Response(JSON.stringify(cachedResponse), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt =
      "You summarize blog articles. Return a JSON object with: summary (<= 120 words, plain text) and bullets (array of 3-5 short takeaways). Do not include markdown, code fences, or extra keys.";

    const userPrompt = `Title: ${title}\n\nArticle:\n${content}`;

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!upstream.ok) {
      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (upstream.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits and try again." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const t = await upstream.text().catch(() => "");
      console.error("AI gateway error:", upstream.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = (await upstream.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const text = data.choices?.[0]?.message?.content ?? "";

    const extracted = extractFirstJsonObject(text);
    const rawSummary = typeof extracted?.summary === "string" ? extracted.summary : text;
    const rawBullets = Array.isArray(extracted?.bullets) ? extracted?.bullets : [];

    const summary = rawSummary.trim();
    const bullets = rawBullets
      .filter((b): b is string => typeof b === "string")
      .map((b) => b.trim())
      .filter(Boolean)
      .slice(0, 5);

    if (!summary) {
      return new Response(JSON.stringify({ error: "Failed to generate summary" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase
      .from("article_summaries")
      .upsert(
        {
          article_id: articleId,
          summary,
          bullets,
          model: "google/gemini-2.5-flash",
        },
        { onConflict: "article_id" },
      );

    const responseBody: SummaryPayload = { summary, bullets, cached: false };

    return new Response(JSON.stringify(responseBody), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("summarize error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
