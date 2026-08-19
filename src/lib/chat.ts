import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, SYSTEM_INSTRUCTIONS } from "./ai-gateway.server";

const chatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().trim().min(1).max(2_000),
      }),
    )
    .min(1)
    .max(20),
});

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => chatInput.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("Chat service is not configured.");

    const gateway = createLovableAiGatewayProvider(apiKey);
    const result = streamText({
      model: gateway("google/gemini-3.7-flash"),
      system: SYSTEM_INSTRUCTIONS,
      messages: data.messages.map((m) => ({ role: m.role, content: m.text })),
    });

    const text = (await result.text).trim();
    if (!text) throw new Error("The AI returned an empty response.");
    return { text };
  });
