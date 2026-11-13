import type { Metadata } from "next";
import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/layout/Footer";
import {
    Database,
    Flame,
    Calculator,
    ShieldAlert,
    CheckCircle2,
    ArrowLeft,
    Sliders,
    Scale,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Methodology & Analytical Architecture — SupeRR Selector",
    description:
        "Comprehensive empirical methodology, pressure definitions, scoring models, reliability adjustments, and analytical limitations for cricket pressure performance analytics.",
};

export default function MethodologyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F8F8F5] text-stone-900">
            <DashboardNav activeTab="methodology" />

            <main className="app-container flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
                {/* Header Back & Eyebrow */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Dashboard</span>
                    </Link>

                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white text-[11px] font-bold uppercase tracking-wider text-stone-700 font-mono">
                            METHODOLOGY PAGE · TECHNICAL SPECIFICATION
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950">
                            Pressure Analytics Methodology
                        </h1>
                        <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-3xl">
                            How we define, isolate, and quantify high-pressure cricket performance across
                            200,999 ball-by-ball events from the 2022–2026 IPL and T20I cycles.
                        </p>
                    </div>
                </div>

                {/* 1. Objective & Research Mandate */}
                <section className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-[#EFF5E4] text-[#55731D]">
                            <Scale className="w-5 h-5" />
                        </span>
                        <h2 className="text-xl font-bold tracking-tight text-stone-900">
                            1. Analytical Objective
                        </h2>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">
                        Conventional cricket analytics predominantly evaluate total run tallies, average economy
                        rates, or nominal strike rates across all match states. In high-stakes franchise cricket,
                        however, aggregate numbers frequently mask critical variance: players who feast on low-leverage
                        phases often falter when wickets collapse, while clutch performers elevate their execution
                        under severe resource strain.
                    </p>
                    <p className="text-sm text-stone-700 leading-relaxed font-medium">
                        The primary mandate of SupeRR Selector Season 2 is to identify batters and bowlers who
                        maintain or improve their performance under pressure relative to their own normal-performance
                        baseline.
                    </p>
                </section>

                {/* 2. Dataset Scope */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-stone-100 text-stone-700">
                            <Database className="w-5 h-5" />
                        </span>
                        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                            2. Dataset Scope & Verification
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                                Total Source Rows
                            </span>
                            <div className="text-2xl font-extrabold text-stone-900 font-mono mt-1">
                                200,999
                            </div>
                            <span className="text-xs text-stone-500">raw delivery entries</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                                Cleaned In-Scope
                            </span>
                            <div className="text-2xl font-extrabold text-stone-900 font-mono mt-1">
                                193,988
                            </div>
                            <span className="text-xs text-stone-500">innings 1 & 2 only</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                                IPL Deliveries
                            </span>
                            <div className="text-2xl font-extrabold text-[#3650B0] font-mono mt-1">
                                87,673
                            </div>
                            <span className="text-xs text-stone-500">Indian Premier League</span>
                        </div>
                        <div className="p-4 rounded-xl bg-white border border-stone-200/80">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                                T20I Deliveries
                            </span>
                            <div className="text-2xl font-extrabold text-[#24704B] font-mono mt-1">
                                106,315
                            </div>
                            <span className="text-xs text-stone-500">International T20s</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80 text-xs text-stone-600 leading-relaxed">
                        Data spans 883 matches across 141 tournament editions between 2022 and 2026. Only innings 1
                        and 2 are examined; Super Overs, training matches, and non-T20 formats are strictly excluded.
                    </div>
                </section>

                {/* 3. Pressure Definition */}
                <section className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-[#FFF4ED] text-[#D95D28]">
                            <Flame className="w-5 h-5" />
                        </span>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-mono">
                                OPERATIONAL PROXY
                            </span>
                            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                                3. Pressure V2 Definition
                            </h2>
                        </div>
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed">
                        Because raw match telemetry does not supply verified targets or required-run-rate calculations
                        for every delivery, pressure cannot be purely modeled via win-probability closeness. We therefore
                        deploy an empirical <strong>resource-pressure proxy</strong> that captures existential match
                        strain:
                    </p>

                    <div className="p-4 rounded-xl bg-[#FAF9F5] border-l-4 border-[#68842E] space-y-2 text-xs text-stone-800 font-mono">
                        <p className="font-bold text-stone-900 font-sans text-sm">
                            A delivery is designated as HIGH-PRESSURE when:
                        </p>
                        <div className="space-y-1.5 pl-2">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#68842E]" />
                                <span>Condition 1: Wickets Remaining ≤ 5 (wickets fallen ≥ 5); OR</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#68842E]" />
                                <span>Condition 2: Death Phase (Overs 16–20) AND Wickets Remaining ≤ 7 (wickets fallen ≥ 3).</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/70">
                            <span className="font-bold text-stone-800 block">Powerplay</span>
                            <span className="text-stone-500 font-mono">Overs 1 through 6</span>
                        </div>
                        <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/70">
                            <span className="font-bold text-stone-800 block">Middle Phase</span>
                            <span className="text-stone-500 font-mono">Overs 7 through 15</span>
                        </div>
                        <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/70">
                            <span className="font-bold text-stone-800 block">Death Phase</span>
                            <span className="text-stone-500 font-mono">Overs 16 onward</span>
                        </div>
                    </div>
                </section>

                {/* 4. Batting Model */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-[#EFF5E4] text-[#55731D]">
                            <Calculator className="w-5 h-5" />
                        </span>
                        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                            4. Batter Scoring Model & Metrics
                        </h2>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-4">
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#55731D] font-mono">
                                    50% MODEL WEIGHT
                                </span>
                                <h3 className="text-base font-bold text-stone-900 mt-1">
                                    Strike-Rate Improvement
                                </h3>
                                <p className="text-xs text-stone-600 mt-1">
                                    Percentile rank of (Pressure SR - Normal SR).
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#55731D] font-mono">
                                    25% MODEL WEIGHT
                                </span>
                                <h3 className="text-base font-bold text-stone-900 mt-1">
                                    Boundary Percentage Delta
                                </h3>
                                <p className="text-xs text-stone-600 mt-1">
                                    Percentile rank of increase in (Fours + Sixes) / Balls faced.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#55731D] font-mono">
                                    25% MODEL WEIGHT
                                </span>
                                <h3 className="text-base font-bold text-stone-900 mt-1">
                                    Dismissal Containment
                                </h3>
                                <p className="text-xs text-stone-600 mt-1">
                                    Percentile rank of striker dismissals per 100 balls. Lower increase is superior.
                                </p>
                            </div>
                        </div>

                        <div className="pt-2 space-y-1.5 text-xs text-stone-600">
                            <p><strong>Balls Faced:</strong> All recorded deliveries excluding wides.</p>
                            <p><strong>Striker Runs:</strong> Aggregate runs credited to striker off the bat.</p>
                            <p><strong>Non-Striker Dismissals:</strong> Run-outs of non-striker are strictly omitted from the striker&apos;s dismissal rate.</p>
                        </div>
                    </div>
                </section>

                {/* 5. Bowling Model */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-stone-100 text-stone-800">
                            <Calculator className="w-5 h-5" />
                        </span>
                        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                            5. Bowler Scoring Model & Rate Semantics
                        </h2>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#55731D] font-mono">
                                    60% MODEL WEIGHT
                                </span>
                                <h3 className="text-base font-bold text-stone-900 mt-1">
                                    Wicket Rate Improvement
                                </h3>
                                <p className="text-xs text-stone-600 mt-1">
                                    Creditable wickets per 100 recorded deliveries (Caught, Bowled, LBW, Stumped, Hit Wicket).
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-stone-200/80">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#55731D] font-mono">
                                    40% MODEL WEIGHT
                                </span>
                                <h3 className="text-base font-bold text-stone-900 mt-1">
                                    Boundary Suppression
                                </h3>
                                <p className="text-xs text-stone-600 mt-1">
                                    Percentile rank of (Fours + Sixes Conceded) / recorded deliveries. Lower increase is superior.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-1">
                            <span className="font-bold uppercase tracking-wider text-[10px] block">
                                Critical Rate Semantics Specification
                            </span>
                            <p>
                                Bowling rates are formulated strictly as <strong>event rates per 100 recorded deliveries</strong> in the dataset,
                                not verified legal-ball economy rates or ICC strike rates. Non-bowler dismissals (run-outs) are excluded.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 6. Sample Eligibility & Reliability Adjustment */}
                <section className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-[#EFF5E4] text-[#55731D]">
                            <Sliders className="w-5 h-5" />
                        </span>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-mono">
                                STATISTICAL ROBUSTNESS
                            </span>
                            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                                6. Eligibility Thresholds & Neutral-50 Shrinkage
                            </h2>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                                Minimum Candidate Eligibility
                            </h3>
                            <ul className="space-y-2 text-xs text-stone-700">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
                                    <span>At least 20 career matches in format</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
                                    <span>At least 10 pressure matches in format</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
                                    <span>At least 300 normal deliveries / balls faced</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#6B8E23]" />
                                    <span>At least 100 pressure deliveries / balls faced</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                                Qualified Candidate Pool Sizes
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-center font-mono">
                                <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-stone-200/80">
                                    <span className="text-xs text-stone-500 block font-sans">IPL Batters</span>
                                    <span className="text-lg font-bold text-stone-900">27</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-stone-200/80">
                                    <span className="text-xs text-stone-500 block font-sans">T20I Batters</span>
                                    <span className="text-lg font-bold text-stone-900">23</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-stone-200/80">
                                    <span className="text-xs text-stone-500 block font-sans">IPL Bowlers</span>
                                    <span className="text-lg font-bold text-stone-900">66</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#FAF9F5] border border-stone-200/80">
                                    <span className="text-xs text-stone-500 block font-sans">T20I Bowlers</span>
                                    <span className="text-lg font-bold text-stone-900">68</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shrinkage Mathematical Formula */}
                    <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                            Reliability Adjustment Formulation
                        </span>
                        <div className="p-3 rounded-xl bg-white border border-stone-200 font-mono text-sm text-stone-900 overflow-x-auto">
                            Adjusted Score = 50 + min(1.0, √(Pressure Events / 300)) × (Raw Percentile Score - 50)
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            A neutral-50 shrinkage prior prevents low-sample flukes from dominating the rankings. A player
                            with exactly 100 pressure balls has a reliability factor of √(100/300) = 0.577, dampening their
                            departure from median expectation. At 300+ pressure deliveries, reliability reaches 1.0, preserving
                            the raw composite percentile without shrinkage.
                        </p>
                    </div>
                </section>

                {/* 7. Analytical Limitations */}
                <section className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-amber-50 text-amber-700">
                            <ShieldAlert className="w-5 h-5" />
                        </span>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 font-mono">
                                TRANSPARENCY & INTEGRITY
                            </span>
                            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                                7. Analytical & Data Limitations
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
                        <div className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF9F5] space-y-1">
                            <span className="font-bold text-stone-900 block">
                                1. Format-Specific Scoring Isolation
                            </span>
                            <p>
                                IPL and T20I rankings were calculated independently within their respective competition
                                candidate pools. The adjusted scores are percentile-based relative to each distinct cohort
                                and <strong>cannot be combined linearly into a unified cross-format ranking</strong>.
                            </p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF9F5] space-y-1">
                            <span className="font-bold text-stone-900 block">
                                2. Undocumented Extras Semantics
                            </span>
                            <p>
                                Source telemetry includes ambiguous fields (e.g. <code className="px-1 py-0.5 rounded bg-white">extras1_runs</code>, <code className="px-1 py-0.5 rounded bg-white">extras_2_runs</code>)
                                without a standardized data dictionary. Consequently, official legal-ball economy rates and bowler-conceded run breakdowns cannot be verified with complete audit integrity.
                            </p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF9F5] space-y-1">
                            <span className="font-bold text-stone-900 block">
                                3. Resource Proxy vs Game-Situation Pressure
                            </span>
                            <p>
                                The Pressure V2 definition is a structural resource proxy (remaining wickets and death overs),
                                not a dynamic required-run-rate metric. Chases requiring 14 RPO versus 6 RPO in the 17th over
                                are classified identically under this proxy.
                            </p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF9F5] space-y-1">
                            <span className="font-bold text-stone-900 block">
                                4. Small Candidate Pool Sensitivity
                            </span>
                            <p>
                                Due to rigorous 300 normal / 100 pressure ball minimums, only 27 IPL batters and 23 T20I batters
                                met qualification criteria. In pools of this size, individual multi-match streaks exert
                                elevated leverage on percentile distributions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
