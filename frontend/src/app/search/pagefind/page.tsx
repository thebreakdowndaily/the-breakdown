import { PagefindSearch } from "@/components/search/pagefind-search";

export const metadata = {
  title: "Search — The Breakdown OS",
  description: "Search all reports, data labs, and analysis on The Breakdown OS.",
};

export default function PagefindSearchPage() {
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Search</h1>
          <p className="text-xs text-muted-foreground">
            Search all reports, data labs, and analysis
          </p>
        </div>
        <PagefindSearch />
      </div>
    </div>
  );
}
