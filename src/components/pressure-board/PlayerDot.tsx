
"use client";

import type { BoardPlayer } from "@/types/player";

interface Props {
    player: BoardPlayer;
    selected: boolean;
    x: number;
    y: number;
    onSelect: (player: BoardPlayer) => void;
}

export default function PlayerDot({
    player,
    selected,
    x,
    y,
    onSelect,
}: Props) {
    return (
        <button
            type="button"
            title={`${String(player.rank).padStart(2, "0")} · ${player.name}`}
            aria-label={`Select ${player.name}, rank ${player.rank}`}
            aria-pressed={selected}
            className={`player-dot ${selected ? "selected" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => onSelect(player)}
        >
            <span className={`dot-number ${player.type}`}>
                {String(player.rank).padStart(2, "0")}
            </span>
            <span className="dot-label">{player.name}</span>
        </button>
    );
}
