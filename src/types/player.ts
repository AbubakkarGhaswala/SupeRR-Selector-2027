
export type Competition = "IPL" | "T20I";
export type PlayerType = "batter" | "bowler";

export interface Batter {
    rank: number;
    player_name: string;
    competition_source: Competition;
    matches: number;
    pressure_matches: number;
    balls_faced_normal: number;
    balls_faced_pressure: number;
    strike_rate_normal: number;
    strike_rate_pressure: number;
    strike_rate_change: number;
    boundary_percentage_normal: number;
    boundary_percentage_pressure: number;
    dismissal_rate_normal: number;
    dismissal_rate_pressure: number;
    adjusted_score: number;
    reliability_factor: number;
}

export interface Bowler {
    rank: number;
    player_name: string;
    competition_source: Competition;
    matches: number;
    pressure_matches: number;
    deliveries_normal: number;
    deliveries_pressure: number;
    wicket_rate_normal: number;
    wicket_rate_pressure: number;
    wicket_rate_change: number;
    boundary_rate_normal: number;
    boundary_rate_pressure: number;
    adjusted_score: number;
    reliability_factor: number;
}

export interface BoardPlayer {
    id: string;
    name: string;
    slug: string;
    rank: number;
    type: PlayerType;
    competition: Competition;
    matches: number;
    pressureMatches: number;
    normalMetric: number;
    pressureMetric: number;
    metricChange: number;
    sampleSize: number;
    adjustedScore: number;
    reliability: number;
    secondaryNormalMetric: number;
    secondaryPressureMetric: number;
    primaryMetricLabel: string;
    secondaryMetricLabel: string;
    image: string;
    batter?: Batter;
    bowler?: Bowler;
}
