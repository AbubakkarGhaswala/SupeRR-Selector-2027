import { getBatters, getBowlers, getBoardPlayers } from "@/lib/data";
import InteractiveDashboard from "@/components/dashboard/InteractiveDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SupeRR Selector — Cricket Scouting & Pressure Intelligence Dashboard",
    description:
        "Interactive cricket scouting and player intelligence dashboard. 200,999 deliveries analysed across IPL and T20I (2022–2026). Identifying players who deliver under pressure.",
};

export default async function Home() {
    const [batters, bowlers, boardPlayers] = await Promise.all([
        getBatters(),
        getBowlers(),
        getBoardPlayers(),
    ]);

    return (
        <InteractiveDashboard
            batters={batters}
            bowlers={bowlers}
            boardPlayers={boardPlayers}
        />
    );
}
