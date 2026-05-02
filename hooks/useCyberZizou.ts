"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo } from "react";

export type ChatMode = "normal" | "haddock";

let currentMode: ChatMode = "normal";
const listeners = new Set<(mode: ChatMode) => void>();

export function getChatMode(): ChatMode {
  return currentMode;
}

export function setChatMode(mode: ChatMode) {
  if (currentMode === mode) return;
  currentMode = mode;
  listeners.forEach((l) => l(mode));
}

export function subscribeChatMode(listener: (mode: ChatMode) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCyberZizou() {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, body }) => ({
          body: { ...body, messages, mode: currentMode },
        }),
      }),
    [],
  );
  return useChat({ transport });
}
