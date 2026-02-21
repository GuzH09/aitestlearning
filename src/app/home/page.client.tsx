"use client";

import { Button } from "@/components/ui/button";
import { handleAiSearch } from "@/lib/data/aisdk";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function HomeClient() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{
    success: boolean;
    generatedText: string;
  } | null>(null);

  const handleSearch = async (query: string) => {
    const result = await handleAiSearch(query);
    setResult(result);
  };

  return (
    <div className="flex flex-col mt-6">
      <Input
        id="input-demo"
        type="text"
        placeholder="Prompt"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={() => handleSearch(query)}>Search</Button>
      {result && (
        <div className="mt-4">
          <p>{result.generatedText}</p>
        </div>
      )}
    </div>
  );
}
