import Link from "next/link";
import type { BoardPlayer } from "@/types/player";
import PlayerImage from "./PlayerImage";
import MetricComparisonBar from "./MetricComparisonBar";
import { ArrowUpRight } from "lucide-react";

interface PlayerCardProps {
    player: BoardPlayer;
    variant?: "featured" | "grid";
    priority?: boolean;
}

export default function PlayerCard({
    player,
    variant = "grid",
    priority = false,
}: PlayerCardProps) {
    const rankStr = player.rank.toString().padStart(2, "0");
    const isBatter = player.type === "batter";
    const compColor = player.competition === "IPL"
        ? "bg-blue-50 text-blue-800 border-blue-200/60"
        : "bg-emerald-50 text-emerald-800 border-emerald-200/60";

    const href = `/players/${player.slug}`;

    if (variant === "featured") {
        return (
            <Link
                href={href}
                className="player-card player-card-featured group block relative rounded-2xl border border-stone-200/90 bg-white shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 overflow-hidden"
            >
                <div className="grid md:grid-cols-12 items-stretch">
                    {/* Featured Image */}
                    <div className="md:col-span-5 relative overflow-hidden bg-[#1E2024]">
                        <PlayerImage
                            src={player.image}
                            alt={player.name}
                            name={player.name}
                            rank={player.rank}
                            aspectRatio="featured"
                            priority={priority}
                            className="h-full min-h-[380px] md:min-h-full"
                        />
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md bg-stone-900/90 text-[#C4DD7A] font-mono text-xs font-bold tracking-wider backdrop-blur-xs border border-stone-700/60">
                                RANK {rankStr}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#648028] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                                SELECTION LEAD
                            </span>
                        </div>
                    </div>

                    {/* Featured Content */}
                    <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase border ${compColor}`}>
                                    {player.competition}
                                </span>
                                <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                                    <span className="text-[10px] uppercase font-sans text-stone-400">
                                        Sample
                                    </span>
                                    <span className="font-semibold text-stone-800">
                                        {player.sampleSize.toLocaleString()} {isBatter ? "balls" : "deliveries"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 group-hover:text-[#55731D] transition-colors duration-200">
                                    {player.name}
                                </h3>
                                <p className="text-xs uppercase tracking-widest text-stone-600 font-bold mt-1">
                                    {isBatter ? "Specialist Finisher & Accelerator" : "Premier Pressure Bowler"}
                                </p>
                            </div>

                            {/* Adjusted Score Highlight */}
                            <div className="flex items-baseline gap-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-stone-200/70">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                                        Format-Adjusted Score
                                    </span>
                                    <div className="flex items-baseline gap-1 mt-0.5">
                                        <span className="text-3xl font-black text-stone-900 font-mono">
                                            {player.adjustedScore.toFixed(1)}
                                        </span>
                                        <span className="text-xs text-stone-600 font-mono">/ 100</span>
                                    </div>
                                </div>
                                <div className="pl-4 border-l border-stone-200/80">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                                        Reliability Weight
                                    </span>
                                    <span className="text-sm font-bold text-[#55731D] font-mono mt-0.5 block">
                                        {player.reliability >= 0.999 ? "1.00 (Benchmark Met)" : `${player.reliability.toFixed(2)} Adjusted`}
                                    </span>
                                </div>
                            </div>

                            {/* Comparison Bar */}
                            <div className="pt-2">
                                <MetricComparisonBar
                                    label={player.primaryMetricLabel}
                                    normalValue={player.normalMetric}
                                    pressureValue={player.pressureMetric}
                                    unit={isBatter ? " SR" : " wkts/100"}
                                    formatDecimals={isBatter ? 1 : 2}
                                />
                            </div>
                        </div>

                        {/* Card Footer Call to Action */}
                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#55731D]">
                            <span className="flex items-center gap-1 group-hover:underline">
                                Inspect Full Scouting Report
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                            <span className="text-[10px] uppercase tracking-wider font-mono text-stone-500">
                                {player.pressureMatches} Pressure Matches
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Grid Card Variant (Ranks 02 - 10)
    return (
        <Link
            href={href}
            className="player-card player-card-grid group flex flex-col justify-between rounded-xl border border-stone-200/85 bg-white shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 overflow-hidden"
        >
            {/* Image & Rank Badge */}
            <div className="relative overflow-hidden bg-[#1E2024]">
                <PlayerImage
                    src={player.image}
                    alt={player.name}
                    name={player.name}
                    rank={player.rank}
                    aspectRatio="portrait"
                    priority={priority}
                />
                
                {/* Ranking Tag */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-stone-900/90 text-stone-100 font-mono text-xs font-bold tracking-wider backdrop-blur-xs border border-stone-700/60">
                        {rankStr}
                    </span>
                </div>

                {/* Competition Tag */}
                <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-xs ${compColor}`}>
                        {player.competition}
                    </span>
                </div>

                {/* Score Pill Overlay */}
                <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded-md bg-stone-900/80 backdrop-blur-xs text-stone-100 text-right">
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 block -mb-0.5">
                        Score
                    </span>
                    <span className="text-xs font-bold font-mono text-[#C4DD7A]">
                        {player.adjustedScore.toFixed(1)}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                    <div>
                        <h4 className="text-base font-bold text-stone-900 tracking-tight group-hover:text-[#55731D] transition-colors duration-200 line-clamp-1">
                            {player.name}
                        </h4>
                        <span className="text-[11px] text-stone-500 font-mono">
                            {player.sampleSize.toLocaleString()} {isBatter ? "balls" : "deliveries"} · Rel: {player.reliability.toFixed(2)}
                        </span>
                    </div>

                    {/* Comparison Bar */}
                    <MetricComparisonBar
                        label={isBatter ? "Strike Rate" : "Wicket Rate"}
                        normalValue={player.normalMetric}
                        pressureValue={player.pressureMetric}
                        unit={isBatter ? "" : " /100"}
                        formatDecimals={isBatter ? 1 : 2}
                        compact
                    />
                </div>

                {/* Card CTA */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-stone-600 group-hover:text-[#55731D] transition-colors">
                    <span>View Scouting Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#6B8E23]" />
                </div>
            </div>
        </Link>
    );
}

