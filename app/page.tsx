import { StarBackground } from "@/components/StarBackground";
import { Marquee } from "@/components/Marquee";
import { VisitorCounter } from "@/components/VisitorCounter";
import { ZidanadeCounter } from "@/components/ZidanadeCounter";
import { SwatchClock } from "@/components/SwatchClock";
import { ChatWindow } from "@/components/ChatWindow";
import { HeroBanner } from "@/components/widgets/HeroBanner";
import { WinampPlayer } from "@/components/widgets/WinampPlayer";
import { NRJTop50 } from "@/components/widgets/NRJTop50";
import { BuddyList } from "@/components/widgets/BuddyList";
import { Webring } from "@/components/widgets/Webring";
import { IRCChat } from "@/components/widgets/IRCChat";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { StatsPanel } from "@/components/widgets/StatsPanel";
import { GuestbookTeaser } from "@/components/widgets/GuestbookTeaser";
import { FakeDownload } from "@/components/FakeDownload";
import { IconFire, IconStar, IconHeart } from "@/components/Icons";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full">
      <StarBackground />

      <Marquee />

      <HeroBanner />

      <div className="max-w-[1480px] mx-auto px-3 pb-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <div className="win98 px-3 py-1 inline-block">
            <VisitorCounter />
          </div>
          <div className="win98 px-3 py-1 inline-block">
            <ZidanadeCounter />
          </div>
          <div className="win98 px-3 py-1 inline-block">
            <SwatchClock />
          </div>
        </div>
        <div className="font-comic text-[12px] text-yellow-300 flex items-center gap-2">
          <IconFire className="text-orange-400" />
          <span className="blink-fast">EN DIRECT</span> — 247 utilisateurs en train
          de chater
        </div>
        <div className="font-comic text-[12px] text-cyan-300 flex items-center gap-2">
          <IconHeart className="text-rose-400" /> Ajouter aux favoris
          (Ctrl+D)&nbsp;!!!
        </div>
      </div>

      {/* asymmetric grid: 1fr · 2.4fr · 1fr (mobile stacks) */}
      <section className="max-w-[1480px] mx-auto px-3 pb-12 grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)_18rem] gap-4 items-start">
        {/* LEFT COLUMN */}
        <aside className="space-y-4 order-2 lg:order-1">
          <WinampPlayer />
          <NRJTop50 />
          <IRCChat />
          <Webring />
          <GuestbookTeaser />
        </aside>

        {/* CENTER */}
        <div className="order-1 lg:order-2 space-y-3">
          <ChatWindow />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-comic text-[11px] text-black">
            <div className="bevel-rect bg-yellow-300 px-2 py-2 text-center">
              <strong className="block">SAVIEZ-VOUS ?</strong>
              Zidane a 16,5 cm de plus que Karembeu (mesuré scientifiquement par CyberZizou).
            </div>
            <div className="bevel-rect bg-cyan-300 px-2 py-2 text-center">
              <strong className="block">CONSEIL DU JOUR</strong>
              Sauvegardez votre disquette avant chaque session. (Cliquez 3 fois sur OK)
            </div>
            <div className="bevel-rect bg-fuchsia-400 px-2 py-2 text-center text-white">
              <strong className="block">ANNONCE</strong>
              CyberZizou recrute des bénévoles pour répertorier les buts de Zidane (CV par fax).
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="space-y-4 order-3">
          <FakeDownload />
          <BuddyList />
          <WeatherWidget />
          <StatsPanel />
        </aside>
      </section>

      <footer className="border-t-4 border-double border-yellow-300 py-6 px-4 mt-4">
        <div className="max-w-[1480px] mx-auto grid gap-4 md:grid-cols-3 font-comic text-sm">
          <div className="text-center md:text-left">
            <div className="font-press text-[10px] rainbow-text mb-1">CYBERZIZOU 2000</div>
            <p className="text-yellow-300">
              <span className="blink">⚡</span> Hébergé fièrement sur Multimania{" "}
              <span className="blink">⚡</span>
            </p>
            <p className="text-cyan-400 mt-1 text-xs">
              © 1998-2000 CyberZizou Industries. Tous droits réservés.
            </p>
          </div>
          <div className="text-center font-comic text-[12px]">
            <div className="text-fuchsia-400 mb-1 flex items-center justify-center gap-1">
              <IconStar className="text-yellow-300" /> WEBRING DES FANS DE ZIDANE{" "}
              <IconStar className="text-yellow-300" />
            </div>
            <div className="text-yellow-300">
              [&laquo;Précédent] [Aléatoire] [Suivant&raquo;]
            </div>
            <div className="mt-1 text-cyan-300">Site n°47 / 47 392</div>
          </div>
          <div className="text-center md:text-right text-[12px]">
            <div className="text-yellow-300">Vive la France 🇫🇷 — euh, balise non supportée.</div>
            <div className="text-cyan-300 mt-1">
              Compatible : Netscape Navigator 4 / Internet Explorer 5
            </div>
            <div className="text-fuchsia-300 mt-1">
              Webmaster : zizou&lt;at&gt;cyberzizou.wanadoo.fr
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
