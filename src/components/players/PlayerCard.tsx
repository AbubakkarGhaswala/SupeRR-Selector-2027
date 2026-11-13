"use client";

import type { BoardPlayer } from "@/types/player";
import PlayerImage from "./PlayerImage";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PlayerCardProps {
    player: BoardPlayer;
    isSelected: boolean;
    isAnySelected?: boolean;
    onSelect: (player: BoardPlayer) => void;
}

export default function PlayerCard({
    player,
    isSelected,
    isAnySelected = false,
    onSelect,
}: PlayerCardProps) {
    const isBatter = player.type === "batter";
    const rankStr = player.rank.toString().padStart(2, "0");

    // Dynamic role subtitle based on player
    const roleSubtitle = isBatter
        ? player.rank <= 3
            ? "Batter · Finisher"
            : player.rank <= 6
            ? "Batter · Anchor / Power"
            : "Batter · Middle Order"
        : player.rank <= 3
        ? "Bowler · Pace / Wrist"
        : player.rank <= 6
        ? "Bowler · Seam / Strike"
        : "Bowler · Spin Control";

    const compColor =
        player.competition === "IPL"
            ? "bg-blue-50 text-blue-800 border-blue-200"
            : "bg-emerald-50 text-emerald-800 border-emerald-200";

    return (
        <motion.div
            layout
            onClick={() => onSelect(player)}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
            whileTap={{ scale: 0.98 }}
            className={`group relative text-left rounded-2xl cursor-pointer flex flex-col justify-between border transition-all duration-300 overflow-hidden ${
                isSelected
                    ? "bg-[#FFFFFF] border-stone-900 ring-2 ring-[#B7F34A] shadow-lg z-10 scale-[1.01]"
                    : isAnySelected
                    ? "bg-[#FFFFFF] border-[#DCDDD5] hover:border-stone-400 opacity-90 hover:opacity-100 shadow-2xs hover:shadow-md"
                    : "bg-[#FFFFFF] border-[#DCDDD5] hover:border-stone-400 shadow-2xs hover:shadow-md"
            }`}
        >
            {/* Top Bar: Rank & Competition */}
            <div className="p-3 pb-2 flex items-center justify-between border-b border-stone-100 bg-[#FAFAF7]">
                <div className="flex items-baseline gap-1.5 font-mono">
                    <span
                        className={`text-2xl sm:text-3xl font-black tracking-tighter transition-colors ${
                            isSelected
                                ? "text-[#5B8813] font-black"
                                : "text-[#111111] group-hover:text-black"
                        }`}
                    >
                        {rankStr}
                    </span>
                    <span className="text-[9px] font-bold uppercase text-[#70746D]">
                        RANK
                    </span>
                </div>

                <div className="flex items-center gap-1.5">
                    <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${compColor}`}
                    >
                        {player.competition}
                    </span>

                    {isSelected && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#151515] text-[#B7F34A] text-[9px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B7F34A] animate-pulse" />
                            ACTIVE
                        </span>
                    )}
                </div>
            </div>

            {/* Controlled Player Photograph Container (aspect ratio 4:5) */}
            <div className="p-2.5 pb-1">
                <PlayerImage
                    slug={player.slug}
                    name={player.name}
                    rank={player.rank}
                    competition={player.competition}
                    variant="card"
                />
            </div>

            {/* Card Content & Metrics */}
            <div className="p-3 pt-1.5 flex-1 flex flex-col justify-between space-y-2.5">
                {/* Name & Role */}
                <div>
                    <h3 className="text-sm font-extrabold text-[#111111] line-clamp-1 tracking-tight group-hover:text-black">
                        {player.name}
                    </h3>
                    <p className="text-[10px] text-[#70746D] font-mono font-medium mt-0.5">
                        {roleSubtitle}
                    </p>
                    <div className="flex items-center justify-between text-[9px] text-[#70746D] font-mono mt-1 pt-1 border-t border-stone-100">
                        <span>{player.pressureMatches} pressure matches</span>
                        <span>{player.sampleSize} {isBatter ? "balls" : "deliv"}</span>
                    </div>
                </div>

                {/* Analytical Numbers Grid */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-stone-100 font-mono">
                    {/* Score */}
                    <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-200/80">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-[#70746D] block">
                            SCORE
                        </span>
                        <div className="text-sm font-black text-[#111111] leading-none mt-0.5">
                            {player.adjustedScore.toFixed(1)}
                            <span className="text-[8px] text-[#70746D] font-normal"> /100</span>
                        </div>
                    </div>

                    {/* Main Pressure Metric */}
                    <div className="p-1.5 rounded-lg bg-[#F8FAF2] border border-[#DEE8C5]">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-[#4A6615] block">
                            {isBatter ? "PRESSURE SR" : "P-WKT RATE"}
                        </span>
                        <div className="text-sm font-black text-[#384F0E] leading-none mt-0.5">
                            {isBatter
                                ? player.pressureMetric.toFixed(1)
                                : player.pressureMetric.toFixed(2)}
                        </div>
                    </div>
                </div>

                {/* Footer: Reliability & Action Cue */}
                <div className="pt-1 flex items-center justify-between text-[10px] text-[#70746D] font-mono border-t border-stone-100">
                    <span>
                        REL. <strong className="text-[#111111] font-bold">{player.reliability.toFixed(2)}</strong>
                    </span>

                    <span
                        className={`inline-flex items-center gap-0.5 text-xs font-bold transition-colors ${
                            isSelected ? "text-[#4A6615]" : "text-[#70746D] group-hover:text-[#111111]"
                        }`}
                    >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

