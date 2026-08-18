import { createServerFn } from "@tanstack/react-start";
import OpenAI from "openai";
import { z } from "zod";

const SYSTEM_INSTRUCTIONS = `You are SugarBuddy AI, a friendly educational companion for children learning about diabetes.

Explain glucose, glucose trends, food, carbohydrates, and basic diabetes concepts using simple, short, age-appropriate language.

Be encouraging and reassuring.

You are an educational assistant, not a doctor.

Never diagnose a medical condition.
Never provide insulin dosage recommendations.
Never provide medication dosage recommendations.
Never make independent medical treatment decisions.

If a user asks what they should do about a concerning glucose reading, direct them to their personalized diabetes care plan and encourage them to contact their parent, caregiver, or healthcare professional.

Do not invent a personalized medical plan.
Support both English and Arabic.
Respond in the same language as the user's question.`;

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
  .validator((data: unknown) => chatInput.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      if (process.env.NODE_ENV !== "production") console.error("OPENAI_API_KEY is not configured.");
      throw new Error("Chat service is not configured.");
    }

    try {
      const client = new OpenAI({ apiKey });
      const response = await client.responses.create({
        model: "gpt-5.6",
        instructions: SYSTEM_INSTRUCTIONS,
        input: data.messages.map((message) => ({
          role: message.role,
          content: message.text,
        })),
        store: false,
      });
      const text = response.output_text.trim();
      if (!text) throw new Error("The AI returned an empty response.");
      return { text };
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("SugarBuddy AI request failed:", error);
      }
      throw new Error("Unable to get an AI response.");
    }
  });
