"use client";

import Link from "next/link";

import type { PlayerType } from "@/types/player";

interface DashboardNavProps {
    activeTab?: "overview" | "batters" | "bowlers" | "methodology";
    onSelectTab?: (tab: PlayerType) => void;
}

export default function DashboardNav({ activeTab = "overview", onSelectTab }: DashboardNavProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#DCDDD5] bg-[#F5F5F0]/90 backdrop-blur-md">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                {/* Left: Brand & Tag */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link
                        href="/"
                        className="text-xl font-black tracking-tight text-[#111111] hover:opacity-90 transition-opacity flex items-baseline"
                    >
                        <span>SupeRR</span>
                        <span className="text-[#B7F34A]">.</span>
                    </Link>

                    <div className="inline-flex items-center px-2 py-0.5 rounded-full border border-[#DCDDD5] bg-white text-[9px] font-bold uppercase tracking-wider text-[#70746D] font-mono shadow-2xs">
                        CRICKET INTELLIGENCE
                    </div>
                </div>

                {/* Center: Navigation Links */}
                <nav className="flex items-center gap-1 sm:gap-1.5">
                    <button
                        type="button"
                        onClick={() => {
                            if (typeof window !== "undefined") {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            activeTab === "overview"
                                ? "bg-[#151515] text-[#B7F34A] shadow-2xs"
                                : "text-[#70746D] hover:text-[#111111] hover:bg-stone-200/60"
                        }`}
                    >
                        Overview
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            if (onSelectTab) onSelectTab("batter");
                            const el = document.getElementById("player-ranking-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            activeTab === "batters"
                                ? "bg-[#151515] text-[#B7F34A] shadow-2xs"
                                : "text-[#70746D] hover:text-[#111111] hover:bg-stone-200/60"
                        }`}
                    >
                        Batters
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            if (onSelectTab) onSelectTab("bowler");
                            const el = document.getElementById("player-ranking-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            activeTab === "bowlers"
                                ? "bg-[#151515] text-[#B7F34A] shadow-2xs"
                                : "text-[#70746D] hover:text-[#111111] hover:bg-stone-200/60"
                        }`}
                    >
                        Bowlers
                    </button>

                    <Link
                        href="/methodology"
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            activeTab === "methodology"
                                ? "bg-[#151515] text-[#B7F34A] shadow-2xs"
                                : "text-[#70746D] hover:text-[#111111] hover:bg-stone-200/60"
                        }`}
                    >
                        Methodology
                    </Link>
                </nav>

                {/* Right: Campaign Label */}
                <div className="flex items-center gap-2 font-mono">
                    <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-[#70746D]">
                        IPL 2027
                    </span>
                    <span className="hidden sm:inline-block text-stone-300">·</span>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#5B8813]">
                        SEASON 02
                    </span>
                </div>
            </div>
        </header>
    );
}
