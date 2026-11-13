
import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseCSV } from "@/lib/csv";
import type {
    Batter,
    Bowler,
    BoardPlayer,
} from "@/types/player";

const DATA_DIR = path.join(
    process.cwd(),
    "public",
    "data"
);

export function slugify(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

async function readData<T>(filename: string): Promise<T[]> {
    const filePath = path.join(DATA_DIR, filename);
    const content = await readFile(filePath, "utf-8");
    return parseCSV<T>(content);
}

export async function getBatters(): Promise<Batter[]> {
    "use cache";
    const players = await readData<Batter>("batters.csv");
    return players.sort((a, b) => a.rank - b.rank);
}

export async function getBowlers(): Promise<Bowler[]> {
    "use cache";
    const players = await readData<Bowler>("bowlers.csv");
    return players.sort((a, b) => a.rank - b.rank);
}

export async function getBoardPlayers(): Promise<BoardPlayer[]> {
    "use cache";
    const [batters, bowlers] = await Promise.all([
        getBatters(),
        getBowlers(),
    ]);

    const batterPlayers: BoardPlayer[] = batters.map((p) => {
        const slug = slugify(p.player_name);

        return {
            id: `batter-${p.rank}`,
            name: p.player_name,
            slug,
            rank: p.rank,
            type: "batter",
            competition: p.competition_source,
            matches: p.matches,
            pressureMatches: p.pressure_matches,
            normalMetric: p.strike_rate_normal,
            pressureMetric: p.strike_rate_pressure,
            metricChange: p.strike_rate_change,
            sampleSize: p.balls_faced_pressure,
            adjustedScore: p.adjusted_score,
            reliability: p.reliability_factor,
            secondaryNormalMetric: p.boundary_percentage_normal,
            secondaryPressureMetric: p.boundary_percentage_pressure,
            primaryMetricLabel: "Pressure strike rate",
            secondaryMetricLabel: "Boundary percentage",
            image: `/images/players/${slug}.jpg`,
            batter: p,
        };
    });

    const bowlerPlayers: BoardPlayer[] = bowlers.map((p) => {
        const slug = slugify(p.player_name);

        return {
            id: `bowler-${p.rank}`,
            name: p.player_name,
            slug,
            rank: p.rank,
            type: "bowler",
            competition: p.competition_source,
            matches: p.matches,
            pressureMatches: p.pressure_matches,
            normalMetric: p.wicket_rate_normal,
            pressureMetric: p.wicket_rate_pressure,
            metricChange: p.wicket_rate_change,
            sampleSize: p.deliveries_pressure,
            adjustedScore: p.adjusted_score,
            reliability: p.reliability_factor,
            secondaryNormalMetric: p.boundary_rate_normal,
            secondaryPressureMetric: p.boundary_rate_pressure,
            primaryMetricLabel: "Pressure wicket rate",
            secondaryMetricLabel: "Boundary rate conceded",
            image: `/images/players/${slug}.jpg`,
            bowler: p,
        };
    });

    return [...batterPlayers, ...bowlerPlayers];
}

export async function getPlayerBySlug(slug: string): Promise<{
    player: BoardPlayer;
    batter?: Batter;
    bowler?: Bowler;
} | null> {
    "use cache";
    const [batters, bowlers, boardPlayers] = await Promise.all([
        getBatters(),
        getBowlers(),
        getBoardPlayers(),
    ]);

    const player = boardPlayers.find((p) => p.slug === slug);
    if (!player) return null;

    if (player.type === "batter") {
        const batter = batters.find((b) => slugify(b.player_name) === slug);
        return { player, batter };
    } else {
        const bowler = bowlers.find((b) => slugify(b.player_name) === slug);
        return { player, bowler };
    }
}

export async function getAllPlayerSlugs(): Promise<string[]> {
    "use cache";
    const players = await getBoardPlayers();
    return players.map((p) => p.slug);
}

