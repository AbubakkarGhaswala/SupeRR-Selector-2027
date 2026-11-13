import Link from "next/link";
import { ArrowDown, Database, Activity, Flame, Shield } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="page-header pt-10 pb-14 border-b border-stone-200/90">
            <div className="max-w-4xl space-y-6">
                {/* Eyebrow badge */}
                <div className="eyebrow inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white/80 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#68842E] animate-pulse" />
                    <span className="text-[11px] font-bold tracking-widest uppercase text-stone-700 font-mono">
                        CRICKET SCOUTING WEBSITE · SEASON 02
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-stone-900 leading-[1.08]">
                    Pressure changes <br />
                    <span className="text-[#68842E]">everything.</span>
                </h1>

                {/* Subtitle */}
                <p className="header-description text-lg sm:text-xl text-stone-600 font-normal max-w-2xl leading-relaxed">
                    Identifying the players who deliver when the game is on the line.
                    A rigorous empirical evaluation of cricket performance under resource depletion.
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                        href="/#batters"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-stone-50 text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                    >
                        <span>Top 10 Batters</span>
                        <ArrowDown className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                        href="/#bowlers"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 transition-colors shadow-2xs"
                    >
                        <span>Top 10 Bowlers</span>
                        <ArrowDown className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                        href="/methodology"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#527018] hover:text-[#3B520F] hover:bg-[#F2F6E9] transition-colors"
                    >
                        <span>Read Methodology & Limitations →</span>
                    </Link>
                </div>
            </div>

            {/* Dataset Information Strip */}
            <div className="mt-12 pt-8 border-t border-stone-200/80">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-4 font-mono">
                    VERIFIED RESEARCH DATASET · 2022–2026
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                    {/* Stat 1 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                            <Activity className="w-3.5 h-3.5 text-[#68842E]" />
                            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 font-mono">
                                Scope
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tracking-tight">
                            200,999
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                            deliveries analysed
                        </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                            <Database className="w-3.5 h-3.5 text-stone-600" />
                            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 font-mono">
                                Matches
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tracking-tight">
                            883
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                            matches catalogued
                        </p>
                    </div>

                    {/* Stat 3 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                            <Shield className="w-3.5 h-3.5 text-stone-600" />
                            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 font-mono">
                                Leagues
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tracking-tight">
                            141
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                            competitions audited
                        </p>
                    </div>

                    {/* Stat 4 */}
                    <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                        <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                            <Flame className="w-3.5 h-3.5 text-[#68842E]" />
                            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 font-mono">
                                Windows
                            </span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono tracking-tight">
                            IPL & T20I
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                            2022–2026 windows
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
