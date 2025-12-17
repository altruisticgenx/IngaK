import { useCallback, useState } from "react";
import type { Article } from "@/data/articles";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type SummaryData = {
  summary: string;
  bullets: string[];
  cached: boolean;
};

function flattenArticle(article: Article): string {
  const sections = article.content.sections
    .map((s) => `${s.heading}\n${s.content}`)
    .join("\n\n");

  return [
    article.content.introduction,
    sections,
    `Conclusion:\n${article.content.conclusion}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

export function ArticleSummaryDialog({ article }: { article: Article }) {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SummaryData | null>(null);

  const load = useCallback(async () => {
    if (data || isLoading) return;

    setIsLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("summarize", {
        body: {
          articleId: article.id,
          title: article.title,
          content: flattenArticle(article),
        },
      });

      if (error) throw error;
      if (!res || typeof res !== "object") throw new Error("Invalid response");

      const summary = (res as { summary?: unknown }).summary;
      const bullets = (res as { bullets?: unknown }).bullets;
      const cached = (res as { cached?: unknown }).cached;

      if (typeof summary !== "string") throw new Error("Invalid summary");

      setData({
        summary,
        bullets: Array.isArray(bullets) ? bullets.filter((b): b is string => typeof b === "string") : [],
        cached: Boolean(cached),
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to summarize";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [article, data, isLoading]);

  const onOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) void load();
    },
    [load],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" aria-label={`Summarize article: ${article.title}`}>
          AI Summary
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Summary</DialogTitle>
          <DialogDescription>
            {article.title}
            {data?.cached ? " (cached)" : ""}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[70%]" />
            <div className="pt-3 space-y-2">
              <Skeleton className="h-3 w-[60%]" />
              <Skeleton className="h-3 w-[55%]" />
              <Skeleton className="h-3 w-[65%]" />
            </div>
          </div>
        ) : data ? (
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-foreground">{data.summary}</p>

            {data.bullets.length > 0 ? (
              <section aria-label="Key takeaways">
                <h3 className="text-sm font-semibold">Key takeaways</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {data.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No summary available.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
