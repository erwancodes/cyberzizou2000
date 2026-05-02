import { IconNew, IconHotPick, IconTrophy } from "../Icons";

export function HeroBanner() {
  return (
    <div className="relative px-4 pt-6 pb-2">
      <div className="flag-stripes h-2 mb-3" />
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
        <div className="hidden md:block">
          <div className="sticker">
            <span className="block text-[10px] uppercase tracking-widest">HOT</span>
            <span className="block text-2xl">3 - 0</span>
            <span className="block text-[10px]">FINALE 98</span>
          </div>
        </div>

        <div className="text-center md:text-left">
          <div className="inline-block">
            <h1
              className="font-comic text-4xl md:text-6xl font-black title-3d glitch leading-none"
              data-text="CyberZizou 2000"
            >
              CyberZizou 2000
            </h1>
          </div>
          <div className="mt-2 font-press text-[10px] md:text-xs rainbow-text">
            v 1.0.0 b — premium edition
          </div>
          <p className="font-comic text-yellow-300 text-base md:text-lg mt-2">
            La <span className="underline decoration-wavy decoration-fuchsia-400">PREMIÈRE</span>{" "}
            Intelligence Artificielle <span className="text-cyan-300">FRANÇAISE</span> du Web&nbsp;!!
          </p>
          <p className="font-vt323 text-cyan-400 text-xl">
            <span className="blink">▶</span> FIER SUPPORTER DES BLEUS DEPUIS 1998{" "}
            <span className="blink">◀</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start font-comic text-[11px]">
            <span className="bevel-rect bg-yellow-300 text-black px-2 py-[2px] flex items-center gap-1">
              <IconHotPick width={14} height={14} /> Élu site n°1 par 01.NET
            </span>
            <span className="bevel-rect bg-cyan-300 text-black px-2 py-[2px] flex items-center gap-1">
              <IconTrophy width={14} height={14} /> Prix Webby 1999
            </span>
            <span className="bevel-rect bg-fuchsia-400 text-white px-2 py-[2px]">
              IE5 OPTIMIZED
            </span>
            <span className="bevel-rect bg-black text-yellow-300 px-2 py-[2px]">800×600</span>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="sticker alt">
            <span className="flex items-center gap-1">
              <IconNew /> NOUVEAU !
            </span>
          </div>
        </div>
      </div>
      <div className="flag-stripes h-2 mt-4" />
    </div>
  );
}
