"use client";

import type { BoardPlayer, Batter, Bowler } from "@/types/player";
import PlayerImage from "./PlayerImage";
import AnimatedNumber from "./AnimatedNumber";
import { getPlayerIntelligence } from "@/lib/intelligence";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ArrowRight, CheckCircle2, Crosshair } from "lucide-react";
import Link from "next/link";

interface PlayerWorkspaceProps {
    player: BoardPlayer;
    batter?: Batter;
    bowler?: Bowler;
}

export default function PlayerWorkspace({
    player,
    batter,
    bowler,
}: PlayerWorkspaceProps) {
    const isBatter = player.type === "batter";
    const rankStr = player.rank.toString().padStart(2, "0");
    const intelligence = getPlayerIntelligence(player, batter, bowler);

    // Section 9 dynamic analytical reasoning generated directly from CSV metrics
    const dynamicRationale = isBatter && batter
        ? `${player.name} ranks #${rankStr} because his pressure strike rate rises from ${batter.strike_rate_normal.toFixed(1)} to ${batter.strike_rate_pressure.toFixed(1)}, a +${batter.strike_rate_change.toFixed(1)} SR uplift across ${batter.balls_faced_pressure.toFixed(0)} pressure balls, while maintaining a reliability factor of ${batter.reliability_factor.toFixed(2)}.`
        : bowler
        ? `${player.name} ranks #${rankStr} because his pressure wicket rate surges from ${bowler.wicket_rate_normal.toFixed(2)} to ${bowler.wicket_rate_pressure.toFixed(2)}, a +${bowler.wicket_rate_change.toFixed(2)} wicket-rate uplift per 100 deliveries across ${bowler.deliveries_pressure.toFixed(0)} pressure deliveries, while maintaining a reliability factor of ${bowler.reliability_factor.toFixed(2)}.`
        : intelligence.whySelected.improvement;

    const compColor =
        player.competition === "IPL"
            ? "bg-blue-500/20 text-blue-300 border-blue-400/40"
            : "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";

    // Comparison bar calculations
    const normalVal = isBatter ? player.normalMetric : (bowler ? bowler.wicket_rate_normal : player.normalMetric);
    const pressureVal = isBatter ? player.pressureMetric : (bowler ? bowler.wicket_rate_pressure : player.pressureMetric);
    const deltaVal = isBatter ? player.metricChange : (bowler ? bowler.wicket_rate_change : player.metricChange);

    const normalMax = isBatter ? 220 : 15;
    const normalPct = Math.min(100, Math.max(10, (normalVal / normalMax) * 100));
    const pressurePct = Math.min(100, Math.max(10, (pressureVal / normalMax) * 100));

    // Secondary metric: Boundary % for batters, Boundary Conceded for bowlers
    const secNormal = isBatter && batter ? batter.boundary_percentage_normal : (bowler ? bowler.boundary_rate_normal : 15);
    const secPressure = isBatter && batter ? batter.boundary_percentage_pressure : (bowler ? bowler.boundary_rate_pressure : 12);
    const secDelta = secPressure - secNormal;
    const secMax = isBatter ? 40 : 30;
    const secNormalPct = Math.min(100, Math.max(10, (secNormal / secMax) * 100));
    const secPressurePct = Math.min(100, Math.max(10, (secPressure / secMax) * 100));

    return (
        <section
            id="player-workspace"
            className="rounded-3xl border border-[#DCDDD5] bg-[#F5F5F0] overflow-hidden shadow-sm"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={player.slug}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="p-5 sm:p-7 md:p-8 space-y-7"
                >
                    {/* Top Workspace Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCDDD5]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-[#151515] text-[#B7F34A] flex items-center justify-center font-mono font-black text-sm border border-stone-800 shadow-xs">
                                {rankStr}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider">
                                    <span className="text-[#70746D]">ACTIVE PLAYER</span>
                                    <span className="text-[#B7F34A]">•</span>
                                    <span className="text-[#111111]">#{rankStr}</span>
                                    <span className={`px-1.5 py-0.2 rounded border ${compColor}`}>
                                        {player.competition}
                                    </span>
                                    <span className="px-1.5 py-0.2 rounded bg-stone-200 text-[#111111]">
                                        {player.type.toUpperCase()}
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] tracking-tight mt-0.5">
                                    {player.name}
                                </h2>
                            </div>
                        </div>

                        {/* Full Profile Link */}
                        <Link
                            href={`/players/${player.slug}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151515] hover:bg-[#202020] text-stone-100 text-xs font-semibold font-mono transition-all border border-stone-800 shadow-2xs group self-start sm:self-auto"
                        >
                            <span>Inspect Full Profile</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#B7F34A] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Dark Graphite Interior Showcase Section */}
                    <div className="rounded-2xl bg-[#151515] border border-stone-800 p-5 sm:p-7 text-stone-100 shadow-xl relative overflow-hidden">
                        {/* Background radial glow */}
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(183,243,74,0.06),transparent_70%)] pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                            {/* Cinematic Scouting Image (Left Column, aspect 4:5) */}
                            <div className="lg:col-span-4 xl:col-span-4 max-w-sm mx-auto w-full">
                                <PlayerImage
                                    slug={player.slug}
                                    name={player.name}
                                    rank={player.rank}
                                    competition={player.competition}
                                    variant="workspace"
                                    priority={true}
                                />
                            </div>

                            {/* Core Numerical Metrics Grid (Right Column) */}
                            <div className="lg:col-span-8 xl:col-span-8 space-y-4">
                                {/* Comprehensive Rating Banner */}
                                <div className="p-4 sm:p-5 rounded-xl bg-[#202020] border border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                            <Award className="w-3.5 h-3.5 text-[#B7F34A]" />
                                            <span>COMPREHENSIVE SCORE</span>
                                        </div>
                                        <div className="flex items-baseline gap-2 font-mono">
                                            <AnimatedNumber
                                                value={player.adjustedScore}
                                                decimals={1}
                                                className="text-4xl sm:text-5xl font-black text-white tracking-tight"
                                            />
                                            <span className="text-base font-bold text-stone-400">
                                                / 100
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-stone-400 font-mono">
                                            Format-adjusted pressure score with neutral-50 sample shrinkage.
                                        </p>
                                    </div>

                                    {/* Reliability Factor Tile */}
                                    <div className="p-3 rounded-lg bg-[#151515] border border-stone-700/80 font-mono sm:text-right min-w-[130px]">
                                        <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                                            RELIABILITY
                                        </span>
                                        <div className="text-2xl font-black text-[#B7F34A] mt-0.5">
                                            <AnimatedNumber
                                                value={player.reliability}
                                                decimals={2}
                                            />
                                        </div>
                                        <span className="text-[10px] text-stone-400">
                                            {player.reliability >= 1.0 ? "Full 300+ Sample" : "Sample Shrunk"}
                                        </span>
                                    </div>
                                </div>

                                {/* Exact 6 Metrics Grid requested in Section 4 */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                                    {/* 1. Normal */}
                                    <div className="p-3.5 rounded-xl bg-[#202020] border border-stone-800">
                                        <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">
                                            NORMAL BASELINE
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-stone-200 mt-1">
                                            <AnimatedNumber
                                                value={normalVal}
                                                decimals={isBatter ? 1 : 2}
                                                suffix={isBatter ? " SR" : " WKT"}
                                            />
                                        </div>
                                        <span className="text-[10px] text-stone-400 mt-0.5 block">
                                            standard match phase
                                        </span>
                                    </div>

                                    {/* 2. Pressure */}
                                    <div className="p-3.5 rounded-xl bg-[#202020] border border-stone-800">
                                        <span className="text-[9px] uppercase font-bold text-[#B7F34A] block tracking-wider">
                                            HIGH PRESSURE
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-[#B7F34A] mt-1">
                                            <AnimatedNumber
                                                value={pressureVal}
                                                decimals={isBatter ? 1 : 2}
                                                suffix={isBatter ? " SR" : " WKT"}
                                            />
                                        </div>
                                        <span className="text-[10px] text-stone-400 mt-0.5 block">
                                            resource-depleted phase
                                        </span>
                                    </div>

                                    {/* 3. Net Change */}
                                    <div className="p-3.5 rounded-xl bg-[#1A2610] border border-[#3C5716]">
                                        <span className="text-[9px] uppercase font-bold text-[#B7F34A] block tracking-wider">
                                            NET CHANGE
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-[#B7F34A] mt-1">
                                            <AnimatedNumber
                                                value={deltaVal}
                                                decimals={isBatter ? 1 : 2}
                                                showSign={true}
                                                suffix={isBatter ? " SR" : " WKT"}
                                            />
                                        </div>
                                        <span className="text-[10px] text-[#A6DE42] mt-0.5 block font-medium">
                                            performance uplift
                                        </span>
                                    </div>

                                    {/* 4. Pressure Matches */}
                                    <div className="p-3.5 rounded-xl bg-[#202020] border border-stone-800">
                                        <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">
                                            PRESSURE MATCHES
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-stone-200 mt-1">
                                            <AnimatedNumber
                                                value={player.pressureMatches}
                                                decimals={0}
                                            />
                                        </div>
                                        <span className="text-[10px] text-stone-400 mt-0.5 block">
                                            of {player.matches} catalogued matches
                                        </span>
                                    </div>

                                    {/* 5. Pressure Balls / Deliveries */}
                                    <div className="p-3.5 rounded-xl bg-[#202020] border border-stone-800">
                                        <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">
                                            {isBatter ? "PRESSURE BALLS" : "PRESSURE DELIV."}
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-stone-200 mt-1">
                                            <AnimatedNumber
                                                value={player.sampleSize}
                                                decimals={0}
                                            />
                                        </div>
                                        <span className="text-[10px] text-stone-400 mt-0.5 block">
                                            qualified ball count
                                        </span>
                                    </div>

                                    {/* 6. Reliability */}
                                    <div className="p-3.5 rounded-xl bg-[#202020] border border-stone-800">
                                        <span className="text-[9px] uppercase font-bold text-stone-400 block tracking-wider">
                                            RELIABILITY FACTOR
                                        </span>
                                        <div className="text-xl sm:text-2xl font-black text-stone-200 mt-1">
                                            <AnimatedNumber
                                                value={player.reliability}
                                                decimals={2}
                                            />
                                        </div>
                                        <span className="text-[10px] text-stone-400 mt-0.5 block">
                                            min threshold: 100
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Clean White Metric Panels (Below Dark Hero) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                        {/* Left: Section 9 "Why This Player?" & Evidence */}
                        <div className="lg:col-span-6 space-y-4">
                            <div className="p-5 rounded-2xl bg-white border border-[#DCDDD5] shadow-2xs space-y-3.5">
                                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#B7F34A]" />
                                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                                            WHY THIS PLAYER?
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-[#70746D]">
                                        RANK #{rankStr}
                                    </span>
                                </div>

                                {/* Dynamic Analytical Reasoning derived from CSV */}
                                <p className="text-xs sm:text-sm text-[#111111] leading-relaxed font-medium bg-[#F8FAF2] p-3.5 rounded-xl border border-[#DEE8C5]">
                                    {dynamicRationale}
                                </p>

                                {/* Empirical Evidence Points */}
                                <div className="space-y-1.5 pt-1">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#70746D] block">
                                        EMPIRICAL METRICS AUDIT
                                    </span>
                                    <ul className="space-y-1.5 text-xs text-[#70746D]">
                                        {intelligence.whySelected.evidence.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B8813] shrink-0 mt-0.5" />
                                                <span className="leading-tight text-[#111111]">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right: Performance Comparison Bars */}
                        <div className="lg:col-span-6 space-y-4">
                            <div className="p-5 rounded-2xl bg-white border border-[#DCDDD5] shadow-2xs space-y-4">
                                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#111111]">
                                        PERFORMANCE COMPARISON
                                    </h3>
                                    <span className="text-[10px] font-mono text-[#70746D]">
                                        NORMAL vs. PRESSURE
                                    </span>
                                </div>

                                {/* Metric 1: Strike Rate / Wicket Rate */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="font-bold text-[#111111]">
                                            {isBatter ? "Strike Rate" : "Wicket Rate (per 100b)"}
                                        </span>
                                        <span className="font-black text-[#4A6615]">
                                            {deltaVal > 0 ? "+" : ""}{deltaVal.toFixed(isBatter ? 1 : 2)}
                                        </span>
                                    </div>

                                    {/* Normal */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-mono text-[#70746D]">
                                            <span>NORMAL</span>
                                            <span className="font-bold text-[#111111]">
                                                {normalVal.toFixed(isBatter ? 1 : 2)}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-stone-500 transition-all duration-500"
                                                style={{ width: `${normalPct}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Pressure */}
                                    <div className="space-y-1 pt-1">
                                        <div className="flex justify-between text-[10px] font-mono text-[#4A6615] font-bold">
                                            <span>PRESSURE</span>
                                            <span>{pressureVal.toFixed(isBatter ? 1 : 2)}</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-stone-200 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-[#B7F34A] transition-all duration-500"
                                                style={{ width: `${pressurePct}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Metric 2: Boundary % for Batters / Boundary Rate Conceded for Bowlers */}
                                <div className="space-y-2 pt-2 border-t border-stone-100">
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="font-bold text-[#111111]">
                                            {isBatter ? "Boundary Percentage" : "Boundary Conceded Rate"}
                                        </span>
                                        <span className={`font-black ${secDelta >= 0 ? "text-[#4A6615]" : "text-stone-700"}`}>
                                            {secDelta > 0 ? "+" : ""}{secDelta.toFixed(1)}%
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-mono text-[#70746D]">
                                            <span>NORMAL</span>
                                            <span className="font-bold text-[#111111]">{secNormal.toFixed(1)}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-stone-500 transition-all duration-500"
                                                style={{ width: `${secNormalPct}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-1">
                                        <div className="flex justify-between text-[10px] font-mono text-[#4A6615] font-bold">
                                            <span>PRESSURE</span>
                                            <span>{secPressure.toFixed(1)}%</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-stone-200 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-[#B7F34A] transition-all duration-500"
                                                style={{ width: `${secPressurePct}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RR 2027 Scouting Projection */}
                            <div className="p-4 rounded-xl bg-white border border-[#DCDDD5] space-y-2 shadow-2xs">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                                        <Crosshair className="w-3.5 h-3.5 text-[#24468C]" />
                                        <span>RR 2027 TACTICAL ROLE</span>
                                    </div>
                                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                                        SCOUTING VIEW
                                    </span>
                                </div>

                                <div className="text-xs font-bold text-[#111111]">
                                    {intelligence.rrFit.squadRole}
                                </div>
                                <p className="text-[11px] text-[#70746D] leading-relaxed">
                                    {intelligence.rrFit.strategicUtility}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
