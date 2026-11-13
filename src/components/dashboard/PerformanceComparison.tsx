"use client";

import type { BoardPlayer, Batter, Bowler } from "@/types/player";

interface PerformanceComparisonProps {
    player: BoardPlayer;
    batter?: Batter;
    bowler?: Bowler;
}

export default function PerformanceComparison({
    player,
    batter,
    bowler,
}: PerformanceComparisonProps) {
    const isBatter = player.type === "batter";

    // Data for Batters
    const batterMetrics = batter
        ? [
              {
                  label: "Strike Rate",
                  unit: "runs / 100b",
                  normal: batter.strike_rate_normal,
                  pressure: batter.strike_rate_pressure,
                  delta: batter.strike_rate_change,
                  maxVal: 240,
                  better: "higher",
                  format: (v: number) => v.toFixed(1),
                  deltaFormat: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}`,
              },
              {
                  label: "Boundary Percentage",
                  unit: "% of balls",
                  normal: batter.boundary_percentage_normal,
                  pressure: batter.boundary_percentage_pressure,
                  delta: batter.boundary_percentage_pressure - batter.boundary_percentage_normal,
                  maxVal: 40,
                  better: "higher",
                  format: (v: number) => `${v.toFixed(1)}%`,
                  deltaFormat: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
              },
              {
                  label: "Dismissal Rate",
                  unit: "% of balls",
                  normal: batter.dismissal_rate_normal,
                  pressure: batter.dismissal_rate_pressure,
                  delta: batter.dismissal_rate_pressure - batter.dismissal_rate_normal,
                  maxVal: 12,
                  better: "lower",
                  format: (v: number) => `${v.toFixed(1)}%`,
                  deltaFormat: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
              },
          ]
        : [];

    // Data for Bowlers
    const bowlerMetrics = bowler
        ? [
              {
                  label: "Wicket Rate",
                  unit: "wickets / 100 deliveries",
                  normal: bowler.wicket_rate_normal,
                  pressure: bowler.wicket_rate_pressure,
                  delta: bowler.wicket_rate_change,
                  maxVal: 15,
                  better: "higher",
                  format: (v: number) => v.toFixed(2),
                  deltaFormat: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}`,
              },
              {
                  label: "Boundary Rate Conceded",
                  unit: "% boundaries conceded",
                  normal: bowler.boundary_rate_normal,
                  pressure: bowler.boundary_rate_pressure,
                  delta: bowler.boundary_rate_pressure - bowler.boundary_rate_normal,
                  maxVal: 30,
                  better: "lower",
                  format: (v: number) => `${v.toFixed(1)}%`,
                  deltaFormat: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`,
              },
          ]
        : [];

    const metrics = isBatter ? batterMetrics : bowlerMetrics;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                        METRIC EVALUATION
                    </h4>
                    <span className="text-sm font-bold text-stone-900">
                        Normal vs. Pressure Comparison
                    </span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                    {isBatter ? "3 Core Batting Metrics" : "Event rates per 100 recorded deliveries"}
                </span>
            </div>

            <div className="space-y-4">
                {metrics.map((m) => {
                    const normalPct = Math.min(100, Math.max(0, (m.normal / m.maxVal) * 100));
                    const pressurePct = Math.min(100, Math.max(0, (m.pressure / m.maxVal) * 100));
                    const isPositive = m.better === "higher" ? m.delta > 0 : m.delta < 0;

                    return (
                        <div
                            key={m.label}
                            className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-2.5 transition-all"
                        >
                            {/* Metric Header & Delta */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold text-stone-900 block">
                                        {m.label}
                                    </span>
                                    <span className="text-[10px] text-stone-400 font-mono">
                                        {m.unit}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-black border ${
                                            isPositive
                                                ? "bg-[#EFF6E4] text-[#425B12] border-[#D1E4A9]"
                                                : "bg-amber-50 text-amber-800 border-amber-200"
                                        }`}
                                    >
                                        {m.deltaFormat(m.delta)}
                                    </span>
                                    <span className="text-[9px] text-stone-400 font-mono block mt-0.5">
                                        {isPositive ? "Uplift" : "Variance"}
                                    </span>
                                </div>
                            </div>

                            {/* Comparison Bars */}
                            <div className="space-y-1.5 pt-1">
                                {/* Normal Bar */}
                                <div>
                                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-0.5">
                                        <span className="text-stone-400 font-medium">NORMAL BASELINE</span>
                                        <span className="font-bold text-stone-700">{m.format(m.normal)}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-stone-150 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-stone-400 transition-all duration-500 ease-out"
                                            style={{ width: `${normalPct}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Pressure Bar */}
                                <div>
                                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-800 mb-0.5">
                                        <span className="text-[#55731D] font-bold">HIGH PRESSURE</span>
                                        <span className="font-extrabold text-[#445D14]">{m.format(m.pressure)}</span>
                                    </div>
                                    <div className="h-2.5 w-full rounded-full bg-stone-150 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-[#68842E] transition-all duration-500 ease-out shadow-xs"
                                            style={{ width: `${pressurePct}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

