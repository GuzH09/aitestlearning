"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleAiSearch } from "@/lib/data/aisdk";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function HomeClient() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError(null);
    startTransition(async () => {
      const result = await handleAiSearch(query.trim());

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder='Try "I want to add a new product" or "Create a sale"...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isPending}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending || !query.trim()}>
        {isPending ? "Thinking..." : "Go"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
