"use client";

import { IconBolt, IconStar, IconBall, IconHeart, IconTrophy } from "../Icons";

const SITES = [
  { name: "FANS-DE-ZIDANE.fr", icon: IconBall, color: "#ed2939" },
  { name: "MULTIMANIA / DOMENECH", icon: IconStar, color: "#000080" },
  { name: "GEOCITIES /Coupe98", icon: IconTrophy, color: "#ffb000" },
  { name: "ZIZOU-LE-MAG.com", icon: IconHeart, color: "#ff00ff" },
  { name: "STADE-DE-FRANCE.tk", icon: IconBolt, color: "#008080" },
];

export function Webring() {
  return (
    <div className="win98 tilted-3">
      <div className="title-bar success">
        <span>♂ Webring des Bleus</span>
        <div className="title-bar-controls">
          <button>_</button>
          <button>✕</button>
        </div>
      </div>
      <div className="p-2 bg-[#c0c0c0]">
        <div className="text-center font-comic text-xs text-black mb-2">
          [&lt; Précédent] [Aléatoire] [Suivant &gt;]
        </div>
        <div className="bevel-rect-inset bg-white p-2 flex flex-col gap-1">
          {SITES.map((s) => (
            <button
              key={s.name}
              className="flex items-center gap-2 px-1 py-[2px] hover:bg-[#000080] hover:text-white text-black font-vt323 text-base text-left tactile"
              style={{ borderBottom: "1px dotted #888" }}
            >
              <s.icon style={{ color: s.color }} />
              <span className="truncate">{s.name}</span>
            </button>
          ))}
        </div>
        <div className="text-[10px] text-center mt-2 text-black font-comic">
          47 392 sites partenaires
        </div>
      </div>
    </div>
  );
}
