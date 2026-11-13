import { Activity, Database, Flame, Shield } from "lucide-react";

export default function DashboardHeader() {
    return (
        <section className="space-y-4 pt-3 pb-2 border-b border-[#DCDDD5]">
            {/* Header copy */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-[#DCDDD5] bg-white shadow-2xs font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B7F34A] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#70746D]">
                            PRESSURE INTELLIGENCE · 2022–2026
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111]">
                        Pressure Performance
                    </h1>

                    <p className="text-xs sm:text-sm text-[#70746D] font-normal leading-relaxed">
                        Identifying players who improve their performance when the game is under pressure.
                        Empirical evaluation across resource-depletion match states (≤5 wickets in hand or death overs with ≤7 wickets).
                    </p>
                </div>
            </div>

            {/* Compact Dataset Stats (Compact metric cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-white border border-[#DCDDD5] shadow-2xs">
                    <div className="flex items-center gap-1.5 text-stone-400 mb-0.5">
                        <Activity className="w-3.5 h-3.5 text-[#5B8813]" />
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#70746D] font-mono">
                            Volume
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#111111] font-mono tracking-tight">
                        200,999
                    </div>
                    <span className="text-[11px] text-[#70746D] font-medium">
                        Deliveries
                    </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#DCDDD5] shadow-2xs">
                    <div className="flex items-center gap-1.5 text-stone-400 mb-0.5">
                        <Database className="w-3.5 h-3.5 text-stone-600" />
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#70746D] font-mono">
                            Matches
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#111111] font-mono tracking-tight">
                        883
                    </div>
                    <span className="text-[11px] text-[#70746D] font-medium">
                        Matches
                    </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#DCDDD5] shadow-2xs">
                    <div className="flex items-center gap-1.5 text-stone-400 mb-0.5">
                        <Shield className="w-3.5 h-3.5 text-stone-600" />
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#70746D] font-mono">
                            Competitions
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#111111] font-mono tracking-tight">
                        141
                    </div>
                    <span className="text-[11px] text-[#70746D] font-medium">
                        Competitions
                    </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#DCDDD5] shadow-2xs">
                    <div className="flex items-center gap-1.5 text-stone-400 mb-0.5">
                        <Flame className="w-3.5 h-3.5 text-[#5B8813]" />
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#70746D] font-mono">
                            Windows
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#111111] font-mono tracking-tight">
                        IPL + T20I
                    </div>
                    <span className="text-[11px] text-[#70746D] font-medium">
                        2022–2026
                    </span>
                </div>
            </div>
        </section>
    );
}

