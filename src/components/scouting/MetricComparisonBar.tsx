interface MetricComparisonBarProps {
    label: string;
    normalValue: number;
    pressureValue: number;
    unit?: string;
    formatDecimals?: number;
    higherIsBetter?: boolean;
    compact?: boolean;
    className?: string;
}

export default function MetricComparisonBar({
    label,
    normalValue,
    pressureValue,
    unit = "",
    formatDecimals = 1,
    higherIsBetter = true,
    compact = false,
    className = "",
}: MetricComparisonBarProps) {
    const diff = pressureValue - normalValue;
    const isImprovement = higherIsBetter ? diff > 0 : diff < 0;
    const pctChange = normalValue > 0 ? ((diff / normalValue) * 100).toFixed(0) : "0";

    // Normalize bar scales (max based on highest value + 15%)
    const maxVal = Math.max(normalValue, pressureValue, 1) * 1.15;
    const normalWidth = Math.min(Math.max((normalValue / maxVal) * 100, 4), 100);
    const pressureWidth = Math.min(Math.max((pressureValue / maxVal) * 100, 4), 100);

    return (
        <div className={`${compact ? "space-y-1.5" : "space-y-2"} text-stone-900 ${className}`}>
            <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-stone-600 uppercase tracking-wider text-[11px] font-semibold">
                    {label}
                </span>
                <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold font-mono ${
                        isImprovement
                            ? "bg-[#EEF5E1] text-[#4A6818]"
                            : "bg-stone-100 text-stone-600"
                    }`}
                >
                    {diff > 0 ? "+" : ""}
                    {diff.toFixed(formatDecimals)}
                    {unit} ({diff > 0 ? "+" : ""}
                    {pctChange}%)
                </span>
            </div>

            <div className={compact ? "space-y-1" : "space-y-1.5"}>
                {/* Normal baseline bar */}
                <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[11px] text-stone-500 font-mono">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-sans">
                            Normal
                        </span>
                        <span>
                            {normalValue.toFixed(formatDecimals)}
                            {unit}
                        </span>
                    </div>
                    <div className={`${compact ? "h-1" : "h-1.5"} w-full bg-stone-100 rounded-full overflow-hidden`}>
                        <div
                            className="h-full bg-stone-300 rounded-full transition-all duration-500"
                            style={{ width: `${normalWidth}%` }}
                        />
                    </div>
                </div>

                {/* Pressure bar */}
                <div className="space-y-0.5">
                    <div className="flex justify-between items-center text-[11px] font-mono font-medium text-stone-900">
                        <span className="text-[10px] uppercase tracking-wider text-[#5A7C1B] font-sans font-semibold">
                            Pressure
                        </span>
                        <span className="font-semibold text-[#3D560F]">
                            {pressureValue.toFixed(formatDecimals)}
                            {unit}
                        </span>
                    </div>
                    <div className={`${compact ? "h-1.5" : "h-2"} w-full bg-stone-100 rounded-full overflow-hidden`}>
                        <div
                            className="h-full bg-[#8DA750] rounded-full transition-all duration-700 shadow-sm"
                            style={{ width: `${pressureWidth}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
