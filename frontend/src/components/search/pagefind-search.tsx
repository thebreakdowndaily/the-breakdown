"use client"

import { useEffect, useRef, useState } from "react";
import { Search, Loader2, FileText } from "lucide-react";

interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    meta: { title: string };
    content: string;
    excerpt: string;
  }>;
}

export function PagefindSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { url: string; title: string; excerpt: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const pagefindRef = useRef<{
    search: (q: string) => Promise<{ results: PagefindResult[] }>;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const pf = await new Function(
          'return import("/pagefind/pagefind.js")',
        )();
        pagefindRef.current = pf as {
          search: (q: string) => Promise<{ results: PagefindResult[] }>;
        };
        setReady(true);
      } catch {
        setReady(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!query.trim() || !pagefindRef.current) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const search = await pagefindRef.current!.search(query);
        const items = await Promise.all(
          (search.results || []).slice(0, 20).map(async (r) => {
            const d = await r.data();
            return { url: d.url, title: d.meta?.title, excerpt: d.excerpt };
          }),
        );
        setResults(items);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (!ready) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
        <Loader2 className="size-4 animate-spin" />
        Loading search...
      </div>
    );
  }

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reports, data, analysis..."
          className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          autoFocus
        />
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
          <Loader2 className="size-4 animate-spin" />
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <ul className="space-y-3">
          {results.map((r, i) => (
            <li key={i}>
              <a
                href={r.url}
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start gap-3">
                  <FileText className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {r.excerpt}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {query && !loading && results.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No results found for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
