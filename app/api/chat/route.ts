import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { cyberZizouModel } from "@/lib/openrouter";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { HADDOCK_PROMPT } from "@/lib/haddockPrompt";

export const runtime = "edge";
export const maxDuration = 30;

type ChatMode = "normal" | "haddock";

export async function POST(req: Request) {
  const body = (await req.json()) as { messages: UIMessage[]; mode?: ChatMode };
  const messages = body.messages;
  const mode: ChatMode = body.mode === "haddock" ? "haddock" : "normal";

  const result = streamText({
    model: cyberZizouModel,
    system: mode === "haddock" ? HADDOCK_PROMPT : SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
