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

export const IconFloppy3D = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ ...p, width: 24, height: 24, viewBox: "0 0 24 24" })}>
    <rect x="2" y="2" width="20" height="20" fill="#1a1a1a" stroke="#000" />
    <rect x="5" y="3" width="14" height="7" fill="#e0e0e0" />
    <rect x="6" y="4" width="3" height="5" fill="#404040" />
    <rect x="4" y="13" width="16" height="8" fill="#888" />
    <rect x="5" y="14" width="14" height="6" fill="#bbb" />
  </svg>
);
