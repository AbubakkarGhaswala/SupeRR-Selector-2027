
"use client";

import { useState } from "react";
import type { BoardPlayer } from "@/types/player";
import PerformancePlot from "./PerformancePlot";
import IntelligencePanel from "./IntelligencePanel";

interface Props {
    players: BoardPlayer[];
}

export default function PressureBoard({ players }: Props) {
    const [selectedId, setSelectedId] = useState("batter-1");

    const selectedPlayer =
        players.find((player) => player.id === selectedId) ??
        players[0];

    function selectPlayer(player: BoardPlayer) {
        setSelectedId(player.id);
    }

    return (
        <div className="pressure-layout">
            <main className="board-main">
                <div className="board-title-row">
                    <div>
                        <p className="eyebrow">THE PRESSURE BOARD</p>
                        <h1>
                            Performance is
                            <br />
                            revealed under pressure.
                        </h1>
                        <p className="board-intro">
                            Explore 20 selected players across IPL and T20I.
                            Select any numbered player to inspect their performance.
                        </p>
                    </div>
                    <div className="board-total">
                        <strong>{players.length}</strong>
                        <span>SELECTED PLAYERS</span>
                    </div>
                </div>

                <div className="plot-stack">
                    <PerformancePlot
                        title="The batters"
                        subtitle="Strike-rate improvement vs sample reliability"
                        type="batter"
                        players={players}
                        selectedId={selectedPlayer.id}
                        onSelect={selectPlayer}
                    />

                    <PerformancePlot
                        title="The bowlers"
                        subtitle="Wicket-rate improvement vs sample reliability"
                        type="bowler"
                        players={players}
                        selectedId={selectedPlayer.id}
                        onSelect={selectPlayer}
                    />
                </div>

                <div className="board-footer-note">
                    <span className="legend-item">
                        <i className="legend-batter" /> Batter
                    </span>
                    <span className="legend-item">
                        <i className="legend-bowler" /> Bowler
                    </span>
                    <span className="legend-description">
                        Dot numbers represent the selected-list sequence.
                        Select a dot to change the player panel.
                    </span>
                </div>
            </main>

            {selectedPlayer && (
                <IntelligencePanel player={selectedPlayer} />
            )}
        </div>
    );
}
