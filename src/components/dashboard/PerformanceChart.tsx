"use client";

import { useMemo } from "react";
import type { BoardPlayer } from "@/types/player";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface PerformanceChartProps {
    players: BoardPlayer[];
    selectedPlayer: BoardPlayer;
    onSelectPlayer: (player: BoardPlayer) => void;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: {
            player: BoardPlayer;
            rank: number;
            x: number;
            y: number;
        };
    }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    const player = data.player;
    const isBatter = player.type === "batter";

    return (
        <div className="rounded-xl bg-stone-950/95 text-stone-100 p-3 shadow-xl border border-stone-800 text-xs font-mono space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 border-b border-stone-800 pb-1">
                <span className="font-black text-[#A4BE5C]">
                    #{player.rank.toString().padStart(2, "0")} {player.name}
                </span>
                <span className="text-[10px] text-stone-400 uppercase">
                    {player.competition}
                </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-stone-300">
                <span className="text-stone-400">
                    {isBatter ? "Strike Rate Delta:" : "Wicket Rate Delta:"}
                </span>
                <span className="font-bold text-white">
                    {player.metricChange > 0 ? "+" : ""}
                    {player.metricChange.toFixed(isBatter ? 1 : 2)}
                </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-stone-300">
                <span className="text-stone-400">Reliability Weight:</span>
                <span className="font-bold text-white">{player.reliability.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-stone-300">
                <span className="text-stone-400">Pressure Score:</span>
                <span className="font-bold text-[#A4BE5C]">{player.adjustedScore.toFixed(1)}/100</span>
            </div>
            <div className="text-[9px] text-stone-500 pt-0.5">Click dot to select player</div>
        </div>
    );
}

// Custom shape to draw the ranked circular marker
function RenderCustomDot(props: {
    cx?: number;
    cy?: number;
    payload?: {
        player: BoardPlayer;
        rank: number;
        isSelected: boolean;
    };
    onSelect?: (player: BoardPlayer) => void;
}) {
    const { cx, cy, payload, onSelect } = props;
    if (cx === undefined || cy === undefined || !payload) return null;

    const { player, rank, isSelected } = payload;
    const rankStr = rank.toString().padStart(2, "0");
    const radius = isSelected ? 18 : 13;

    return (
        <g
            style={{ cursor: "pointer" }}
            onClick={() => onSelect && onSelect(player)}
            className="transition-transform duration-300 group"
        >
            {/* Outer halo when selected */}
            {isSelected && (
                <>
                    <circle
                        cx={cx}
                        cy={cy}
                        r={radius + 8}
                        fill="#B7F34A"
                        opacity={0.3}
                        className="animate-pulse"
                    />
                    <circle
                        cx={cx}
                        cy={cy}
                        r={radius + 3}
                        fill="none"
                        stroke="#B7F34A"
                        strokeWidth={2}
                        strokeDasharray="3 3"
                    />
                </>
            )}

            {/* Main Circle Marker */}
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={isSelected ? "#B7F34A" : "#151515"}
                stroke={isSelected ? "#111111" : "#DCDDD5"}
                strokeWidth={isSelected ? 2.5 : 1.5}
                className="transition-colors duration-200"
            />

            {/* Rank Number Label */}
            <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill={isSelected ? "#111111" : "#FFFFFF"}
                fontSize={isSelected ? 11 : 9.5}
                fontWeight="900"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                pointerEvents="none"
            >
                {rankStr}
            </text>

            {/* Selected Player Floating Name Tag */}
            {isSelected && (
                <g pointerEvents="none">
                    <rect
                        x={cx - 45}
                        y={cy - 36}
                        width={90}
                        height={18}
                        rx={4}
                        fill="#151515"
                        stroke="#B7F34A"
                        strokeWidth={1}
                    />
                    <text
                        x={cx}
                        y={cy - 24}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize={9}
                        fontWeight="bold"
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    >
                        {player.name.slice(0, 13)}
                    </text>
                </g>
            )}
        </g>
    );
}

export default function PerformanceChart({
    players,
    selectedPlayer,
    onSelectPlayer,
}: PerformanceChartProps) {
    const isBatter = selectedPlayer.type === "batter";

    const chartData = useMemo(() => {
        return players.map((p) => ({
            x: Number(p.metricChange.toFixed(2)),
            y: Number(p.reliability.toFixed(2)),
            rank: p.rank,
            player: p,
            isSelected: p.slug === selectedPlayer.slug,
        }));
    }, [players, selectedPlayer.slug]);

    const xDomain = useMemo(() => {
        if (!players.length) return [0, 100];
        const minX = Math.min(...players.map((p) => p.metricChange));
        const maxX = Math.max(...players.map((p) => p.metricChange));
        const padding = (maxX - minX) * 0.15 || 5;
        return [Math.floor(minX - padding), Math.ceil(maxX + padding)];
    }, [players]);

    return (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCDDD5] shadow-2xs space-y-3">
            {/* Chart Title & Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#70746D]">
                        ANALYTICS SCATTER VIEW
                    </h4>
                    <span className="text-sm font-bold text-[#111111]">
                        Performance Improvement vs. Reliability
                    </span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-[#70746D]">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#B7F34A] border border-stone-800" />
                        <span>Selected (#{(selectedPlayer.rank).toString().padStart(2, "0")})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#151515]" />
                        <span>Ranked (01–10)</span>
                    </div>
                </div>
            </div>

            {/* Recharts Scatter Component */}
            <div className="w-full h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 30, right: 25, bottom: 20, left: -5 }}
                    >
                        <XAxis
                            type="number"
                            dataKey="x"
                            domain={xDomain}
                            stroke="#A8A29E"
                            fontSize={10}
                            fontFamily="ui-monospace, monospace"
                            tickLine={false}
                            label={{
                                value: isBatter
                                    ? "Strike Rate Improvement (Δ SR)"
                                    : "Wicket Rate Improvement (Δ Wkts / 100b)",
                                position: "bottom",
                                offset: 5,
                                fontSize: 10,
                                fill: "#78716C",
                                fontFamily: "ui-monospace, monospace",
                            }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            domain={[0.5, 1.05]}
                            stroke="#A8A29E"
                            fontSize={10}
                            fontFamily="ui-monospace, monospace"
                            tickLine={false}
                            label={{
                                value: "Reliability Weight (0.5 – 1.0)",
                                angle: -90,
                                position: "insideLeft",
                                offset: 15,
                                fontSize: 10,
                                fill: "#78716C",
                                fontFamily: "ui-monospace, monospace",
                            }}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ strokeDasharray: "3 3", stroke: "#D6D3D1" }}
                        />
                        <Scatter
                            data={chartData}
                            shape={(props: unknown) => (
                                <RenderCustomDot
                                    {...(props as object)}
                                    onSelect={onSelectPlayer}
                                />
                            )}
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={`cell-${entry.rank}`}
                                    fill={entry.isSelected ? "#68842E" : "#1C1F24"}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <p className="text-[10px] text-stone-500 font-mono text-center pt-1 border-t border-stone-100">
                Top-right quadrant represents optimal targets: high performance surge with full sample reliability (1.0).
            </p>
        </div>
    );
}

