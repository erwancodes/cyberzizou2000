"use client";

import { Streamdown } from "streamdown";

type Props = {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

export function MessageBubble({ role, content, streaming }: Props) {
  if (role === "user") {
    return (
      <div className="font-vt323 text-lg my-1 leading-tight">
        <span className="text-cyan-400">C:\&gt;</span>{" "}
        <span className="text-fuchsia-400">[USER]</span>{" "}
        <span className="text-cyan-200">{content}</span>
      </div>
    );
  }

  return (
    <div className="font-vt323 text-lg my-2 streamdown-content leading-tight">
      <div className="text-yellow-300">
        <span>┌─[CYBERZIZOU 2000]──[</span>
        <span className="text-green-400">{new Date().toLocaleTimeString("fr-FR")}</span>
        <span>]</span>
      </div>
      <div className="text-yellow-300 inline">└─&gt;{" "}</div>
      <div className="text-green-400 inline-block align-top max-w-[95%]">
        <Streamdown>{content}</Streamdown>
      </div>
      {streaming ? <span className="caret" /> : null}
    </div>
  );
}
