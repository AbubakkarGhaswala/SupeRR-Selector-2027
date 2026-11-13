import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPlayerBySlug, getAllPlayerSlugs } from "@/lib/data";
import { getPlayerIntelligence } from "@/lib/intelligence";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Footer from "@/components/layout/Footer";
import PlayerImage from "@/components/scouting/PlayerImage";
import MetricComparisonBar from "@/components/scouting/MetricComparisonBar";
import ReliabilityGauge from "@/components/scouting/ReliabilityGauge";
import ScoutingAssessment from "@/components/scouting/ScoutingAssessment";
import {
    ArrowLeft,
    Target,
} from "lucide-react";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = await getAllPlayerSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getPlayerBySlug(slug);

    if (!data) {
        return {
            title: "Player Not Found — SupeRR Selector",
        };
    }

    const { player } = data;
    const rankStr = player.rank.toString().padStart(2, "0");

    return {
        title: `${player.name} (#${rankStr}) — Scouting Profile · SupeRR Selector`,
        description: `Comprehensive pressure-performance intelligence for ${player.name}. Ranked #${rankStr} in ${player.competition} with an adjusted score of ${player.adjustedScore.toFixed(1)}/100.`,
    };
}

export default async function PlayerProfilePage({ params }: Props) {
    const { slug } = await params;
    const data = await getPlayerBySlug(slug);

    if (!data) {
        notFound();
    }

    const { player, batter, bowler } = data;
    const intelligence = getPlayerIntelligence(player, batter, bowler);
    const isBatter = player.type === "batter";
    const rankStr = player.rank.toString().padStart(2, "0");

    const compBadgeColor =
        player.competition === "IPL"
            ? "bg-blue-50 text-blue-800 border-blue-200"
            : "bg-emerald-50 text-emerald-800 border-emerald-200";

    return (
        <div className="min-h-screen flex flex-col bg-[#F8F8F5] text-stone-900">
            <DashboardNav activeTab={isBatter ? "batters" : "bowlers"} />

            <main className="app-container flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                {/* Breadcrumbs & Back Navigation */}
                <div className="flex items-center justify-between text-xs font-medium text-stone-500">
                    <Link
                        href={`/#${isBatter ? "batters" : "bowlers"}`}
                        className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-950 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to {isBatter ? "Top 10 Batters" : "Top 10 Bowlers"}</span>
                    </Link>

                    <div className="flex items-center gap-2 font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-bold uppercase text-[10px] border border-stone-200">
                            PLAYER PROFILE PAGE
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EBF2DB] text-[#4F6D18] font-bold uppercase text-[10px]">
                            VERIFIED SELECTION
                        </span>
                    </div>
                </div>

                {/* Section A: Hero Profile Banner */}
                <section className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-10 shadow-xs relative overflow-hidden">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Player Large Photograph */}
                        <div className="lg:col-span-5 relative">
                            <div className="rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-[#1C1E22]">
                                <PlayerImage
                                    src={player.image}
                                    alt={player.name}
                                    name={player.name}
                                    rank={player.rank}
                                    aspectRatio="portrait"
                                    priority={true}
                                    className="w-full h-auto min-h-[380px] sm:min-h-[460px]"
                                />
                            </div>

                            {/* Floating Rank Emblem */}
                            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-stone-950/90 backdrop-blur-md text-stone-100 border border-stone-700/60 shadow-lg font-mono">
                                <span className="text-[10px] text-stone-400 block uppercase tracking-wider">
                                    Official Rank
                                </span>
                                <span className="text-xl font-black text-[#C4DD7A]">
                                    #{rankStr}
                                </span>
                            </div>
                        </div>

                        {/* Player Header & Primary Identifiers */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${compBadgeColor}`}>
                                        {player.competition} Candidate Pool
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-700 border border-stone-200">
                                        {intelligence.roleTitle}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F4F8EB] text-[#55731D] border border-[#DEEBC4]">
                                        Top 10 Selection
                                    </span>
                                </div>

                                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 leading-tight">
                                    {player.name}
                                </h1>

                                <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed">
                                    {intelligence.headline}
                                </p>
                            </div>

                            {/* Key Summary Pill Box */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/80">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                                        Adjusted Score
                                    </span>
                                    <div className="flex items-baseline gap-1 mt-0.5">
                                        <span className="text-2xl font-black text-stone-900 font-mono">
                                            {player.adjustedScore.toFixed(1)}
                                        </span>
                                        <span className="text-xs text-stone-400 font-mono">/ 100</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                                        Reliability Weight
                                    </span>
                                    <span className="text-2xl font-black text-[#55731D] font-mono mt-0.5 block">
                                        {player.reliability.toFixed(2)}
                                    </span>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-mono">
                                        Pressure Sample
                                    </span>
                                    <span className="text-2xl font-black text-stone-900 font-mono mt-0.5 block">
                                        {player.sampleSize.toLocaleString()}
                                        <span className="text-xs font-normal text-stone-500 ml-1">
                                            {isBatter ? "balls" : "delivs"}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-stone-500 leading-relaxed">
                                {intelligence.summary}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section B: Pressure Performance Matrix */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-stone-200">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B8E23] font-mono">
                                DETAILED STATISTICAL AUDIT
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
                                Pressure Performance Breakdown
                            </h2>
                        </div>
                        <p className="text-xs text-stone-500 max-w-md">
                            {isBatter
                                ? "Normal baseline vs high-stress resource-depleted phases (≤5 wickets or overs 16+ with ≤7 wickets)."
                                : "Event rates per 100 recorded deliveries (includes extras present in source dataset; not legal-ball economy)."}
                        </p>
                    </div>

                    {/* Batter Metrics Grid */}
                    {isBatter && batter && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Metric 1: Strike Rate */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-3">
                                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                                    <span className="font-bold text-stone-700 font-sans">STRIKE RATE</span>
                                    <span className="px-1.5 py-0.5 rounded bg-[#EEF5E1] text-[#4A6818] font-bold">
                                        +{batter.strike_rate_change.toFixed(1)} SR
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between pt-1 font-mono">
                                    <div>
                                        <span className="text-[10px] text-stone-400 block uppercase font-sans">Normal</span>
                                        <span className="text-xl font-bold text-stone-700">
                                            {batter.strike_rate_normal.toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-[#55731D] block uppercase font-sans font-bold">Pressure</span>
                                        <span className="text-2xl font-black text-[#3D560F]">
                                            {batter.strike_rate_pressure.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-stone-500 leading-snug pt-1">
                                    Scoring velocity accelerates by {((batter.strike_rate_change / batter.strike_rate_normal) * 100).toFixed(0)}% when wickets fall or game enters death phase.
                                </p>
                            </div>

                            {/* Metric 2: Boundary Percentage */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-3">
                                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                                    <span className="font-bold text-stone-700 font-sans">BOUNDARY PERCENTAGE</span>
                                    <span className="px-1.5 py-0.5 rounded bg-[#EEF5E1] text-[#4A6818] font-bold">
                                        +{(batter.boundary_percentage_pressure - batter.boundary_percentage_normal).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between pt-1 font-mono">
                                    <div>
                                        <span className="text-[10px] text-stone-400 block uppercase font-sans">Normal</span>
                                        <span className="text-xl font-bold text-stone-700">
                                            {batter.boundary_percentage_normal.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-[#55731D] block uppercase font-sans font-bold">Pressure</span>
                                        <span className="text-2xl font-black text-[#3D560F]">
                                            {batter.boundary_percentage_pressure.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-stone-500 leading-snug pt-1">
                                    Measures proportion of deliveries resulting in fours and sixes under pressure.
                                </p>
                            </div>

                            {/* Metric 3: Dismissal Rate */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-3">
                                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                                    <span className="font-bold text-stone-700 font-sans">DISMISSAL RATE</span>
                                    <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-bold">
                                        +{(batter.dismissal_rate_pressure - batter.dismissal_rate_normal).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between pt-1 font-mono">
                                    <div>
                                        <span className="text-[10px] text-stone-400 block uppercase font-sans">Normal</span>
                                        <span className="text-xl font-bold text-stone-700">
                                            {batter.dismissal_rate_normal.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-stone-500 block uppercase font-sans font-bold">Pressure</span>
                                        <span className="text-2xl font-black text-stone-900">
                                            {batter.dismissal_rate_pressure.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-stone-500 leading-snug pt-1">
                                    Dismissals of the striker per 100 balls faced (lower increase is ranked better in model).
                                </p>
                            </div>

                            {/* Metric 4: Balls Faced Volume */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block">
                                    DELIVERY VOLUME
                                </span>
                                <div className="flex items-baseline justify-between font-mono">
                                    <div>
                                        <span className="text-xs text-stone-400 block font-sans">Normal Balls</span>
                                        <span className="text-xl font-bold text-stone-800">
                                            {batter.balls_faced_normal.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-stone-600 block font-sans font-bold">Pressure Balls</span>
                                        <span className="text-xl font-black text-[#55731D]">
                                            {batter.balls_faced_pressure.toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-stone-400 block pt-1 font-mono">
                                    Total: {(batter.balls_faced_normal + batter.balls_faced_pressure).toFixed(0)} balls faced
                                </span>
                            </div>

                            {/* Metric 5: Matches */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block">
                                    MATCH EXPOSURE
                                </span>
                                <div className="flex items-baseline justify-between font-mono">
                                    <div>
                                        <span className="text-xs text-stone-400 block font-sans">Total Matches</span>
                                        <span className="text-xl font-bold text-stone-800">
                                            {batter.matches}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-stone-600 block font-sans font-bold">Pressure Matches</span>
                                        <span className="text-xl font-black text-[#55731D]">
                                            {batter.pressure_matches}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-stone-400 block pt-1 font-mono">
                                    {((batter.pressure_matches / batter.matches) * 100).toFixed(0)}% match pressure exposure
                                </span>
                            </div>

                            {/* Metric 6: Model Scoring Weights */}
                            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200/85 shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono block">
                                    SCORING COMPOSITION
                                </span>
                                <div className="space-y-1 text-xs text-stone-600">
                                    <div className="flex justify-between">
                                        <span>Strike Rate Delta:</span>
                                        <span className="font-bold text-stone-800 font-mono">50% Weight</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Boundary % Delta:</span>
                                        <span className="font-bold text-stone-800 font-mono">25% Weight</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Dismissal % Delta:</span>
                                        <span className="font-bold text-stone-800 font-mono">25% Weight</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bowler Metrics Grid */}
                    {!isBatter && bowler && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Metric 1: Wicket Rate */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-3">
                                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                                    <span className="font-bold text-stone-700 font-sans">WICKET RATE (/100 DELIVS)</span>
                                    <span className="px-1.5 py-0.5 rounded bg-[#EEF5E1] text-[#4A6818] font-bold">
                                        +{bowler.wicket_rate_change.toFixed(2)} wkts
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between pt-1 font-mono">
                                    <div>
                                        <span className="text-[10px] text-stone-400 block uppercase font-sans">Normal</span>
                                        <span className="text-xl font-bold text-stone-700">
                                            {bowler.wicket_rate_normal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-[#55731D] block uppercase font-sans font-bold">Pressure</span>
                                        <span className="text-2xl font-black text-[#3D560F]">
                                            {bowler.wicket_rate_pressure.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-stone-500 leading-snug pt-1">
                                    Creditable wickets per 100 recorded deliveries under pressure (caught, bowled, lbw, stumped, hit wicket).
                                </p>
                            </div>

                            {/* Metric 2: Boundary Rate Conceded */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-3">
                                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                                    <span className="font-bold text-stone-700 font-sans">BOUNDARIES CONCEDED</span>
                                    <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-bold">
                                        {(bowler.boundary_rate_pressure - bowler.boundary_rate_normal) > 0 ? "+" : ""}
                                        {(bowler.boundary_rate_pressure - bowler.boundary_rate_normal).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between pt-1 font-mono">
                                    <div>
                                        <span className="text-[10px] text-stone-400 block uppercase font-sans">Normal</span>
                                        <span className="text-xl font-bold text-stone-700">
                                            {bowler.boundary_rate_normal.toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-stone-600 block uppercase font-sans font-bold">Pressure</span>
                                        <span className="text-2xl font-black text-stone-900">
                                            {bowler.boundary_rate_pressure.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-[11px] text-stone-500 leading-snug pt-1">
                                    Proportion of recorded balls hit for fours or sixes. Lower concession is scored better in model.
                                </p>
                            </div>

                            {/* Metric 3: Important Warning on Rate Semantics */}
                            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-amber-200/80 shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 font-mono block">
                                    DATA SEMANTICS NOTICE
                                </span>
                                <p className="text-xs text-stone-700 leading-relaxed">
                                    Bowling rates are expressed as event rates per 100 recorded deliveries in the dataset.
                                    They are <strong>not official legal-ball economy rates</strong> or ICC-standard strike rates,
                                    as raw extras categorization lacks independent legal-ball verification.
                                </p>
                            </div>

                            {/* Metric 4: Deliveries Volume */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block">
                                    DELIVERY VOLUME
                                </span>
                                <div className="flex items-baseline justify-between font-mono">
                                    <div>
                                        <span className="text-xs text-stone-400 block font-sans">Normal Delivs</span>
                                        <span className="text-xl font-bold text-stone-800">
                                            {bowler.deliveries_normal.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-stone-600 block font-sans font-bold">Pressure Delivs</span>
                                        <span className="text-xl font-black text-[#55731D]">
                                            {bowler.deliveries_pressure.toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-stone-400 block pt-1 font-mono">
                                    Total: {(bowler.deliveries_normal + bowler.deliveries_pressure).toFixed(0)} recorded balls
                                </span>
                            </div>

                            {/* Metric 5: Matches */}
                            <div className="p-5 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono block">
                                    MATCH EXPOSURE
                                </span>
                                <div className="flex items-baseline justify-between font-mono">
                                    <div>
                                        <span className="text-xs text-stone-400 block font-sans">Total Matches</span>
                                        <span className="text-xl font-bold text-stone-800">
                                            {bowler.matches}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-stone-600 block font-sans font-bold">Pressure Matches</span>
                                        <span className="text-xl font-black text-[#55731D]">
                                            {bowler.pressure_matches}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-stone-400 block pt-1 font-mono">
                                    {((bowler.pressure_matches / bowler.matches) * 100).toFixed(0)}% match pressure exposure
                                </span>
                            </div>

                            {/* Metric 6: Model Scoring Weights */}
                            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200/85 shadow-xs space-y-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono block">
                                    SCORING COMPOSITION
                                </span>
                                <div className="space-y-1 text-xs text-stone-600">
                                    <div className="flex justify-between">
                                        <span>Wicket Rate Improvement:</span>
                                        <span className="font-bold text-stone-800 font-mono">60% Weight</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Boundary Rate Conceded Delta:</span>
                                        <span className="font-bold text-stone-800 font-mono">40% Weight</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Neutral-50 Shrinkage:</span>
                                        <span className="font-bold text-[#55731D] font-mono">Applied</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Section C: Visualizations & Reliability */}
                <section className="space-y-6">
                    <div className="pb-3 border-b border-stone-200">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B8E23] font-mono">
                            EMPIRICAL VISUALIZATIONS
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-950">
                            Performance Shifts & Sample Reliability
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Comparison Visualizer */}
                        <div className="p-6 rounded-2xl bg-white border border-stone-200/85 shadow-xs space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                                <Target className="w-4 h-4 text-[#6B8E23]" />
                                Baseline vs Pressure Delta
                            </h3>

                            <div className="space-y-5">
                                <MetricComparisonBar
                                    label={player.primaryMetricLabel}
                                    normalValue={player.normalMetric}
                                    pressureValue={player.pressureMetric}
                                    unit={isBatter ? " SR" : " wkts/100"}
                                    formatDecimals={isBatter ? 1 : 2}
                                />

                                <MetricComparisonBar
                                    label={player.secondaryMetricLabel}
                                    normalValue={player.secondaryNormalMetric}
                                    pressureValue={player.secondaryPressureMetric}
                                    unit="%"
                                    formatDecimals={1}
                                    higherIsBetter={isBatter}
                                />
                            </div>
                        </div>

                        {/* Reliability Visualization */}
                        <div className="space-y-4">
                            <ReliabilityGauge
                                reliability={player.reliability}
                                sampleSize={player.sampleSize}
                                unitLabel={isBatter ? "pressure balls" : "pressure deliveries"}
                            />

                            <div className="p-4 rounded-xl border border-stone-200/70 bg-[#FAF9F5] text-xs text-stone-600 leading-relaxed space-y-1.5">
                                <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px] block">
                                    Shrinkage Formulation
                                </span>
                                <p>
                                    Formula: <code className="px-1.5 py-0.5 rounded bg-white border border-stone-200 font-mono text-[11px]">Score = 50 + min(1, √(Sample / 300)) × (Raw - 50)</code>
                                </p>
                                <p className="text-[11px] text-stone-500">
                                    This stabilizes ratings for players near the 100-event threshold, pulling extreme percentiles toward the neutral 50 mark.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section D & E: Why We Selected & Rajasthan Royals Fit */}
                <ScoutingAssessment
                    intelligence={intelligence}
                    competition={player.competition}
                />
            </main>

            <Footer />
        </div>
    );
}
