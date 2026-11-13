import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-24 border-t border-stone-200/90 bg-[#F4F3EE] text-stone-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Brand column */}
                    <div className="md:col-span-5 space-y-3">
                        <Link
                            href="/"
                            className="text-2xl font-black tracking-tighter text-stone-950 flex items-baseline"
                        >
                            <span>SupeRR</span>
                            <span className="text-[#68842E]">.</span>
                        </Link>
                        <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
                            Cricket pressure-performance intelligence and player scouting platform.
                            Empirical ball-by-ball analysis identifying high-leverage match winners.
                        </p>
                        <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-bold block">
                            SEASON 02 · 2027 CAMPAIGN
                        </span>
                    </div>

                    {/* Navigation column */}
                    <div className="md:col-span-3 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 font-mono block mb-2">
                            Dashboard Navigation
                        </span>
                        <ul className="space-y-1.5 text-xs">
                            <li>
                                <Link href="/" className="hover:text-stone-900 transition-colors">
                                    Overview & Player Rankings
                                </Link>
                            </li>
                            <li>
                                <Link href="/#player-ranking-section" className="hover:text-stone-900 transition-colors">
                                    Top 10 Pressure Batters
                                </Link>
                            </li>
                            <li>
                                <Link href="/#player-ranking-section" className="hover:text-stone-900 transition-colors">
                                    Top 10 Pressure Bowlers
                                </Link>
                            </li>
                            <li>
                                <Link href="/methodology" className="hover:text-stone-900 transition-colors">
                                    Methodology & Architecture
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Disclaimer column */}
                    <div className="md:col-span-4 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 font-mono block mb-2">
                            Analytical Disclaimer
                        </span>
                        <p className="text-[11px] text-stone-500 leading-relaxed">
                            This platform provides empirical research using an experimental resource-pressure
                            proxy (≤5 wickets or death overs with ≤7 wickets). IPL and T20I adjusted scores
                            are format-specific and cannot be combined linearly. This is an analytical
                            research tool and is not an official Rajasthan Royals release.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-mono">
                    <span>
                        SUPERR SELECTOR · CRICKET PERFORMANCE RESEARCH
                    </span>
                    <span>
                        200,999 DELIVERIES · 883 MATCHES · 2022–2026
                    </span>
                </div>
            </div>
        </footer>
    );
}
