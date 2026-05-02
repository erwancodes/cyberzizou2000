import type { Metadata } from "next";
import { VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberZizou 2000 v1.0 - L'Assistant Intelligent Français",
  description: "La première intelligence artificielle française du web. Vive la France 1998 !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${vt323.variable} ${pressStart.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
