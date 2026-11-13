import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SupeRR Selector — Cricket Scouting & Pressure Intelligence",
  description:
    "Identifying elite cricket performers who deliver when the game is on the line. IPL and T20I pressure-performance scouting platform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

