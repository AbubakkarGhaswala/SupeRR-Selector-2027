
"use client";

import type { BoardPlayer, PlayerType } from "@/types/player";
import PlayerDot from "./PlayerDot";

interface Props {
    title: string;
    subtitle: string;
    type: PlayerType;
    players: BoardPlayer[];
    selectedId: string;
    onSelect: (player: BoardPlayer) => void;
}

export default function PerformancePlot({
    title,
    subtitle,
    type,
    players,
    selectedId,
    onSelect,
}: Props) {
    const group = players.filter((p) => p.type === type);

    if (!group.length) return null;

    const changes = group.map((p) => p.metricChange);
    const minChange = Math.min(0, ...changes);
    const maxChange = Math.max(...changes);
    const range = maxChange - minChange || 1;

    const positions = group.map((player) => {
        const x =
            8 + ((player.metricChange - minChange) / range) * 82;

        const y =
            88 - Math.max(0, Math.min(1, player.reliability)) * 76;

        return { player, x, y };
    });

    return (
        <section className="plot-card">
            <div className="plot-heading">
                <div>
                    <p className="plot-kicker">
                        {type === "batter" ? "BATTING" : "BOWLING"} ANALYSIS
                    </p>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <span className="plot-count">10 PLAYERS</span>
            </div>

            <div className="plot-area">
                <div className="plot-y-label">RELIABILITY ↑</div>

                <div className="plot-canvas">
                    <div className="plot-grid-line line-a" />
                    <div className="plot-grid-line line-b" />
                    <div className="plot-grid-line line-c" />
                    <div className="plot-grid-line line-d" />

                    <span className="plot-zone-label">
                        HIGHER RELIABILITY
                    </span>

                    {positions.map(({ player, x, y }) => (
                        <PlayerDot
                            key={player.id}
                            player={player}
                            x={x}
                            y={y}
                            selected={player.id === selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>

            <div className="plot-axis-bottom">
                <span>{minChange.toFixed(1)}</span>
                <span>
                    {type === "batter"
                        ? "STRIKE-RATE IMPROVEMENT"
                        : "WICKET-RATE IMPROVEMENT"}
                </span>
                <span>+{maxChange.toFixed(1)}</span>
            </div>
        </section>
    );
}
