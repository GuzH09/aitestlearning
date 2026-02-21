"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function handleAiSearch(query: string) {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: query,
  });

  return { success: true, generatedText: text };
}
