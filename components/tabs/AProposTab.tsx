"use client";

import { useEffect, useState } from "react";
import { IconBolt, IconTrophy, IconBall, IconDiskette, IconPC, IconChevron } from "../Icons";

const CREDITS = [
  { role: "ARCHITECTE EN CHEF", name: "Erwan T." },
  { role: "DIRECTEUR ARTISTIQUE", name: "Le fantome de Bill Gates (1998)" },
  { role: "MOTEUR D'IA", name: "OpenRouter — modeles gratuits" },
  { role: "BASE DE DONNEES", name: "COUPE_MONDE_98.DBF (12 847 buts)" },
  { role: "TESTEUR PRINCIPAL", name: "Aime Jacquet (non credite)" },
  { role: "MUSIQUE", name: "I Will Survive — Hermes House Band" },
];

const TECH = [
  { k: "PROCESSEUR", v: "Pentium II — 233 MHz (overclocke a 240)" },
  { k: "MEMOIRE VIVE", v: "640 Ko (suffisant pour tout le monde)" },
  { k: "DISQUE DUR", v: "4.3 Go IDE — Quantum Fireball" },
  { k: "CARTE GRAPHIQUE", v: "S3 ViRGE 3D — 2 Mo VRAM" },
  { k: "CARTE SON", v: "Sound Blaster 16 — IRQ 5, DMA 1" },
  { k: "MODEM", v: "US Robotics 56K — V.90" },
  { k: "MOUSE", v: "Microsoft IntelliMouse — molette PS/2" },
  { k: "OS", v: "MS-DOS 6.22 / Windows 98 SE" },
  { k: "NAVIGATEUR", v: "Internet Explorer 5.5 + Netscape 4.7" },
];

export function AProposTab() {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const mins = Math.floor((uptime % 3600) / 60);
  const secs = uptime % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="font-vt323">
      <div className="bevel-rect bg-[#c0c0c0] p-2 mb-2 flex gap-3 items-start">
        <div className="bevel-rect-inset bg-white p-2 shrink-0">
          <IconTrophy width={48} height={48} className="text-yellow-500" />
        </div>
        <div className="text-black text-base leading-tight">
          <div className="text-lg font-bold">CYBERZIZOU 2000</div>
          <div>Version 1.0.0b — build 19980712.2145</div>
          <div>Copyright (C) 1998-2000 ZIDANE SOFTWARE</div>
          <div className="mt-1 text-[12px] italic">
            « Le foot, c&apos;est mon cinema. » — Z.Z.
          </div>
        </div>
      </div>

      <div className="text-green-400 text-lg leading-tight mb-1">
        ► CONFIGURATION SYSTEME
      </div>
      <div className="bevel-rect-inset bg-black px-2 py-1 mb-2">
        <ul className="space-y-0">
          {TECH.map((t) => (
            <li key={t.k} className="text-base leading-tight flex gap-2">
              <IconChevron width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
              <span className="text-cyan-300 w-[140px] shrink-0">{t.k}</span>
              <span className="text-white">{t.v}</span>
            </li>
          ))}
          <li className="text-base leading-tight flex gap-2">
            <IconBolt width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
            <span className="text-cyan-300 w-[140px] shrink-0">UPTIME SESSION</span>
            <span className="text-green-400">
              {pad(days)}j {pad(hours)}h {pad(mins)}m {pad(secs)}s
            </span>
          </li>
        </ul>
      </div>

      <div className="text-green-400 text-lg leading-tight mb-1">► CREDITS</div>
      <div className="bevel-rect-inset bg-black px-2 py-1 mb-2">
        <ul className="space-y-0">
          {CREDITS.map((c) => (
            <li key={c.role} className="text-base leading-tight flex gap-2">
              <IconBall width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
              <span className="text-fuchsia-300 w-[180px] shrink-0">{c.role}</span>
              <span className="text-white">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-green-400 text-lg leading-tight mb-1">► REMERCIEMENTS</div>
      <div className="bevel-rect-inset bg-black px-2 py-1 mb-2 text-base leading-tight text-white">
        <p className="mb-1">
          A toute l&apos;equipe de France 1998. A Aime Jacquet, qui y a toujours
          cru. A Lilian Thuram pour le doublé en demi-finale. A Fabien Barthez
          pour le crane chauve qui porte chance.
        </p>
        <p className="mb-1">
          Et bien sur, a <span className="text-yellow-300">Zinedine Zidane</span>{" "}
          pour les coups de tete dans la lucarne (et autres).
        </p>
        <p className="text-fuchsia-300 text-[12px] italic">
          Aucun footballeur bresilien n&apos;a ete maltraite pendant le
          developpement de ce logiciel. (Sauf Ronaldo en finale.)
        </p>
      </div>

      <div className="text-green-400 text-lg leading-tight mb-1">► AVERTISSEMENT LEGAL</div>
      <div className="bevel-rect-inset bg-black px-2 py-1 text-[12px] leading-tight text-zinc-300">
        <p>
          CYBERZIZOU 2000 est un logiciel parodique. Toute ressemblance avec une
          IA reelle est purement coincidentielle. Les buts marques par
          CyberZizou ne sont pas homologues par la FIFA. L&apos;utilisation
          prolongee peut entrainer des fredonnements involontaires de « I Will
          Survive ». Ne pas exposer a Marco Materazzi.
        </p>
      </div>

      <div className="mt-2 flex justify-end gap-2 items-center text-[11px] font-vt323 text-black">
        <IconDiskette width={12} height={12} />
        <span>Fichier : ZIZOU.HLP — 47 Ko sur disquette 1/3</span>
        <IconPC width={12} height={12} />
      </div>
    </div>
  );
}
