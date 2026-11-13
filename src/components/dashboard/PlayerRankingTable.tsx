"use client";

import type { BoardPlayer, Batter, Bowler } from "@/types/player";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PlayerRankingTableProps {
    players: BoardPlayer[];
    selectedPlayer: BoardPlayer;
    onSelectPlayer: (player: BoardPlayer) => void;
    batters?: Batter[];
    bowlers?: Bowler[];
}

export default function PlayerRankingTable({
    players,
    selectedPlayer,
    onSelectPlayer,
}: PlayerRankingTableProps) {
    const isBatter = selectedPlayer.type === "batter";

    return (
        <div className="rounded-2xl bg-white border border-[#DCDDD5] shadow-2xs overflow-hidden space-y-0">
            {/* Table Header / Title */}
            <div className="p-4 sm:p-5 border-b border-[#DCDDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#70746D]">
                        OFFICIAL LEADERBOARD
                    </h3>
                    <span className="text-base font-extrabold text-[#111111]">
                        {isBatter ? "Top 10 Pressure Batters" : "Top 10 Pressure Bowlers"}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-[#70746D]">
                    <span>Click any row to select & inspect</span>
                </div>
            </div>

            {/* Scrollable Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                        <tr className="border-b border-stone-200 bg-stone-50/80 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            <th className="py-3 px-3 sm:px-4 text-center w-12">Rank</th>
                            <th className="py-3 px-3 sm:px-4">Player</th>
                            <th className="py-3 px-2 sm:px-3 text-center">Comp</th>
                            <th className="py-3 px-2 sm:px-3 text-right">P-Matches</th>
                            <th className="py-3 px-2 sm:px-3 text-right">
                                {isBatter ? "P-Balls" : "P-Deliveries"}
                            </th>
                            <th className="py-3 px-2 sm:px-3 text-right">
                                {isBatter ? "Normal SR" : "Normal Wkt Rate"}
                            </th>
                            <th className="py-3 px-2 sm:px-3 text-right">
                                {isBatter ? "Pressure SR" : "Pressure Wkt Rate"}
                            </th>
                            <th className="py-3 px-2 sm:px-3 text-right">
                                {isBatter ? "SR Change" : "Wkt Rate Change"}
                            </th>
                            <th className="py-3 px-2 sm:px-3 text-right">Reliability</th>
                            <th className="py-3 px-3 sm:px-4 text-right">Score</th>
                            <th className="py-3 px-3 text-center">Profile</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {players.map((p) => {
                            const isSelected = p.slug === selectedPlayer.slug;
                            const rankStr = p.rank.toString().padStart(2, "0");
                            const deltaSign = p.metricChange > 0 ? "+" : "";

                            const deltaStr = isBatter
                                ? `${deltaSign}${p.metricChange.toFixed(1)}`
                                : `${deltaSign}${p.metricChange.toFixed(2)}`;

                            const normalStr = isBatter
                                ? p.normalMetric.toFixed(1)
                                : p.normalMetric.toFixed(2);

                            const pressureStr = isBatter
                                ? p.pressureMetric.toFixed(1)
                                : p.pressureMetric.toFixed(2);

                            const compColor =
                                p.competition === "IPL"
                                    ? "bg-blue-50 text-blue-800 border-blue-200"
                                    : "bg-emerald-50 text-emerald-800 border-emerald-200";

                            return (
                                <tr
                                    key={p.id}
                                    onClick={() => onSelectPlayer(p)}
                                    className={`cursor-pointer transition-colors ${
                                        isSelected
                                            ? "bg-[#F8FAF2] text-stone-950 font-bold"
                                            : "hover:bg-stone-50 text-stone-700"
                                    }`}
                                >
                                    {/* Rank */}
                                    <td className="py-3.5 px-3 sm:px-4 text-center">
                                        <span
                                            className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-black text-xs ${
                                                isSelected
                                                    ? "bg-[#151515] text-[#B7F34A]"
                                                    : "bg-stone-100 text-stone-700"
                                            }`}
                                        >
                                            {rankStr}
                                        </span>
                                    </td>

                                    {/* Player Name */}
                                    <td className="py-3.5 px-3 sm:px-4 font-sans font-bold text-stone-900 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span>{p.name}</span>
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#B7F34A]" />
                                            )}
                                        </div>
                                    </td>

                                    {/* Competition */}
                                    <td className="py-3.5 px-2 sm:px-3 text-center whitespace-nowrap">
                                        <span
                                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${compColor}`}
                                        >
                                            {p.competition}
                                        </span>
                                    </td>

                                    {/* Pressure Matches */}
                                    <td className="py-3.5 px-2 sm:px-3 text-right text-stone-600">
                                        {p.pressureMatches}
                                    </td>

                                    {/* Pressure Balls / Deliveries */}
                                    <td className="py-3.5 px-2 sm:px-3 text-right text-stone-600">
                                        {p.sampleSize}
                                    </td>

                                    {/* Normal Metric */}
                                    <td className="py-3.5 px-2 sm:px-3 text-right text-stone-600">
                                        {normalStr}
                                    </td>

                                    {/* Pressure Metric */}
                                    <td className="py-3.5 px-2 sm:px-3 text-right font-black text-[#445D14]">
                                        {pressureStr}
                                    </td>

                                    {/* Change */}
                                    <td className="py-3.5 px-2 sm:px-3 text-right font-bold text-[#3E5511]">
                                        {deltaStr}
                                    </td>

                                    {/* Reliability */}
                                    <td className="py-3.5 px-2 sm:px-3 text-right text-stone-600">
                                        {p.reliability.toFixed(2)}
                                    </td>

                                    {/* Score */}
                                    <td className="py-3.5 px-3 sm:px-4 text-right font-black text-stone-950">
                                        {p.adjustedScore.toFixed(1)}
                                    </td>

                                    {/* Profile Action */}
                                    <td
                                        className="py-3.5 px-3 text-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Link
                                            href={`/players/${p.slug}`}
                                            className="inline-flex items-center justify-center p-1 rounded-md text-stone-400 hover:text-stone-950 hover:bg-stone-200/60 transition-colors"
                                            title={`Open ${p.name}'s dedicated profile`}
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="p-3 bg-stone-50 border-t border-stone-200/80 text-[10px] text-stone-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>
                    {isBatter
                        ? "Strike Rate = (Runs / Balls) × 100"
                        : "Wicket Rate = (Wickets / Deliveries) × 100 (event rate proxy)"}
                </span>
                <span>
                    Neutral-50 shrinkage applied for samples under 300 deliveries
                </span>
            </div>
        </div>
    );
}

