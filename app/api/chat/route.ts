import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { cyberZizouModel } from "@/lib/openrouter";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: cyberZizouModel,
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
