"use client";

import type { BoardPlayer, Batter, Bowler } from "@/types/player";
import PlayerImage from "@/components/scouting/PlayerImage";
import PerformanceComparison from "./PerformanceComparison";
import ScoutingInsight from "./ScoutingInsight";
import RR2027Panel from "./RR2027Panel";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

interface SelectedPlayerPanelProps {
    player: BoardPlayer;
    batter?: Batter;
    bowler?: Bowler;
}

export default function SelectedPlayerPanel({
    player,
    batter,
    bowler,
}: SelectedPlayerPanelProps) {
    const isBatter = player.type === "batter";
    const rankStr = player.rank.toString().padStart(2, "0");

    const compColor =
        player.competition === "IPL"
            ? "bg-blue-50 text-blue-800 border-blue-200"
            : "bg-emerald-50 text-emerald-800 border-emerald-200";

    const deltaSign = player.metricChange > 0 ? "+" : "";
    const deltaDisplay = isBatter
        ? `${deltaSign}${player.metricChange.toFixed(1)} SR`
        : `${deltaSign}${player.metricChange.toFixed(2)} Wkt/100b`;

    const normalDisplay = isBatter
        ? `${player.normalMetric.toFixed(1)} SR`
        : `${player.normalMetric.toFixed(2)} Wkt/100b`;

    const pressureDisplay = isBatter
        ? `${player.pressureMetric.toFixed(1)} SR`
        : `${player.pressureMetric.toFixed(2)} Wkt/100b`;

    return (
        <section
            id="selected-player-panel"
            className="rounded-3xl border border-stone-200/90 bg-[#FAF9F5] p-5 sm:p-7 shadow-xs space-y-6 transition-all"
        >
            {/* Panel Top Identification Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center font-mono font-black text-sm">
                        {rankStr}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
                                ACTIVE SELECTION
                            </span>
                            <span className="text-stone-300">/</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${compColor}`}>
                                {player.competition}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-stone-100 text-stone-700 border border-stone-200">
                                {player.type.toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight mt-0.5">
                            {player.name}
                        </h2>
                    </div>
                </div>

                {/* Right Action: Open Dedicated Profile */}
                <Link
                    href={`/players/${player.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-950 text-stone-50 text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs group font-mono self-start sm:self-auto"
                >
                    <span>Full Scouting Profile</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>

            {/* Main Showcase Grid: Photo + Primary Score + Metric Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Controlled Portrait Photograph */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-[#181B1E] relative aspect-[4/5] w-full max-w-sm mx-auto">
                        <PlayerImage
                            src={player.image}
                            alt={player.name}
                            name={player.name}
                            rank={player.rank}
                            aspectRatio="portrait"
                            priority={true}
                            className="w-full h-full object-cover object-top"
                        />

                        {/* Floating Rank Badge */}
                        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-stone-950/90 text-stone-100 border border-stone-700/60 shadow-md font-mono flex items-center gap-1.5 backdrop-blur-xs">
                            <Award className="w-3.5 h-3.5 text-[#C4DD7A]" />
                            <span className="text-xs font-black text-[#C4DD7A]">
                                #{rankStr}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Primary Metrics Grid & Breakdown */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-4">
                    {/* Hero Adjusted Pressure Score */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 block">
                                COMPREHENSIVE RATING
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl sm:text-5xl font-black text-stone-950 font-mono tracking-tight">
                                    {player.adjustedScore.toFixed(1)}
                                </span>
                                <span className="text-sm font-bold text-stone-400 font-mono">
                                    / 100
                                </span>
                            </div>
                            <p className="text-[11px] text-stone-500 leading-tight">
                                Adjusted format pressure score with neutral-50 reliability shrinkage.
                            </p>
                        </div>

                        {/* Reliability Factor Badge */}
                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 sm:text-right font-mono min-w-[140px]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                                RELIABILITY
                            </span>
                            <span className="text-2xl font-black text-stone-900 block mt-0.5">
                                {player.reliability.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-stone-400">
                                {player.reliability >= 1.0 ? "Full 300+ benchmark" : "Sample shrunk"}
                            </span>
                        </div>
                    </div>

                    {/* Exact 6 Core Metric Tiles requested in section 12 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {/* 1. Normal Baseline */}
                        <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                                NORMAL BASELINE
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                                {normalDisplay}
                            </div>
                            <span className="text-[10px] text-stone-500 mt-0.5 block">
                                standard phase rate
                            </span>
                        </div>

                        {/* 2. Pressure Performance */}
                        <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#55731D] block">
                                PRESSURE RATE
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-[#445D14] font-mono mt-1">
                                {pressureDisplay}
                            </div>
                            <span className="text-[10px] text-stone-500 mt-0.5 block">
                                crunch phase execution
                            </span>
                        </div>

                        {/* 3. Performance Change */}
                        <div className="p-3.5 rounded-xl bg-[#F5F8ED] border border-[#DCE8BF] shadow-2xs">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4A6315] block">
                                NET CHANGE
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-[#3E5511] font-mono mt-1">
                                {deltaDisplay}
                            </div>
                            <span className="text-[10px] text-[#4A6315] mt-0.5 block font-medium">
                                pressure uplift
                            </span>
                        </div>

                        {/* 4. Pressure Matches */}
                        <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                                PRESSURE MATCHES
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                                {player.pressureMatches}
                            </div>
                            <span className="text-[10px] text-stone-500 mt-0.5 block">
                                of {player.matches} total matches
                            </span>
                        </div>

                        {/* 5. Pressure Deliveries / Balls */}
                        <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                                {isBatter ? "PRESSURE BALLS" : "PRESSURE DELIVERIES"}
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                                {player.sampleSize}
                            </div>
                            <span className="text-[10px] text-stone-500 mt-0.5 block">
                                qualified sample
                            </span>
                        </div>

                        {/* 6. Reliability Factor */}
                        <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                                RELIABILITY FACTOR
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                                {player.reliability.toFixed(2)}
                            </div>
                            <span className="text-[10px] text-stone-500 mt-0.5 block">
                                min sample: 100
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep Analytics Modules for Selected Player */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-3">
                {/* Horizontal Comparison Bars (Left Column) */}
                <div className="lg:col-span-6 space-y-6">
                    <PerformanceComparison
                        player={player}
                        batter={batter}
                        bowler={bowler}
                    />
                </div>

                {/* Scouting Insight & RR 2027 View (Right Column) */}
                <div className="lg:col-span-6 space-y-6">
                    <ScoutingInsight
                        player={player}
                        batter={batter}
                        bowler={bowler}
                    />

                    <RR2027Panel
                        player={player}
                        batter={batter}
                        bowler={bowler}
                    />
                </div>
            </div>
        </section>
    );
}
