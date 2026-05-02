const ENTRIES = [
  { name: "PatrickJ_Marseille", text: "TROP COOL TON SITE FRR !!! VIVE LA FRANCE", date: "11/09/2000" },
  { name: "Veronique92", text: "Cyberzizou m a dit que jallais me marier avec zidane??", date: "02/09/2000" },
  { name: "_LeKid_", text: "ce site est meilleur que altavista", date: "28/08/2000" },
  { name: "Mamie_Suzanne", text: "Bonjour les jeunes je ne comprends rien mais c est joli", date: "14/08/2000" },
];

export function GuestbookTeaser() {
  return (
    <div className="win98 tilted-2">
      <div className="title-bar">
        <span>✎ Livre d&apos;OR</span>
        <div className="title-bar-controls">
          <button>_</button>
          <button>✕</button>
        </div>
      </div>
      <div className="p-2 bg-[#c0c0c0]">
        <div className="bevel-rect-inset bg-[#fffbe0] p-2 font-comic text-[12px] text-black space-y-2 max-h-[180px] overflow-y-auto">
          {ENTRIES.map((e) => (
            <div key={e.name}>
              <div className="font-bold text-[#000080]">
                {e.name}{" "}
                <span className="text-gray-500 font-normal text-[10px]">— {e.date}</span>
              </div>
              <div className="italic">&laquo; {e.text} &raquo;</div>
            </div>
          ))}
        </div>
        <button className="win98-btn w-full mt-2 text-[12px]">SIGNER LE LIVRE D&apos;OR</button>
      </div>
    </div>
  );
}
