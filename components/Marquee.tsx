const TOP =
  "* BIENVENUE SUR CYBERZIZOU 2000 * LA FRANCE A GAGNE 3-0 * 12 JUILLET 1998 RESTERA GRAVE A JAMAIS * ZIDANE EST UN GENIE * CHARGEMENT EN COURS... * MEILLEUR VU AVEC INTERNET EXPLORER 5 * RESOLUTION OPTIMALE 800x600 * ";
const MID =
  "[ NOUVEAU !! ] WEBRING DES BLEUS - CLIQUEZ POUR REJOINDRE - DEJA 47 392 SITES PARTENAIRES - PROCHAIN OBJECTIF : 1 MILLION DE FANS DE ZIDANE - ";
const BOTTOM =
  ">> ALERTE >> WANADOO OFFRE 30 HEURES GRATUITES >> COMMANDEZ VOTRE CD-ROM AOL >> AICHA D ALEY KHALED EST LE TUBE DE L ETE >> MAITRE GIMS N EXISTE PAS ENCORE >> ";

export function Marquee() {
  return (
    <div className="select-none">
      <div className="marquee">
        <div className="marquee-track">{TOP.repeat(3)}</div>
      </div>
      <div className="marquee alt">
        <div className="marquee-track reverse">{MID.repeat(3)}</div>
      </div>
      <div className="marquee alt2">
        <div className="marquee-track">{BOTTOM.repeat(3)}</div>
      </div>
    </div>
  );
}
