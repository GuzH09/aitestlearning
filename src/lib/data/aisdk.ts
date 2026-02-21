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
      return {
        success: false,
        error:
          "No se pudo clasificar la solicitud. Por favor, intenta reformularla.",
      };
    }

    const action = getActionByLabel(output);

    if (action?.label === "no-action") {
      return {
        success: false,
        error:
          "No se pudo clasificar la solicitud. Por favor, intenta reformularla.",
      };
    }

    if (!action) {
      return {
        success: false,
        error: `No se pudo clasificar la solicitud. Por favor, intenta reformularla.`,
      };
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
        error:
          "No se pudo clasificar la solicitud. Por favor, intenta reformularla.",
      };
    }
    throw error;
  }
}
