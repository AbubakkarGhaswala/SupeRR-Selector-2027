"use client";

import type { BoardPlayer } from "@/types/player";
import PlayerCard from "./PlayerCard";

interface PlayerGridProps {
    players: BoardPlayer[];
    selectedPlayer: BoardPlayer;
    onSelectPlayer: (player: BoardPlayer) => void;
}

export default function PlayerGrid({
    players,
    selectedPlayer,
    onSelectPlayer,
}: PlayerGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {players.map((player) => (
                <PlayerCard
                    key={player.id}
                    player={player}
                    isSelected={player.slug === selectedPlayer.slug}
                    isAnySelected={Boolean(selectedPlayer)}
                    onSelect={onSelectPlayer}
                />
            ))}
        </div>
    );
}

