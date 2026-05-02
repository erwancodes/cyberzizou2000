"use client";

import { useState } from "react";
import { GameShell } from "./GameShell";
import { IconPhone, IconStar, IconHeart } from "../Icons";

type Question = {
  text: string;
  answers: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  ami: string;
  publicVote: [number, number, number, number];
};

const QUESTIONS: Question[] = [
  {
    text: "Quelle equipe a remporte la Coupe du Monde 1998 ?",
    answers: ["Le Bresil", "L'Italie", "LA FRANCE", "L'Allemagne"],
    correct: 2,
    ami: "Aimé : « Bon, écoute, j'ai pas trop de doutes là-dessus mon p'tit. »",
    publicVote: [3, 1, 95, 1],
  },
  {
    text: "Score final de la finale France-Bresil ?",
    answers: ["1-0", "2-0", "3-0", "4-0"],
    correct: 2,
    ami: "Aimé : « Trois zéro. Je le sais, j'étais sur le banc. »",
    publicVote: [4, 12, 82, 2],
  },
  {
    text: "Qui etait le selectionneur des Bleus en 1998 ?",
    answers: ["Roger Lemerre", "Aime Jacquet", "Raymond Domenech", "Henri Michel"],
    correct: 1,
    ami: "Aimé : « Heuuu, je préfère ne pas me prononcer. Mais y'a un nom qui revient... »",
    publicVote: [6, 88, 4, 2],
  },
  {
    text: "Combien de buts Zinedine Zidane a-t-il marques en finale ?",
    answers: ["Aucun", "Un seul", "Deux", "Trois"],
    correct: 2,
    ami: "Aimé : « Deux têtes magnifiques, à la 27e et la 45+1. Je les revois encore. »",
    publicVote: [2, 8, 86, 4],
  },
  {
    text: "PALIER 1 000 F — Quel numero Zidane portait-il en equipe de France ?",
    answers: ["Le 7", "Le 9", "Le 10", "Le 21"],
    correct: 2,
    ami: "Aimé : « Le numéro des artistes, mon ami. Le numéro 10. »",
    publicVote: [4, 5, 87, 4],
  },
  {
    text: "Qui etait le capitaine de l'equipe de France 1998 ?",
    answers: ["Laurent Blanc", "Didier Deschamps", "Marcel Desailly", "Lilian Thuram"],
    correct: 1,
    ami: "Aimé : « Mon porteur d'eau, le brassard sur le bras. »",
    publicVote: [12, 64, 18, 6],
  },
  {
    text: "Date exacte de la finale ?",
    answers: ["5 juillet 1998", "12 juillet 1998", "19 juillet 1998", "14 juillet 1998"],
    correct: 1,
    ami: "Aimé : « Une date que tu devrais avoir tatouée sur le coeur. »",
    publicVote: [3, 71, 8, 18],
  },
  {
    text: "Qui a marque le 3e but francais en finale, a la 90e+3 ?",
    answers: ["Thierry Henry", "Christophe Dugarry", "Emmanuel Petit", "Youri Djorkaeff"],
    correct: 2,
    ami: "Aimé : « Une queue de cheval qui claque, un pied gauche en or. »",
    publicVote: [22, 8, 58, 12],
  },
  {
    text: "Dans quel stade s'est deroulee la finale ?",
    answers: ["Parc des Princes", "Velodrome", "Stade de France", "Bollaert"],
    correct: 2,
    ami: "Aimé : « Tout neuf, inauguré juste pour ça. »",
    publicVote: [8, 3, 87, 2],
  },
  {
    text: "PALIER 32 000 F — Qui etait le gardien titulaire des Bleus en 1998 ?",
    answers: ["Bernard Lama", "Fabien Barthez", "Lionel Charbonnier", "Gianluigi Buffon"],
    correct: 1,
    ami: "Aimé : « Tête chauve, bisou de Laurent Blanc avant chaque match. »",
    publicVote: [14, 76, 4, 6],
  },
  {
    text: "Quel pays la France a-t-elle battu en quarts (aux tirs au but) ?",
    answers: ["L'Italie", "Les Pays-Bas", "L'Allemagne", "L'Argentine"],
    correct: 0,
    ami: "Aimé : « Hmm, je dirais nos voisins de la Botte. Mais je suis pas sûr à 100%. »",
    publicVote: [54, 18, 16, 12],
  },
  {
    text: "Auteur du double but vainqueur en demi-finale contre la Croatie ?",
    answers: ["Zinedine Zidane", "Thierry Henry", "Lilian Thuram", "Emmanuel Petit"],
    correct: 2,
    ami: "Aimé : « Un défenseur qui se transforme en attaquant. Personne n'aurait parié là-dessus. »",
    publicVote: [28, 14, 48, 10],
  },
  {
    text: "Numero de chemise de Bixente Lizarazu ?",
    answers: ["Le 3", "Le 5", "Le 8", "Le 16"],
    correct: 0,
    ami: "Aimé : « Bon, là je sèche un peu, j'ai un doute entre deux chiffres bas. »",
    publicVote: [42, 22, 18, 18],
  },
  {
    text: "Quel club Aime Jacquet a-t-il entraine avant les Bleus ?",
    answers: ["AS Saint-Etienne", "Olympique de Marseille", "Girondins de Bordeaux", "Olympique Lyonnais"],
    correct: 2,
    ami: "Aimé : « ... bon, là c'est embêtant si je te le dis moi-même. Disons : sud-ouest. »",
    publicVote: [22, 8, 56, 14],
  },
  {
    text: "Combien de fautes Marcel Desailly a-t-il commises avant son carton rouge en finale ?",
    answers: ["1", "2", "3", "Aucune (il a été expulsé d'office)"],
    correct: 1,
    ami: "Aimé : « Ça commence à dépasser mes compétences là, chef. Bonne chance. »",
    publicVote: [22, 38, 26, 14],
  },
];

const PRIZES = [
  "100 F",
  "200 F",
  "300 F",
  "500 F",
  "1 000 F",
  "2 000 F",
  "4 000 F",
  "8 000 F",
  "16 000 F",
  "32 000 F",
  "64 000 F",
  "125 000 F",
  "250 000 F",
  "500 000 F",
  "1 000 000 F",
];
const PALIERS = new Set([4, 9, 14]);

function safetyPrize(failedStep: number): string {
  if (failedStep <= 4) return "0 F";
  if (failedStep <= 9) return PRIZES[4];
  return PRIZES[9];
}

const LETTERS = ["A", "B", "C", "D"] as const;

type Phase = "answering" | "locked" | "revealed" | "won" | "lost" | "quit";

export function Millionaire({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("answering");
  const [picked, setPicked] = useState<number | null>(null);
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const [usedFifty, setUsedFifty] = useState(false);
  const [usedAmi, setUsedAmi] = useState(false);
  const [usedPublic, setUsedPublic] = useState(false);
  const [amiHint, setAmiHint] = useState<string | null>(null);
  const [publicVote, setPublicVote] = useState<[number, number, number, number] | null>(null);
  const [finalPrize, setFinalPrize] = useState("0 F");

  const q = QUESTIONS[step];

  const restart = () => {
    setStep(0);
    setPhase("answering");
    setPicked(null);
    setRemoved(new Set());
    setUsedFifty(false);
    setUsedAmi(false);
    setUsedPublic(false);
    setAmiHint(null);
    setPublicVote(null);
    setFinalPrize("0 F");
  };

  const useFifty = () => {
    if (usedFifty || phase !== "answering") return;
    const wrongs = [0, 1, 2, 3].filter((i) => i !== q.correct);
    const shuffled = wrongs.sort(() => Math.random() - 0.5);
    setRemoved(new Set([shuffled[0], shuffled[1]]));
    setUsedFifty(true);
  };

  const useAmi = () => {
    if (usedAmi || phase !== "answering") return;
    setAmiHint(q.ami);
    setUsedAmi(true);
  };

  const usePublic = () => {
    if (usedPublic || phase !== "answering") return;
    setPublicVote(q.publicVote);
    setUsedPublic(true);
  };

  const pick = (i: number) => {
    if (phase !== "answering" || removed.has(i)) return;
    setPicked(i);
    setPhase("locked");
  };

  const cancelPick = () => {
    if (phase !== "locked") return;
    setPicked(null);
    setPhase("answering");
  };

  const confirmPick = () => {
    if (phase !== "locked" || picked === null) return;
    setPhase("revealed");
  };

  const next = () => {
    if (phase !== "revealed") return;
    if (picked !== q.correct) {
      setFinalPrize(safetyPrize(step));
      setPhase("lost");
      return;
    }
    if (step >= QUESTIONS.length - 1) {
      setFinalPrize(PRIZES[14]);
      setPhase("won");
      return;
    }
    setStep((s) => s + 1);
    setPhase("answering");
    setPicked(null);
    setRemoved(new Set());
    setAmiHint(null);
    setPublicVote(null);
  };

  const quit = () => {
    if (phase === "won" || phase === "lost" || phase === "quit") return;
    setFinalPrize(step === 0 ? "0 F" : PRIZES[step - 1]);
    setPhase("quit");
  };

  return (
    <GameShell
      title="QUI VEUT GAGNER DES MILLIONS"
      subtitle="EDITION FRANCE 98"
      score={`Q ${step + 1}/15`}
      onExit={onExit}
      status={
        phase === "answering"
          ? "CLIQUE UNE REPONSE — JOKERS DISPO EN BAS"
          : phase === "locked"
            ? "CONFIRME OU ANNULE TON CHOIX"
            : phase === "revealed"
              ? picked === q.correct
                ? "BONNE REPONSE !!!"
                : "MAUVAISE REPONSE — TU TOMBES AU PALIER"
              : phase === "won"
                ? `★ MILLIONNAIRE ★ — ${finalPrize}`
                : phase === "lost"
                  ? `PERDU — TU REPARS AVEC ${finalPrize}`
                  : `TU AS QUITTE AVEC ${finalPrize}`
      }
    >
      <div className="flex gap-3 w-full max-w-[640px] flex-col md:flex-row">
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="bg-blue-950 border-2 border-yellow-300 px-3 py-2 text-center">
            <div className="font-press text-[9px] text-yellow-300 mb-1">
              QUESTION {step + 1} POUR {PRIZES[step]}
            </div>
            <div className="font-vt323 text-cyan-200 text-lg leading-tight">
              {q.text}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.answers.map((ans, i) => {
              const isPicked = picked === i;
              const isCorrect = q.correct === i;
              const isRevealed = phase === "revealed" || phase === "won" || phase === "lost";
              const isHidden = removed.has(i);
              let bg = "bg-blue-900";
              let border = "border-cyan-500";
              let text = "text-white";
              if (isHidden) {
                bg = "bg-zinc-900";
                border = "border-zinc-700";
                text = "text-zinc-700";
              } else if (isRevealed && isCorrect) {
                bg = "bg-emerald-700";
                border = "border-emerald-300";
              } else if (isRevealed && isPicked && !isCorrect) {
                bg = "bg-red-800";
                border = "border-red-400";
              } else if (isPicked) {
                bg = "bg-orange-700";
                border = "border-yellow-300";
              }
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  disabled={phase !== "answering" || isHidden}
                  className={`text-left px-3 py-2 border-2 ${bg} ${border} ${text} font-vt323 text-base tactile disabled:cursor-not-allowed`}
                >
                  <span className="font-press text-[10px] text-yellow-300 mr-2">
                    {LETTERS[i]} :
                  </span>
                  {isHidden ? "—" : ans}
                </button>
              );
            })}
          </div>

          {amiHint ? (
            <div className="border-2 border-fuchsia-400 bg-fuchsia-950/60 px-3 py-2 font-vt323 text-fuchsia-100 text-base flex gap-2 items-start">
              <IconPhone width={18} height={18} className="text-fuchsia-300 mt-1 shrink-0" />
              <span>{amiHint}</span>
            </div>
          ) : null}

          {publicVote ? (
            <div className="border-2 border-cyan-400 bg-cyan-950/40 px-3 py-2 font-vt323 text-cyan-100 text-sm">
              <div className="font-press text-[9px] text-cyan-300 mb-1">AVIS DU PUBLIC</div>
              {publicVote.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-press text-[9px] text-yellow-300 w-[14px]">
                    {LETTERS[i]}
                  </span>
                  <div className="flex-1 bg-black h-3 border border-cyan-700">
                    <div
                      className="h-full bg-cyan-400"
                      style={{ width: `${p}%` }}
                    />
                  </div>
                  <span className="font-vt323 text-base w-[40px] text-right">{p}%</span>
                </div>
              ))}
            </div>
          ) : null}

          {phase === "locked" ? (
            <div className="flex gap-2 justify-center">
              <button onClick={confirmPick} className="win98-btn">
                CONFIRMER {LETTERS[picked!]}
              </button>
              <button onClick={cancelPick} className="win98-btn">
                ANNULER
              </button>
            </div>
          ) : null}

          {phase === "revealed" ? (
            <div className="flex justify-center">
              <button onClick={next} className="win98-btn">
                {picked === q.correct
                  ? step >= QUESTIONS.length - 1
                    ? "DECROCHER LE MILLION"
                    : `QUESTION SUIVANTE (${PRIZES[step + 1] ?? ""})`
                  : "VOIR LE RESULTAT"}
              </button>
            </div>
          ) : null}

          {phase === "won" || phase === "lost" || phase === "quit" ? (
            <div className="border-2 border-yellow-300 bg-yellow-950/40 px-3 py-3 text-center">
              <div className="font-press text-[12px] text-yellow-300 mb-2">
                {phase === "won"
                  ? "★ JEAN-PIERRE FOUCAULT EST FIER DE TOI ★"
                  : phase === "lost"
                    ? "PARTIE TERMINEE"
                    : "TU AS PRIS L'ARGENT ET TU ES PARTI"}
              </div>
              <div className="font-vt323 text-cyan-200 text-2xl">
                Gain final : <strong className="text-yellow-300">{finalPrize}</strong>
              </div>
              <div className="flex justify-center gap-2 mt-3">
                <button onClick={restart} className="win98-btn">
                  REJOUER
                </button>
                <button onClick={onExit} className="win98-btn">
                  QUITTER
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 justify-between items-center mt-1">
            <div className="flex gap-1 flex-wrap">
              <button
                type="button"
                onClick={useFifty}
                disabled={usedFifty || phase !== "answering"}
                className="win98-btn flex items-center gap-1 disabled:opacity-40"
                title="50/50"
              >
                <IconStar width={12} height={12} className="text-yellow-700" />
                50:50
              </button>
              <button
                type="button"
                onClick={useAmi}
                disabled={usedAmi || phase !== "answering"}
                className="win98-btn flex items-center gap-1 disabled:opacity-40"
                title="Appel a Aime Jacquet"
              >
                <IconPhone width={12} height={12} />
                AIME
              </button>
              <button
                type="button"
                onClick={usePublic}
                disabled={usedPublic || phase !== "answering"}
                className="win98-btn flex items-center gap-1 disabled:opacity-40"
                title="Avis du public"
              >
                <IconHeart width={12} height={12} className="text-red-700" />
                PUBLIC
              </button>
            </div>
            {phase === "answering" && step > 0 ? (
              <button onClick={quit} className="win98-btn text-fuchsia-900">
                PRENDRE L'ARGENT ({PRIZES[step - 1]})
              </button>
            ) : null}
          </div>
        </div>

        <div
          className="bg-black border-2 border-yellow-300 p-2 font-vt323 text-sm shrink-0"
          style={{ minWidth: 150 }}
        >
          <div className="font-press text-[8px] text-yellow-300 text-center mb-1">
            ECHELLE
          </div>
          {PRIZES.slice().reverse().map((p, idx) => {
            const i = PRIZES.length - 1 - idx;
            const isCurrent = i === step;
            const isPalier = PALIERS.has(i);
            return (
              <div
                key={i}
                className={`flex justify-between px-1 ${
                  isCurrent
                    ? "bg-yellow-300 text-black font-bold"
                    : isPalier
                      ? "text-yellow-300"
                      : "text-cyan-200"
                }`}
              >
                <span>{i + 1}</span>
                <span>{p}</span>
              </div>
            );
          })}
        </div>
      </div>
    </GameShell>
  );
}
