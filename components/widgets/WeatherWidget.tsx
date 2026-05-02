export function WeatherWidget() {
  return (
    <div className="win98 tilted-4">
      <div className="title-bar">
        <span>☀ MÉTÉO MÉMORABLE</span>
        <div className="title-bar-controls">
          <button>_</button>
          <button>✕</button>
        </div>
      </div>
      <div className="p-2 bg-[#c0c0c0] font-vt323 text-black text-base">
        <div className="bevel-rect-inset bg-[#9bd5ff] p-3 text-center">
          <div className="font-bold text-sm">PARIS — STADE DE FRANCE</div>
          <div className="text-[11px] text-[#000080]">DIMANCHE 12 JUILLET 1998</div>
          <div className="text-[42px] leading-none my-1 font-press" style={{ color: "#000080", textShadow: "2px 2px 0 #ffff00" }}>
            27°
          </div>
          <div className="font-comic text-xs">Ciel dégagé / Brise tricolore</div>
          <div className="text-[10px] mt-2 text-[#000080]">Humidité 62% • Vent 14 km/h • UV 7</div>
        </div>
        <div className="text-center text-[10px] mt-2 font-comic">
          <span className="text-[#ed2939] font-bold blink">PRÉVISION</span> : Soirée historique attendue.
        </div>
      </div>
    </div>
  );
}
