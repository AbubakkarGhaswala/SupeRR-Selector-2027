"use client";

import type { PlayerType } from "@/types/player";

interface PlayerTypeSwitcherProps {
    activeType: PlayerType;
    onTypeChange: (type: PlayerType) => void;
    batterCount?: number;
    bowlerCount?: number;
}

export default function PlayerTypeSwitcher({
    activeType,
    onTypeChange,
    batterCount = 10,
    bowlerCount = 10,
}: PlayerTypeSwitcherProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                        RANKED COHORT
                    </span>
                    <span className="text-stone-300">/</span>
                    <span className="text-xs font-semibold text-stone-800">
                        {activeType === "batter"
                            ? `Top ${batterCount} Pressure Batters (IPL & T20I)`
                            : `Top ${bowlerCount} Pressure Bowlers (IPL & T20I)`}
                    </span>
                </div>
            </div>

            {/* Segmented Control */}
            <div className="inline-flex p-1 rounded-xl bg-stone-200/80 border border-[#DCDDD5] shadow-inner">
                <button
                    type="button"
                    onClick={() => onTypeChange("batter")}
                    className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        activeType === "batter"
                            ? "bg-[#151515] text-[#B7F34A] shadow-sm border border-stone-800 font-mono"
                            : "text-[#70746D] hover:text-[#111111] font-mono"
                    }`}
                >
                    BATTERS ({batterCount})
                </button>
                <button
                    type="button"
                    onClick={() => onTypeChange("bowler")}
                    className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        activeType === "bowler"
                            ? "bg-[#151515] text-[#B7F34A] shadow-sm border border-stone-800 font-mono"
                            : "text-[#70746D] hover:text-[#111111] font-mono"
                    }`}
                >
                    BOWLERS ({bowlerCount})
                </button>
            </div>
        </div>
    );
}

