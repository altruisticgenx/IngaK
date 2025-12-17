import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, maxRequests = 50, windowMs = 3600000): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (limit.count >= maxRequests) {
    return false;
  }

  limit.count++;
  return true;
}

async function verifyAuth(req: Request): Promise<{ valid: boolean; userId?: string; error?: string }> {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    return { valid: false, error: "Missing or invalid authorization header" };
  }

  const token = authHeader.slice(7);
  
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return { valid: false, error: "Server configuration error" };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      console.error("Auth verification failed:", error?.message);
      return { valid: false, error: "Invalid or expired token" };
    }

    return { valid: true, userId: data.user.id };
  } catch (e) {
    console.error("Auth verification error:", e);
    return { valid: false, error: "Authentication failed" };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authResult = await verifyAuth(req);
    if (!authResult.valid || !authResult.userId) {
      console.warn("Unauthorized chat request:", authResult.error);
      return new Response(JSON.stringify({ error: authResult.error ?? "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check rate limit
    if (!checkRateLimit(authResult.userId)) {
      console.warn("Rate limit exceeded for user:", authResult.userId);
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Maximum 50 requests per hour." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => null);
    const messages = (body?.messages ?? []) as unknown;

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid payload: messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate and sanitize messages with length limits
    const safeMessages: ClientMessage[] = messages
      .filter((m): m is ClientMessage => {
        if (!m || typeof m !== "object") return false;
        const role = (m as { role?: unknown }).role;
        const content = (m as { content?: unknown }).content;
        return (
          (role === "user" || role === "assistant") &&
          typeof content === "string" &&
          content.length > 0 &&
          content.length <= 10000
        );
      })
      .slice(-30);

    if (safeMessages.length === 0) {
      return new Response(JSON.stringify({ error: "No valid messages provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt =
      "You are a helpful AI assistant. Be concise, accurate, and avoid requesting sensitive personal data.";

    console.log("Processing chat request for user:", authResult.userId, "messages:", safeMessages.length);

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        stream: true,
        messages: [{ role: "system", content: systemPrompt }, ...safeMessages],
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

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("chat error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
