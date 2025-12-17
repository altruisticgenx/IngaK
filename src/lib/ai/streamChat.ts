import { supabase } from "@/integrations/supabase/client";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type StreamChatArgs = {
  messages: ChatMessage[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  signal?: AbortSignal;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export async function streamChat({ messages, onDelta, onDone, signal }: StreamChatArgs): Promise<void> {
  // Get current session for auth token
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData?.session?.access_token;

  if (!accessToken) {
    throw new HttpError(401, "Please sign in to use the chat feature");
  }

  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!resp.ok || !resp.body) {
    const text = await resp.text().catch(() => "");
    
    // Parse error message from JSON if possible
    let errorMessage = text || `Failed to start stream (${resp.status})`;
    try {
      const errorJson = JSON.parse(text) as { error?: string };
      if (errorJson.error) {
        errorMessage = errorJson.error;
      }
    } catch {
      // Use text as-is
    }
    
    throw new HttpError(resp.status, errorMessage);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();

  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;

    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":")) continue; // keepalive/comments
      if (line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const content = parsed.choices?.[0]?.delta?.content;
        if (typeof content === "string" && content.length > 0) {
          onDelta(content);
        }
      } catch {
        // JSON might be split across chunks; put it back and wait for more
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Final flush (best effort)
  if (textBuffer.trim()) {
    const lines = textBuffer.split("\n");
    for (let rawLine of lines) {
      if (!rawLine) continue;
      if (rawLine.endsWith("\r")) rawLine = rawLine.slice(0, -1);
      if (rawLine.startsWith(":")) continue;
      if (rawLine.trim() === "") continue;
      if (!rawLine.startsWith("data: ")) continue;

      const jsonStr = rawLine.slice(6).trim();
      if (jsonStr === "[DONE]") continue;

      try {
        const parsed = JSON.parse(jsonStr) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const content = parsed.choices?.[0]?.delta?.content;
        if (typeof content === "string" && content.length > 0) {
          onDelta(content);
        }
      } catch {
        // ignore leftovers
      }
    }
  }

  onDone();
}
