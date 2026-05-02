import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

const DEFAULT_PRIMARY = "google/gemma-4-31b-it:free";
const DEFAULT_FALLBACKS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-chat-v3.1:free",
  "qwen/qwen-2.5-72b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
];

function parseList(value: string | undefined, fallback: string[]): string[] {
  if (!value) return fallback;
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const PRIMARY_MODEL_ID = process.env.OPENROUTER_MODEL ?? DEFAULT_PRIMARY;
export const FALLBACK_MODEL_IDS = parseList(
  process.env.OPENROUTER_FALLBACKS,
  DEFAULT_FALLBACKS,
);

// OpenRouter limite la liste `models` à 3 entrées max
const FALLBACKS = FALLBACK_MODEL_IDS
  .filter((m) => m !== PRIMARY_MODEL_ID)
  .slice(0, 3);

export const cyberZizouModel = openrouter(PRIMARY_MODEL_ID, {
  models: FALLBACKS,
});
