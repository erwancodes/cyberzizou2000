import type { SVGProps } from "react";

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  ...p,
});

export const IconStar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <polygon points="8,1 10,6 15,6 11,9 13,15 8,12 3,15 5,9 1,6 6,6" />
  </svg>
);

export const IconHeart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M8 14 L1 7 C1 3 4 1 6 3 L8 5 L10 3 C12 1 15 3 15 7 Z" />
  </svg>
);

export const IconBall = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="8" cy="8" r="7" fill="#fff" stroke="#000" strokeWidth="1" />
    <polygon points="8,3 11,5 10,9 6,9 5,5" fill="#000" />
    <line x1="8" y1="3" x2="8" y2="1" stroke="#000" strokeWidth="1" />
    <line x1="11" y1="5" x2="14" y2="4" stroke="#000" strokeWidth="1" />
    <line x1="5" y1="5" x2="2" y2="4" stroke="#000" strokeWidth="1" />
    <line x1="10" y1="9" x2="13" y2="13" stroke="#000" strokeWidth="1" />
    <line x1="6" y1="9" x2="3" y2="13" stroke="#000" strokeWidth="1" />
  </svg>
);

export const IconTrophy = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 2 L12 2 L12 5 C12 8 10 9 8 9 C6 9 4 8 4 5 Z" fill="#ffd700" stroke="#000" strokeWidth="1" />
    <rect x="6" y="9" width="4" height="3" fill="#ffd700" stroke="#000" strokeWidth="1" />
    <rect x="4" y="12" width="8" height="2" fill="#ffd700" stroke="#000" strokeWidth="1" />
  </svg>
);

export const IconDiskette = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="1" y="1" width="14" height="14" fill="#000" />
    <rect x="3" y="2" width="8" height="5" fill="#fff" />
    <rect x="4" y="3" width="2" height="3" fill="#000" />
    <rect x="3" y="9" width="10" height="5" fill="#bbb" stroke="#000" strokeWidth="0.5" />
    <line x1="5" y1="11" x2="11" y2="11" stroke="#000" strokeWidth="0.5" />
    <line x1="5" y1="12.5" x2="11" y2="12.5" stroke="#000" strokeWidth="0.5" />
  </svg>
);

export const IconWarning = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <polygon points="8,1 15,14 1,14" fill="#ffff00" stroke="#000" strokeWidth="1.2" />
    <rect x="7.3" y="5" width="1.4" height="5" fill="#000" />
    <rect x="7.3" y="11" width="1.4" height="1.4" fill="#000" />
  </svg>
);

export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 2 L6 2 L7 5 L5 6 C6 9 8 11 11 12 L12 10 L15 11 L15 14 C9 14 2 7 2 3 Z" fill="#000" />
  </svg>
);

export const IconPC = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="1" y="2" width="14" height="9" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
    <rect x="2.5" y="3.5" width="11" height="6" fill="#0040a0" />
    <rect x="5" y="11" width="6" height="2" fill="#a0a0a0" stroke="#000" strokeWidth="1" />
    <rect x="3" y="13" width="10" height="1" fill="#000" />
  </svg>
);

export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#000" strokeWidth="1" />
    <polyline points="1,3 8,9 15,3" fill="none" stroke="#000" strokeWidth="1" />
  </svg>
);

export const IconFire = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M8 1 C9 4 12 5 12 9 C12 12 10 14 8 14 C6 14 4 12 4 9 C4 7 6 6 6 4 C7 5 8 5 8 1 Z" fill="#ff4500" stroke="#000" strokeWidth="0.8" />
    <path d="M8 6 C8.5 8 10 8 10 10 C10 12 9 13 8 13 C7 13 6 12 6 10 C6 9 7 8.5 7 7 Z" fill="#ffff00" />
  </svg>
);

export const IconLock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 7 L5 4 C5 2 6 1 8 1 C10 1 11 2 11 4 L11 7" fill="none" stroke="#000" strokeWidth="1.4" />
    <rect x="3" y="7" width="10" height="7" fill="#ffd700" stroke="#000" strokeWidth="1" />
  </svg>
);

export const IconNew = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ ...p, width: 28, height: 28, viewBox: "0 0 28 28" })}>
    <polygon
      points="14,1 16,8 23,5 20,12 27,14 20,16 23,23 16,20 14,27 12,20 5,23 8,16 1,14 8,12 5,5 12,8"
      fill="#ff0040"
      stroke="#000"
      strokeWidth="1"
    />
    <text x="14" y="17" textAnchor="middle" fontFamily="Comic Sans MS" fontSize="7" fontWeight="900" fill="#fff">
      NEW!
    </text>
  </svg>
);

export const IconHotPick = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ ...p, width: 28, height: 28, viewBox: "0 0 28 28" })}>
    <polygon
      points="14,1 17,9 26,9 19,14 22,23 14,18 6,23 9,14 2,9 11,9"
      fill="#ffff00"
      stroke="#000"
      strokeWidth="1"
    />
  </svg>
);

export const IconChevron = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <polygon points="4,3 11,8 4,13" />
  </svg>
);

export const IconBolt = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <polygon points="9,1 3,9 7,9 5,15 13,7 9,7" fill="#ffff00" stroke="#000" strokeWidth="1" />
  </svg>
);

export const IconSnake = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path
      d="M2 4 L7 4 L7 8 L11 8 L11 12 L14 12"
      fill="none"
      stroke="#9bca3e"
      strokeWidth="2.2"
      strokeLinecap="square"
    />
    <rect x="13" y="11" width="2" height="2" fill="#9bca3e" />
    <rect x="2" y="3" width="2" height="2" fill="#fff" />
  </svg>
);

export const IconPong = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="2" y="4" width="1.5" height="8" fill="#fff" />
    <rect x="12.5" y="4" width="1.5" height="8" fill="#fff" />
    <rect x="7.5" y="7.5" width="1.5" height="1.5" fill="#fff" />
    <line x1="8" y1="2" x2="8" y2="14" stroke="#fff" strokeWidth="0.5" strokeDasharray="1,1" />
  </svg>
);

export const IconBricks = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="1" y="2" width="4" height="2" fill="#002395" stroke="#000" strokeWidth="0.4" />
    <rect x="6" y="2" width="4" height="2" fill="#fff" stroke="#000" strokeWidth="0.4" />
    <rect x="11" y="2" width="4" height="2" fill="#ed2939" stroke="#000" strokeWidth="0.4" />
    <rect x="3" y="5" width="4" height="2" fill="#ed2939" stroke="#000" strokeWidth="0.4" />
    <rect x="8" y="5" width="4" height="2" fill="#002395" stroke="#000" strokeWidth="0.4" />
    <rect x="4" y="13" width="8" height="1.5" fill="#ffe600" stroke="#000" strokeWidth="0.4" />
    <circle cx="8" cy="11" r="1" fill="#fff" />
  </svg>
);

export const IconPacman = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path
      d="M8 8 L14 4 A7 7 0 1 0 14 12 Z"
      fill="#ffe600"
      stroke="#000"
      strokeWidth="0.6"
    />
    <circle cx="8" cy="5" r="0.9" fill="#000" />
  </svg>
);

export const IconAlien = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="5" y="3" width="6" height="1" fill="#22c55e" />
    <rect x="3" y="4" width="10" height="1" fill="#22c55e" />
    <rect x="2" y="5" width="2" height="1" fill="#22c55e" />
    <rect x="6" y="5" width="1" height="1" fill="#22c55e" />
    <rect x="9" y="5" width="1" height="1" fill="#22c55e" />
    <rect x="12" y="5" width="2" height="1" fill="#22c55e" />
    <rect x="2" y="6" width="12" height="2" fill="#22c55e" />
    <rect x="5" y="7" width="1" height="1" fill="#000" />
    <rect x="10" y="7" width="1" height="1" fill="#000" />
    <rect x="3" y="9" width="2" height="1" fill="#22c55e" />
    <rect x="11" y="9" width="2" height="1" fill="#22c55e" />
    <rect x="6" y="10" width="1" height="2" fill="#22c55e" />
    <rect x="9" y="10" width="1" height="2" fill="#22c55e" />
  </svg>
);

export const IconTetris = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="6" y="2" width="3" height="3" fill="#a855f7" stroke="#000" strokeWidth="0.4" />
    <rect x="3" y="5" width="3" height="3" fill="#a855f7" stroke="#000" strokeWidth="0.4" />
    <rect x="6" y="5" width="3" height="3" fill="#a855f7" stroke="#000" strokeWidth="0.4" />
    <rect x="9" y="5" width="3" height="3" fill="#a855f7" stroke="#000" strokeWidth="0.4" />
    <rect x="2" y="9" width="3" height="3" fill="#00d0ff" stroke="#000" strokeWidth="0.4" />
    <rect x="5" y="9" width="3" height="3" fill="#ffe600" stroke="#000" strokeWidth="0.4" />
    <rect x="8" y="9" width="3" height="3" fill="#22c55e" stroke="#000" strokeWidth="0.4" />
    <rect x="11" y="9" width="3" height="3" fill="#ef4444" stroke="#000" strokeWidth="0.4" />
  </svg>
);

export const IconAnchor = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="8" cy="3" r="1.5" fill="none" stroke="#000" strokeWidth="1.2" />
    <line x1="8" y1="4.5" x2="8" y2="13" stroke="#000" strokeWidth="1.4" />
    <line x1="5.5" y1="6.5" x2="10.5" y2="6.5" stroke="#000" strokeWidth="1.4" />
    <path
      d="M3 10 C3 13 5 14 8 14 C11 14 13 13 13 10"
      fill="none"
      stroke="#000"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path d="M2 10 L4 10" stroke="#000" strokeWidth="1.4" />
    <path d="M12 10 L14 10" stroke="#000" strokeWidth="1.4" />
  </svg>
);

export const IconQuote = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="1" y="2" width="14" height="10" rx="1" fill="#ffe600" stroke="#000" strokeWidth="1" />
    <polygon points="4,12 4,15 7,12" fill="#ffe600" stroke="#000" strokeWidth="1" />
    <text
      x="8"
      y="9.5"
      textAnchor="middle"
      fontFamily="Comic Sans MS, cursive"
      fontSize="7"
      fontWeight="900"
      fill="#000"
    >
      ZZ
    </text>
  </svg>
);

export const IconQuestion = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="1" y="1" width="14" height="14" fill="#1e3a8a" stroke="#000" strokeWidth="1" />
    <path
      d="M5.5 6 C5.5 4 6.5 3 8 3 C9.5 3 10.5 4 10.5 5.5 C10.5 7 8 7.5 8 9 L8 10"
      fill="none"
      stroke="#ffe600"
      strokeWidth="1.4"
      strokeLinecap="square"
    />
    <rect x="7.3" y="11.4" width="1.4" height="1.4" fill="#ffe600" />
  </svg>
);

export const IconFloppy3D = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ ...p, width: 24, height: 24, viewBox: "0 0 24 24" })}>
    <rect x="2" y="2" width="20" height="20" fill="#1a1a1a" stroke="#000" />
    <rect x="5" y="3" width="14" height="7" fill="#e0e0e0" />
    <rect x="6" y="4" width="3" height="5" fill="#404040" />
    <rect x="4" y="13" width="16" height="8" fill="#888" />
    <rect x="5" y="14" width="14" height="6" fill="#bbb" />
  </svg>
);
