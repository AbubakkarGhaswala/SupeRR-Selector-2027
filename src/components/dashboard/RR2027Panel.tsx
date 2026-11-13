"use client";

import type { BoardPlayer, Batter, Bowler } from "@/types/player";
import { getPlayerIntelligence } from "@/lib/intelligence";
import { ShieldCheck, Crosshair, ArrowRight } from "lucide-react";
import Link from "next/link";

interface RR2027PanelProps {
    player: BoardPlayer;
    batter?: Batter;
    bowler?: Bowler;
}

export default function RR2027Panel({
    player,
    batter,
    bowler,
}: RR2027PanelProps) {
    const intelligence = getPlayerIntelligence(player, batter, bowler);
    const { rrFit } = intelligence;

    return (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FCFCF9] border border-stone-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#24468C] text-white flex items-center justify-center font-bold text-[10px] font-mono">
                        RR
                    </div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                        RR 2027 SCOUTING VIEW
                    </h4>
                </div>

                <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    ANALYTICAL PROJECTION
                </span>
            </div>

            {/* Tactical Squad Role */}
            <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 block">
                    PROJECTED SQUAD ROLE
                </span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm font-extrabold text-stone-900 shadow-2xs">
                    <Crosshair className="w-3.5 h-3.5 text-[#24468C]" />
                    <span>{rrFit.squadRole}</span>
                </div>
            </div>

            {/* Strategic Utility Narrative */}
            <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200/80">
                {rrFit.strategicUtility}
            </p>

            {/* Tactical Strengths & Trade-offs */}
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
                {/* Strengths */}
                <div className="p-3 rounded-xl bg-white border border-stone-200/70 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4A6315] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        TACTICAL STRENGTHS
                    </span>
                    <ul className="space-y-1 text-[11px] text-stone-600">
                        {rrFit.strengths.slice(0, 3).map((s, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[#68842E] font-bold mt-[-1px]">•</span>
                                <span className="leading-tight">{s}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Considerations / Weaknesses */}
                <div className="p-3 rounded-xl bg-white border border-stone-200/70 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                        TACTICAL CONSIDERATIONS
                    </span>
                    <ul className="space-y-1 text-[11px] text-stone-500">
                        {rrFit.weaknesses.slice(0, 2).map((w, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-stone-400 font-bold mt-[-1px]">•</span>
                                <span className="leading-tight">{w}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Action to Full Profile */}
            <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                <span className="text-[10px] text-stone-400 font-mono">
                    Independent analytical assessment; not affiliated with RR franchise.
                </span>

                <Link
                    href={`/players/${player.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-[#4F6D18] transition-colors"
                >
                    <span>Inspect Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </div>
    );
}

