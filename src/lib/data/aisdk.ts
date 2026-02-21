"use server";

import { google } from "@ai-sdk/google";
import { generateText, NoObjectGeneratedError, Output } from "ai";
import {
  ACTION_LABELS,
  buildSystemPrompt,
  getActionByLabel,
  buildActionUrl,
} from "@/lib/actions-registry";

export async function handleAiSearch(query: string): Promise<{
  success: boolean;
  action?: string;
  redirectUrl?: string;
  error?: string;
}> {
  try {
    const { output } = await generateText({
      model: google("gemini-2.5-flash"),
      output: Output.choice({
        options: ACTION_LABELS,
      }),
      system: buildSystemPrompt(),
      prompt: query,
    });

    if (!output) {
      return { success: false, error: "No action could be determined." };
    }

    const action = getActionByLabel(output);
    if (!action) {
      return { success: false, error: `Unknown action: ${output}` };
    }

    return {
      success: true,
      action: output,
      redirectUrl: buildActionUrl(action),
    };
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      return {
        success: false,
        error: "Could not classify your request. Please try rephrasing.",
      };
    }
    throw error;
  }
}
