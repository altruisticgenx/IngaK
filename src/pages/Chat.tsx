import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { ChatMessage } from "@/lib/ai/streamChat";
import { HttpError, streamChat } from "@/lib/ai/streamChat";
import type { User } from "@supabase/supabase-js";

const Chat = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi — ask me anything. I can help brainstorm, summarize, and explain concepts.",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "AI Chatbot | Perspective";
  }, []);

  // Check authentication
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !isStreaming && !!user, [input, isStreaming, user]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming || !user) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    setInput("");
    setIsStreaming(true);

    abortRef.current = new AbortController();

    let assistantSoFar = "";

    setMessages((prev) => [...prev, userMsg]);

    const upsertAssistant = (delta: string) => {
      assistantSoFar += delta;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsertAssistant,
        onDone: () => {
          setIsStreaming(false);
          abortRef.current = null;
        },
        signal: abortRef.current.signal,
      });
    } catch (e) {
      setIsStreaming(false);
      abortRef.current = null;

      if (e instanceof HttpError) {
        if (e.status === 401) {
          toast.error("Please sign in to use the chat feature.");
          return;
        }
        if (e.status === 429) {
          toast.error("Too many requests — please wait and try again.");
          return;
        }
        if (e.status === 402) {
          toast.error("AI usage requires credits — please add credits and try again.");
          return;
        }
        toast.error(e.message || "Failed to start chat.");
        return;
      }

      toast.error(e instanceof Error ? e.message : "Failed to start chat.");
    }
  }, [input, isStreaming, messages, user]);

  // Show loading state
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-border/60 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to use the AI chatbot feature.
            </p>
            <Button onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AI Chatbot</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Streaming responses powered by Lovable AI.
          </p>
        </header>

        <Card className="border-border/60">
          <div className="p-4 md:p-6">
            <ScrollArea className="h-[55vh] pr-3">
              <div className="space-y-4">
                {messages.map((m, idx) => {
                  const isUser = m.role === "user";
                  return (
                    <div key={`${m.role}-${idx}`} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border " +
                          (isUser
                            ? "bg-primary text-primary-foreground border-primary/40"
                            : "bg-muted text-foreground border-border")
                        }
                        aria-label={isUser ? "Your message" : "Assistant message"}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            <div className="mt-4 md:mt-6 grid gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                className="min-h-[100px] resize-none"
                disabled={isStreaming}
              />

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Tip: avoid sharing sensitive personal data.
                </p>
                <div className="flex items-center gap-2">
                  {isStreaming ? (
                    <Button variant="secondary" onClick={stop}>
                      Stop
                    </Button>
                  ) : null}
                  <Button onClick={send} disabled={!canSend}>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Chat;
