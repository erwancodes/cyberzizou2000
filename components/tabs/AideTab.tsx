"use client";

import { GAMES, MODES } from "@/lib/gameRegistry";
import { IconChevron, IconBolt, IconBall } from "../Icons";

const EASTER_EGGS = [
  { trigger: "3-0", desc: "Replay du score final France-Bresil 12/07/1998 (avec hymne)" },
  { trigger: "henry", desc: "Fiche joueur : Thierry Henry — n°12, 3 buts en 98" },
  { trigger: "barthez", desc: "Fiche joueur : Fabien Barthez — gardien chauve porte-bonheur" },
  { trigger: "lizarazu", desc: "Fiche joueur : Bixente Lizarazu — lateral gauche basque" },
  { trigger: "desailly", desc: "Fiche joueur : Marcel Desailly — Le Roc, expulse en finale" },
];

const SHORTCUTS = [
  { keys: "/", desc: "Ouvrir la palette de commandes" },
  { keys: "↑ ↓", desc: "Naviguer dans la palette" },
  { keys: "ENTREE", desc: "Lancer la commande selectionnee" },
  { keys: "TAB", desc: "Autocompleter la commande" },
  { keys: "ESC", desc: "Fermer la palette / quitter le jeu" },
  { keys: "/quit", desc: "Quitter le jeu en cours" },
];

export function AideTab() {
  return (
    <div className="font-vt323">
      <div className="text-green-400 text-lg leading-tight mb-1">
        AIDE.HLP — TABLE DES MATIERES
      </div>
      <div className="text-cyan-300 text-base mb-3 leading-tight">
        Bienvenue dans CYBERZIZOU 2000. Appuyez sur F1 a tout moment (sauf que
        F1 ne fait rien). Voici les commandes disponibles :
      </div>

      <Section title="1. MINI-JEUX">
        <ul className="space-y-[2px]">
          {GAMES.map((g) => {
            const Icon = g.icon;
            return (
              <li key={g.key} className="flex items-start gap-2 text-base leading-tight">
                <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center bevel-rect bg-white">
                  <Icon width={14} height={14} />
                </span>
                <span className="text-yellow-300 font-bold w-[140px] shrink-0">
                  {g.command}
                </span>
                <span className="text-white">{g.description}</span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="2. MODES SPECIAUX">
        <ul className="space-y-[2px]">
          {MODES.map((m) => {
            const Icon = m.icon;
            return (
              <li key={m.key} className="flex items-start gap-2 text-base leading-tight">
                <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center bevel-rect bg-white">
                  <Icon width={14} height={14} />
                </span>
                <span className="text-fuchsia-300 font-bold w-[140px] shrink-0">
                  {m.command}
                </span>
                <span className="text-white">{m.description}</span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="3. EASTER EGGS (TAPEZ DANS LA CONVERSATION)">
        <ul className="space-y-[2px]">
          {EASTER_EGGS.map((e) => (
            <li key={e.trigger} className="flex items-start gap-2 text-base leading-tight">
              <IconBall width={14} height={14} className="text-yellow-300 mt-1 shrink-0" />
              <span className="text-fuchsia-300 font-bold w-[140px] shrink-0">
                {e.trigger}
              </span>
              <span className="text-white">{e.desc}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="4. RACCOURCIS CLAVIER">
        <ul className="space-y-[2px]">
          {SHORTCUTS.map((s) => (
            <li key={s.keys} className="flex items-start gap-2 text-base leading-tight">
              <IconChevron width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
              <kbd className="font-press text-[8px] px-[5px] py-[2px] border border-black bg-white text-black w-[80px] text-center shrink-0">
                {s.keys}
              </kbd>
              <span className="text-white">{s.desc}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="5. CONSEILS DU SUPPORT TECHNIQUE WANADOO">
        <ul className="space-y-[2px] text-base leading-tight text-white">
          <li className="flex gap-2">
            <IconBolt width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
            En cas d&apos;erreur 429, raccrochez la ligne et rappelez le 3614.
          </li>
          <li className="flex gap-2">
            <IconBolt width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
            Ne debranchez pas la disquette pendant l&apos;export — risque de
            secteur defectueux.
          </li>
          <li className="flex gap-2">
            <IconBolt width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
            En cas de surchauffe du Pentium II (&gt; 73°C), poser un sopalin
            humide sur le boitier.
          </li>
          <li className="flex gap-2">
            <IconBolt width={12} height={12} className="text-yellow-300 mt-1 shrink-0" />
            Si CyberZizou refuse de parler de Materazzi, c&apos;est normal.
          </li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <div className="text-green-400 text-lg leading-tight border-b border-green-700 mb-1">
        ► {title}
      </div>
      {children}
    </div>
  );
}
