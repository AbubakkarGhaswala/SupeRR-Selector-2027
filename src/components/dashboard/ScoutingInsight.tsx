"use client";

import type { BoardPlayer, Batter, Bowler } from "@/types/player";
import { getPlayerIntelligence } from "@/lib/intelligence";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ScoutingInsightProps {
    player: BoardPlayer;
    batter?: Batter;
    bowler?: Bowler;
}

export default function ScoutingInsight({
    player,
    batter,
    bowler,
}: ScoutingInsightProps) {
    const intelligence = getPlayerIntelligence(player, batter, bowler);
    const isBatter = player.type === "batter";
    const rankStr = player.rank.toString().padStart(2, "0");

    // Dynamic concise scouting rationale generated from actual CSV numbers
    const dynamicRationale = isBatter && batter
        ? `${player.name} ranks #${rankStr} because his pressure strike rate elevates from ${batter.strike_rate_normal.toFixed(1)} to ${batter.strike_rate_pressure.toFixed(1)} (+${batter.strike_rate_change.toFixed(1)} SR) under resource strain, while boundary percentage surges to ${batter.boundary_percentage_pressure.toFixed(1)}% across ${batter.balls_faced_pressure.toFixed(0)} balls (reliability: ${batter.reliability_factor.toFixed(2)}).`
        : bowler
        ? `${player.name} ranks #${rankStr} because his pressure wicket rate surges from ${bowler.wicket_rate_normal.toFixed(2)} to ${bowler.wicket_rate_pressure.toFixed(2)} (+${bowler.wicket_rate_change.toFixed(2)} wickets per 100 deliveries) in crunch phases, while suppressing boundary concession to ${bowler.boundary_rate_pressure.toFixed(1)}% across ${bowler.deliveries_pressure.toFixed(0)} deliveries (reliability: ${bowler.reliability_factor.toFixed(2)}).`
        : intelligence.whySelected.improvement;

    return (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#68842E]" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                        WHY THIS PLAYER?
                    </h4>
                </div>
                <span className="text-[10px] font-mono text-stone-400">
                    SCOUTING INSIGHT · RANK #{rankStr}
                </span>
            </div>

            {/* Core Rationale Sentence */}
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium bg-[#FBFDF8] p-3 rounded-xl border border-[#E2ECCB]">
                {dynamicRationale}
            </p>

            {/* Supporting Evidence List */}
            <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                    EMPIRICAL SELECTION EVIDENCE
                </span>

                <ul className="space-y-1.5 text-xs text-stone-600">
                    {intelligence.whySelected.evidence.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#55731D] shrink-0 mt-0.5" />
                            <span className="leading-tight">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Reliability & Limitation Context */}
            <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500 font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-stone-600">
                    <AlertCircle className="w-3 h-3 text-stone-400 shrink-0" />
                    <span>
                        Sample reliability weight: <strong>{player.reliability.toFixed(2)}</strong> ({player.sampleSize} {isBatter ? "pressure balls" : "deliveries"})
                    </span>
                </div>
                <p className="text-stone-400 pl-4.5">
                    Evaluated under experimental resource-pressure proxy definition (≤5 wickets or death overs with ≤7 wickets).
                </p>
            </div>
        </div>
    );
}

