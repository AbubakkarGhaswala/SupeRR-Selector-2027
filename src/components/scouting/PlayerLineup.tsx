import type { BoardPlayer } from "@/types/player";
import PlayerCard from "./PlayerCard";

interface PlayerLineupProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    players: BoardPlayer[];
    type: "batter" | "bowler";
}

export default function PlayerLineup({
    id,
    title,
    subtitle,
    description,
    players,
    type,
}: PlayerLineupProps) {
    if (players.length === 0) return null;

    const rank1 = players[0];
    const remainingPlayers = players.slice(1, 10);

    return (
        <section id={id} className="player-lineup-section scroll-mt-24 space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2DB] text-[#4F6D18] text-[11px] font-bold uppercase tracking-wider font-mono">
                            {type === "batter" ? "SECTION A" : "SECTION B"} · TOP 10 LINEUP
                        </span>
                        <span className="text-xs text-stone-600 font-mono">
                            {players.length} Players
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                        {title}
                    </h2>
                    <p className="text-sm font-medium text-stone-700 mt-1 max-w-2xl">
                        {subtitle}
                    </p>
                </div>

                <p className="text-xs text-stone-600 max-w-sm leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Rank 01 Prominent Editorial Card */}
            {rank1 && (
                <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B8E23]" />
                        PRIMARY SELECTION · RANK 01
                    </span>
                    <PlayerCard player={rank1} variant="featured" priority={true} />
                </div>
            )}

            {/* Ranks 02 - 10 Sophisticated Editorial Grid */}
            <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    RANKS 02 THROUGH 10 · SCOUTING GRID
                </span>

                <div className="player-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {remainingPlayers.map((player, idx) => (
                        <PlayerCard
                            key={player.id}
                            player={player}
                            variant="grid"
                            priority={idx < 2}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

