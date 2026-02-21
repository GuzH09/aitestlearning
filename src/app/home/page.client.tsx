"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleAiSearch } from "@/lib/data/aisdk";
import { SendHorizonalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function HomeClient() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    startTransition(async () => {
      const result = await handleAiSearch(query.trim());

      if (result.success && result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        toast.error(result.error || "Algo salió mal.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder='Intenta "Quiero agregar un nuevo producto" o "Quiero crear una venta"...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isPending}
          className="flex-1"
        />
        <Button type="submit" disabled={isPending || !query.trim()}>
          {isPending ? "Pensando..." : <SendHorizonalIcon className="size-4" />}
        </Button>
      </div>
    </form>
  );
}
