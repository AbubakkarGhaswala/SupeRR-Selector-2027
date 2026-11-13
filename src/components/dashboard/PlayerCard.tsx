"use client";

import type { BoardPlayer } from "@/types/player";
import PlayerImage from "@/components/scouting/PlayerImage";
import { ArrowUpRight } from "lucide-react";

interface PlayerCardProps {
    player: BoardPlayer;
    isSelected: boolean;
    onSelect: (player: BoardPlayer) => void;
}

export default function PlayerCard({
    player,
    isSelected,
    onSelect,
}: PlayerCardProps) {
    const rankStr = player.rank.toString().padStart(2, "0");
    const isBatter = player.type === "batter";

    const compColor =
        player.competition === "IPL"
            ? "bg-blue-50 text-blue-800 border-blue-200"
            : "bg-emerald-50 text-emerald-800 border-emerald-200";

    const deltaSign = player.metricChange > 0 ? "+" : "";
    const deltaDisplay = isBatter
        ? `${deltaSign}${player.metricChange.toFixed(1)} SR`
        : `${deltaSign}${player.metricChange.toFixed(2)} Wkt/100b`;

    return (
        <div
            onClick={() => onSelect(player)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(player);
                }
            }}
            className={`group relative text-left rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between border ${
                isSelected
                    ? "bg-[#F7F9F2] border-[#68842E] ring-2 ring-[#68842E]/70 shadow-md -translate-y-1"
                    : "bg-white border-stone-200/90 hover:border-stone-400/80 hover:shadow-md hover:-translate-y-0.5"
            }`}
        >
            {/* Top Bar: Rank & Selected Indicator */}
            <div className="p-3 pb-2 flex items-center justify-between border-b border-stone-100 bg-white/60">
                <div className="flex items-baseline gap-1.5 font-mono">
                    <span
                        className={`text-2xl sm:text-3xl font-black tracking-tighter ${
                            isSelected
                                ? "text-[#55731D]"
                                : "text-stone-900 group-hover:text-stone-950"
                        }`}
                    >
                        {rankStr}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-stone-400">
                        RANK
                    </span>
                </div>

                <div className="flex items-center gap-1.5">
                    <span
                        className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border font-mono ${compColor}`}
                    >
                        {player.competition}
                    </span>

                    {isSelected && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EBF2DB] text-[#4F6D18] text-[9px] font-bold uppercase tracking-wider font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#68842E] animate-pulse" />
                            SELECTED
                        </span>
                    )}
                </div>
            </div>

            {/* Controlled Player Photograph Container (aspect ratio 4:5) */}
            <div className="relative px-3 pt-2">
                <div className="relative rounded-xl overflow-hidden border border-stone-200/80 bg-[#1A1D20] shadow-2xs aspect-[4/5] w-full">
                    <PlayerImage
                        src={player.image}
                        alt={player.name}
                        name={player.name}
                        rank={player.rank}
                        aspectRatio="portrait"
                        className="w-full h-full object-cover object-top"
                    />

                    {/* Quick Role pill overlay */}
                    <div className="absolute bottom-2 left-2 z-10 px-2 py-0.5 rounded-md bg-stone-950/85 backdrop-blur-xs text-[9px] font-mono font-bold uppercase tracking-wider text-stone-200 border border-stone-800">
                        {player.type.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Card Content & Metrics */}
            <div className="p-3 pt-2.5 flex-1 flex flex-col justify-between space-y-3">
                {/* Player Name */}
                <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-stone-950 line-clamp-1 tracking-tight group-hover:text-[#4F6D18] transition-colors">
                        {player.name}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono mt-0.5">
                        <span>{player.pressureMatches} pressure matches</span>
                        <span>{player.sampleSize} {isBatter ? "balls" : "deliveries"}</span>
                    </div>
                </div>

                {/* Scouting Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
                    {/* Pressure Score */}
                    <div className="p-1.5 rounded-lg bg-stone-50/90 border border-stone-150">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-stone-400 block font-mono">
                            Score
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-base font-black text-stone-900 font-mono leading-none">
                                {player.adjustedScore.toFixed(1)}
                            </span>
                            <span className="text-[9px] text-stone-400 font-mono">
                                /100
                            </span>
                        </div>
                    </div>

                    {/* Primary Performance Delta */}
                    <div className="p-1.5 rounded-lg bg-[#F5F8ED] border border-[#DEE9C4]">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#4A6315] block font-mono">
                            {isBatter ? "SR Change" : "Wkt Rate Delta"}
                        </span>
                        <div className="text-base font-black text-[#3E5511] font-mono leading-none mt-0.5">
                            {deltaDisplay}
                        </div>
                    </div>
                </div>

                {/* Card Footer: Reliability & Action Cue */}
                <div className="pt-1 flex items-center justify-between text-[10px] text-stone-400 font-mono border-t border-stone-100">
                    <span className="text-stone-500">
                        Rel: <strong className="text-stone-800 font-bold">{player.reliability.toFixed(2)}</strong>
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[#55731D] font-bold group-hover:underline">
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </div>
    );
}

