import type { PlayerIntelligence } from "@/lib/intelligence";
import { CheckCircle2, AlertCircle, ShieldAlert, Award, Compass, TrendingUp } from "lucide-react";

interface ScoutingAssessmentProps {
    intelligence: PlayerIntelligence;
    competition: "IPL" | "T20I";
    className?: string;
}

export default function ScoutingAssessment({
    intelligence,
    competition,
    className = "",
}: ScoutingAssessmentProps) {
    const { whySelected, rrFit } = intelligence;

    return (
        <div className={`space-y-8 ${className}`}>
            {/* Section D: Why We Selected This Player */}
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6 md:p-8 shadow-xs">
                <div className="flex items-center gap-2.5 mb-4">
                    <span className="p-2 rounded-lg bg-[#F0F5E6] text-[#55731D]">
                        <Award className="w-5 h-5" />
                    </span>
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B8E23]">
                            Quantitative Mandate
                        </span>
                        <h3 className="text-xl font-bold tracking-tight text-stone-900">
                            Why We Selected This Player
                        </h3>
                    </div>
                </div>

                <p className="text-base font-medium text-stone-800 leading-relaxed mb-6">
                    {whySelected.improvement}
                </p>

                {/* Evidence points */}
                <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Empirical Evidence (2022–2026 {competition} Deliveries)
                    </h4>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                        {whySelected.evidence.map((ev, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-2.5 p-3 rounded-lg border border-stone-100 bg-[#FAF9F5] text-xs text-stone-700 leading-relaxed"
                            >
                                <CheckCircle2 className="w-4 h-4 text-[#6B8E23] shrink-0 mt-0.5" />
                                <span>{ev}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sample Context & Limitations */}
                <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-stone-100">
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-stone-600" />
                            Sample Volume Context
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            {whySelected.sampleSizeContext}
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            Identified Data Limitations
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            {whySelected.limitations}
                        </p>
                    </div>
                </div>
            </div>

            {/* Section E: Rajasthan Royals 2027 Fit */}
            <div className="rounded-2xl border border-stone-200/90 bg-white p-6 md:p-8 shadow-xs relative overflow-hidden">
                {/* Subtle side stripe */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#8DA750]" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-lg bg-[#F5F4EE] text-stone-800">
                            <Compass className="w-5 h-5 text-[#5A7A1C]" />
                        </span>
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
                                Tactical Alignment
                            </span>
                            <h3 className="text-xl font-bold tracking-tight text-stone-900">
                                Rajasthan Royals 2027 Fit
                            </h3>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-[11px] font-medium text-amber-800">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        <span>Analytical Assessment · Not Official RR Policy</span>
                    </div>
                </div>

                {/* Squad Role Badge */}
                <div className="mb-6 p-4 rounded-xl bg-[#F8F8F4] border border-stone-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        Projected Strategic Role
                    </span>
                    <p className="text-base font-bold text-stone-900">
                        {rrFit.squadRole}
                    </p>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                        {rrFit.strategicUtility}
                    </p>
                </div>

                {/* Strengths & Weaknesses Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Strengths */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#6B8E23]" />
                            Relevant Tactical Strengths
                        </h4>
                        <ul className="space-y-2">
                            {rrFit.strengths.map((str, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed"
                                >
                                    <span className="text-[#6B8E23] font-bold">›</span>
                                    <span>{str}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Potential Weaknesses / Risks */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-stone-400" />
                            Potential Tactical Risks
                        </h4>
                        <ul className="space-y-2">
                            {rrFit.weaknesses.map((weak, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed"
                                >
                                    <span className="text-stone-400 font-bold">›</span>
                                    <span>{weak}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>
                        Evaluation Context: Sawai Mansingh Stadium conditions & resource-depleted phases
                    </span>
                    <span className="font-mono text-[10px] uppercase">
                        Season 02 / 2027
                    </span>
                </div>
            </div>
        </div>
    );
}
