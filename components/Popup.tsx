"use client";

import { useEffect, useState } from "react";
import { IconTrophy, IconWarning, IconPhone, IconDiskette, IconBall, IconLock } from "./Icons";

type PopupData = {
  id: number;
  title: string;
  body: string;
  button: string;
  top: string;
  left: string;
  variant: "info" | "danger" | "success";
  Icon: typeof IconTrophy;
};

const TEMPLATES: Omit<PopupData, "id" | "top" | "left">[] = [
  {
    title: "FÉLICITATIONS !!!",
    body:
      "Vous êtes le 1 000 000e visiteur de CYBERZIZOU 2000 ! Cliquez maintenant pour réclamer votre PRIX EXCLUSIF (un poster A4 dédicacé de Zinedine Z. — quantité limitée à 4 millions).",
    button: "RÉCLAMER",
    variant: "success",
    Icon: IconTrophy,
  },
  {
    title: "ALERTE — VIRUS DÉTECTÉ",
    body:
      "Le virus 'Zidane98.exe' a infecté votre coeur. Aucun antivirus connu (Norton, McAfee, AVG) ne peut le soigner. Symptôme : envie irrésistible de chanter LA MARSEILLAISE en pleine réunion.",
    button: "JE PRENDS LE RISQUE",
    variant: "danger",
    Icon: IconWarning,
  },
  {
    title: "CONNEXION TROP LENTE",
    body:
      "Votre connexion 56K met 4 minutes à charger un GIF de Zidane. Wanadoo vous propose de passer au RNIS (128 Kbps) avec 30h gratuites !",
    button: "OUI WANADOO !",
    variant: "info",
    Icon: IconPhone,
  },
  {
    title: "MISE À JOUR CRITIQUE",
    body:
      "Internet Explorer 5.5 est disponible ! Téléchargez-le sur 47 disquettes 3.5 pouces. Temps estimé en 56K : 6 jours, 4 heures, 12 minutes (sans interruption).",
    button: "TÉLÉCHARGER",
    variant: "info",
    Icon: IconDiskette,
  },
  {
    title: "LE SAVIEZ-VOUS ?",
    body:
      "ZIDANE A MARQUÉ 2 BUTS DE LA TÊTE EN FINALE (27e + 45e+1). Probabilité statistique calculée par CyberZizou : 0,000001%. Conclusion algorithmique : ZIDANE EST UN DIEU.",
    button: "AMEN",
    variant: "success",
    Icon: IconBall,
  },
  {
    title: "MOT DE PASSE EXPIRÉ",
    body:
      "Votre mot de passe Caramail (zizou1998) a expiré. Veuillez en choisir un nouveau parmi : zizou1998, zidane10, vivelafrance, ou aimejacquet.",
    button: "CHOISIR",
    variant: "danger",
    Icon: IconLock,
  },
];

let nextId = 0;

export function PopupManager() {
  const [popups, setPopups] = useState<PopupData[]>([]);

  useEffect(() => {
    let active = true;
    const spawn = () => {
      if (!active) return;
      const tpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      const popup: PopupData = {
        id: nextId++,
        ...tpl,
        top: `${10 + Math.random() * 55}%`,
        left: `${5 + Math.random() * 60}%`,
      };
      setPopups((p) => [...p, popup]);
    };
    const initial = setTimeout(spawn, 9000);
    const loop = setInterval(spawn, 38000);
    return () => {
      active = false;
      clearTimeout(initial);
      clearInterval(loop);
    };
  }, []);

  const close = (id: number) => setPopups((p) => p.filter((x) => x.id !== id));

  return (
    <>
      {popups.map((p) => (
        <div
          key={p.id}
          className="popup win98"
          style={{ top: p.top, left: p.left, transform: `rotate(${(p.id % 5) - 2}deg)` }}
          onClick={() => close(p.id)}
        >
          <div
            className={`title-bar ${p.variant === "danger" ? "danger" : p.variant === "success" ? "success" : ""}`}
          >
            <span className="flex items-center gap-2">
              <p.Icon width={14} height={14} />
              {p.title}
            </span>
            <div className="title-bar-controls">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  close(p.id);
                }}
                aria-label="close"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-3 font-comic text-[13px]" style={{ color: "#000" }}>
            <div className="flex gap-3 items-start mb-3">
              <div className="bevel-rect bg-white p-2 shrink-0">
                <p.Icon width={28} height={28} />
              </div>
              <p className="leading-snug">{p.body}</p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="win98-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  close(p.id);
                }}
              >
                {p.button}
              </button>
              <button
                className="win98-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  close(p.id);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
