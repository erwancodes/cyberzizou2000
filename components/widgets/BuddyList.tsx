"use client";

const BUDDIES = [
  { name: "Zinedine_le_GOAT", status: "online", msg: "10/10 c moa lol" },
  { name: "Fabien_Barthez_98", status: "online", msg: "j ai un crane lisse" },
  { name: "AimeJacquet_42", status: "away", msg: "BARBOUZE EN PAUSE" },
  { name: "Kheira_Marseille", status: "online", msg: "qui veut chater?" },
  { name: "DjPetitGibus", status: "busy", msg: "MIX EN COURS" },
  { name: "MireilleM_Wanadoo", status: "offline", msg: "" },
  { name: "Kevin_99", status: "online", msg: "trop fort cybr2000" },
];

const STATUS_COLOR: Record<string, string> = {
  online: "#00ff00",
  away: "#ffb000",
  busy: "#ff2030",
  offline: "#606060",
};

export function BuddyList() {
  return (
    <div className="win98 tilted-2">
      <div className="title-bar">
        <span>◇ ICQ — Liste de Copains</span>
        <div className="title-bar-controls">
          <button>_</button>
          <button>✕</button>
        </div>
      </div>
      <div className="p-2 bg-[#c0c0c0] font-vt323 text-base">
        <div className="bevel-rect-inset bg-white p-1">
          {BUDDIES.map((b) => (
            <div
              key={b.name}
              className="flex items-center gap-2 py-[2px] border-b border-dotted border-gray-400 last:border-0"
            >
              <span
                className="inline-block w-[8px] h-[8px] rounded-full"
                style={{
                  background: STATUS_COLOR[b.status],
                  boxShadow: b.status === "online" ? "0 0 6px #00ff00" : "none",
                  border: "1px solid #000",
                }}
              />
              <span
                className="text-black flex-1 truncate"
                style={{ opacity: b.status === "offline" ? 0.5 : 1 }}
              >
                {b.name}
              </span>
              {b.msg ? <span className="text-[#000080] text-xs italic truncate max-w-[120px]">{b.msg}</span> : null}
            </div>
          ))}
        </div>
        <div className="text-xs text-center mt-2 text-black">
          <span className="blink">●</span> 6 amis en ligne / 7 total
        </div>
      </div>
    </div>
  );
}
