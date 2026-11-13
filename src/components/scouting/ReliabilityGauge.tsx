interface ReliabilityGaugeProps {
    reliability: number;
    sampleSize: number;
    unitLabel?: string;
    className?: string;
}

export default function ReliabilityGauge({
    reliability,
    sampleSize,
    unitLabel = "balls",
    className = "",
}: ReliabilityGaugeProps) {
    const isFullReliability = reliability >= 0.999;
    const percentage = Math.min(Math.round(reliability * 100), 100);

    return (
        <div className={`p-4 rounded-xl border border-stone-200/80 bg-white/70 shadow-xs ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Reliability & Sample Weight
                    </span>
                    <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5 mt-0.5">
                        {isFullReliability ? "Full Benchmark (1.00)" : `Adjusted (${reliability.toFixed(2)})`}
                        {isFullReliability && (
                            <span className="inline-block w-2 h-2 rounded-full bg-[#68842E]" />
                        )}
                    </h4>
                </div>
                <div className="text-right font-mono">
                    <span className="text-lg font-bold text-stone-900">
                        {sampleSize.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-500 block -mt-1">
                        {unitLabel}
                    </span>
                </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1">
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden flex">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ${
                            isFullReliability ? "bg-[#7A9A2E]" : "bg-[#A1B863]"
                        }`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono">
                    <span>0</span>
                    <span className="text-stone-400">100 min</span>
                    <span className="font-semibold text-stone-700">300 benchmark</span>
                </div>
            </div>

            <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                {isFullReliability
                    ? `Exceeds the 300-event robustness threshold. Full raw percentile score retained without shrinkage.`
                    : `Sample under 300 events; raw percentile shrunk towards neutral-50 by a factor of ${reliability.toFixed(2)}.`}
            </p>
        </div>
    );
}

