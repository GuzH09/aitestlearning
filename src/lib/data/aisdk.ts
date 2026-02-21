"use server";

import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";

export async function handleAiSearch(query: string) {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    output: Output.object({
      schema: z.object({
        action: z.enum(["add-item", "remove-item", "update-item"]),
      }),
    }),
    prompt: query,
  });

  return { success: true, generatedText: text };
}
