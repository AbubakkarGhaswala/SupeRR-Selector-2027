"use client";

import { useState, useMemo } from "react";
import type { PlayerType, BoardPlayer, Batter, Bowler } from "@/types/player";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./DashboardHeader";
import PlayerTypeSwitcher from "./PlayerTypeSwitcher";
import PlayerGrid from "@/components/players/PlayerGrid";
import PlayerWorkspace from "@/components/players/PlayerWorkspace";
import PerformanceChart from "./PerformanceChart";
import PlayerRankingTable from "./PlayerRankingTable";
import Link from "next/link";
import { BookOpen, ShieldCheck } from "lucide-react";

interface InteractiveDashboardProps {
    batters: Batter[];
    bowlers: Bowler[];
    boardPlayers: BoardPlayer[];
}

export default function InteractiveDashboard({
    batters,
    bowlers,
    boardPlayers,
}: InteractiveDashboardProps) {
    const [activeType, setActiveType] = useState<PlayerType>("batter");
    const [selectedBatterSlug, setSelectedBatterSlug] = useState<string>("rinku-singh");
    const [selectedBowlerSlug, setSelectedBowlerSlug] = useState<string>("shaheen-afridi");

    // Filter cohort based on active type
    const currentCohort = useMemo(() => {
        return boardPlayers
            .filter((p) => p.type === activeType)
            .sort((a, b) => a.rank - b.rank);
    }, [boardPlayers, activeType]);

    // Active selected slug based on type
    const activeSlug = activeType === "batter" ? selectedBatterSlug : selectedBowlerSlug;

    // Selected player object
    const selectedPlayer = useMemo(() => {
        const found = currentCohort.find((p) => p.slug === activeSlug);
        return found || currentCohort[0];
    }, [currentCohort, activeSlug]);

    // Associated raw data records
    const selectedBatter = useMemo(() => {
        if (selectedPlayer.type !== "batter") return undefined;
        return (
            selectedPlayer.batter ||
            batters.find((b) => b.rank === selectedPlayer.rank)
        );
    }, [selectedPlayer, batters]);

    const selectedBowler = useMemo(() => {
        if (selectedPlayer.type !== "bowler") return undefined;
        return (
            selectedPlayer.bowler ||
            bowlers.find((b) => b.rank === selectedPlayer.rank)
        );
    }, [selectedPlayer, bowlers]);

    const handleSelectPlayer = (player: BoardPlayer) => {
        if (player.type === "batter") {
            setSelectedBatterSlug(player.slug);
        } else {
            setSelectedBowlerSlug(player.slug);
        }

        // Smooth scroll to selected player workspace on small viewports
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            const panel = document.getElementById("player-workspace");
            if (panel) {
                panel.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const handleTypeChange = (type: PlayerType) => {
        setActiveType(type);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F5F5F0] text-[#111111] selection:bg-[#B7F34A] selection:text-black">
            {/* 1. Fixed / Sticky Top Navigation */}
            <DashboardNav
                activeTab={activeType === "batter" ? "batters" : "bowlers"}
                onSelectTab={handleTypeChange}
            />

            {/* Main Interactive Workspace Container */}
            <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                {/* 2. Compact Dashboard Header & Dataset Metrics */}
                <DashboardHeader />

                {/* 3. Player Cohort Section: Switcher + 10 Player Cards Grid */}
                <section id="player-ranking-section" className="space-y-3.5">
                    <PlayerTypeSwitcher
                        activeType={activeType}
                        onTypeChange={handleTypeChange}
                        batterCount={10}
                        bowlerCount={10}
                    />

                    {/* 5-Column Responsive Dashboard Grid (Section 2) */}
                    <PlayerGrid
                        players={currentCohort}
                        selectedPlayer={selectedPlayer}
                        onSelectPlayer={handleSelectPlayer}
                    />
                </section>

                {/* 4. Large Active Player Workspace (Section 4 & 5) */}
                <PlayerWorkspace
                    player={selectedPlayer}
                    batter={selectedBatter}
                    bowler={selectedBowler}
                />

                {/* 5. Performance Analytics Scatter Chart (Section 10) */}
                <section className="space-y-3">
                    <PerformanceChart
                        players={currentCohort}
                        selectedPlayer={selectedPlayer}
                        onSelectPlayer={handleSelectPlayer}
                    />
                </section>

                {/* 6. Compact Official Leaderboard Table (Section 10) */}
                <section className="space-y-3">
                    <PlayerRankingTable
                        players={currentCohort}
                        selectedPlayer={selectedPlayer}
                        onSelectPlayer={handleSelectPlayer}
                        batters={batters}
                        bowlers={bowlers}
                    />
                </section>

                {/* 7. Methodology & Data Quality Callout (Section 10) */}
                <section className="p-5 rounded-2xl bg-white border border-[#DCDDD5] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 max-w-2xl">
                        <div className="p-2 rounded-xl bg-[#F0F5E5] text-[#55731D] shrink-0 mt-0.5">
                            <ShieldCheck className="w-5 h-5 text-[#5B8813]" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                                RESEARCH METHODOLOGY & DATA ARCHITECTURE
                            </h4>
                            <p className="text-xs text-[#70746D] leading-relaxed">
                                Evaluated on 200,999 ball-by-ball deliveries across IPL & T20I (2022–2026).
                                Pressure state is isolated to overs with ≤5 wickets in hand or death overs with ≤7 wickets.
                                Bowling figures represent event rates per 100 recorded deliveries.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/methodology"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#111111] text-xs font-bold transition-colors font-mono shrink-0 border border-stone-200"
                    >
                        <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                        <span>Inspect Methodology Specification →</span>
                    </Link>
                </section>
            </main>

            {/* Minimal Editorial Footer */}
            <footer className="mt-16 border-t border-[#DCDDD5] bg-[#EBECE5] text-[#70746D] text-xs font-mono">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="font-extrabold text-[#111111]">SupeRR.</span>
                        <span className="text-stone-400">|</span>
                        <span>CRICKET SCOUTING & PRESSURE INTELLIGENCE DASHBOARD</span>
                    </div>

                    <div className="flex items-center gap-4 text-[#70746D] text-[11px]">
                        <span>200,999 DELIVERIES</span>
                        <span>·</span>
                        <span>883 MATCHES</span>
                        <span>·</span>
                        <span>SEASON 02 / 2027</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
