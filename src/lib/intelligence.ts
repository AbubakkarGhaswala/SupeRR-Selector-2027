import type { Batter, Bowler, BoardPlayer } from "@/types/player";

export interface PlayerIntelligence {
    roleTitle: string;
    headline: string;
    summary: string;
    whySelected: {
        improvement: string;
        evidence: string[];
        sampleSizeContext: string;
        limitations: string;
    };
    rrFit: {
        squadRole: string;
        strengths: string[];
        weaknesses: string[];
        strategicUtility: string;
    };
}

export function getPlayerIntelligence(player: BoardPlayer, batter?: Batter, bowler?: Bowler): PlayerIntelligence {
    if (player.type === "batter" && batter) {
        return getBatterIntelligence(player, batter);
    } else if (player.type === "bowler" && bowler) {
        return getBowlerIntelligence(player, bowler);
    }

    // Default fallback
    return {
        roleTitle: player.type === "batter" ? "Specialist Batter" : "Specialist Bowler",
        headline: `${player.name} — Ranked #${player.rank.toString().padStart(2, "0")} in ${player.competition}`,
        summary: `Performance profile evaluated over ${player.pressureMatches} pressure matches and ${player.sampleSize} high-leverage deliveries.`,
        whySelected: {
            improvement: `Metric shifted by ${player.metricChange > 0 ? "+" : ""}${player.metricChange.toFixed(1)} under pressure.`,
            evidence: [
                `Normal baseline: ${player.normalMetric.toFixed(1)}`,
                `Pressure performance: ${player.pressureMetric.toFixed(1)}`,
            ],
            sampleSizeContext: `${player.sampleSize} pressure events with reliability factor ${player.reliability.toFixed(2)}.`,
            limitations: "Evaluated under experimental resource-pressure proxy definition.",
        },
        rrFit: {
            squadRole: "Squad Depth & Situational Option",
            strengths: ["Role adaptability", "Quantified pressure uplift"],
            weaknesses: ["Format-dependent candidate pool"],
            strategicUtility: "Analytical candidate for specific match situation management.",
        },
    };
}

function getBatterIntelligence(player: BoardPlayer, b: Batter): PlayerIntelligence {
    const srGain = b.strike_rate_change.toFixed(1);
    const bndGain = (b.boundary_percentage_pressure - b.boundary_percentage_normal).toFixed(1);
    const dismDiff = (b.dismissal_rate_pressure - b.dismissal_rate_normal).toFixed(1);

    // Specific tactical profiles
    const profiles: Record<string, { role: string; headline: string; rrRole: string; rrStrengths: string[]; rrWeaknesses: string[]; rrFitNote: string }> = {
        "rinku-singh": {
            role: "Middle-Order Finisher / Death Accelerator",
            headline: "Elite IPL Finisher with Maximum Sample Reliability",
            rrRole: "Designated Number 5/6 Match Closer",
            rrStrengths: ["Extraordinary 504-ball pressure sample", "+59.5 strike rate surge without reckless dismissals", "Controlled boundary acceleration (25.4%)"],
            rrWeaknesses: ["Relies on clear situational entry point (overs 14–20)", "Format score reflects IPL-only candidate pool"],
            rrFitNote: "Provides Rajasthan Royals with proven late-innings boundary generation to capitalize on platforms built by the top order, addressing historical death-overs stalls.",
        },
        "sikandar-raza": {
            role: "Middle-Order Anchor & Counter-Attacker",
            headline: "Top International Counter-Attacker Under Resource Depletion",
            rrRole: "Middle-Overs Stabilizer / Spin-Hitting All-Rounder",
            rrStrengths: ["+64.4 strike rate elevation", "Exceptional dismissal containment (only 5.2% dismissal rate under pressure)", "Dual-skill batting against spin and medium pace"],
            rrWeaknesses: ["International T20I candidate pool context; untested at scale across recent IPL cycles", "Reliability factor adjusted to 0.84 due to 212 pressure balls"],
            rrFitNote: "Offers tactical middle-overs flexibility against high-spin phases at venues with large square boundaries like Jaipur.",
        },
        "liam-livingstone": {
            role: "Explosive Middle-Order Ball-Striker",
            headline: "Stratospheric Power Output Surpassing 200 Strike Rate",
            rrRole: "Impact Enforcer at Number 4/5",
            rrStrengths: ["208.0 pressure strike rate", "31.3% boundary percentage under resource pressure", "Immediate boundary threat from ball one"],
            rrWeaknesses: ["Higher dismissal rate (6.7% in pressure)", "163 pressure balls subjects score to a 0.74 reliability shrinkage"],
            rrFitNote: "Acts as a pure phase-breaker who can disrupt defensive bowling plans and clear larger outfield dimensions.",
        },
        "suryakumar-yadav": {
            role: "360-Degree Middle-Order Disruptor",
            headline: "Highest Peak Pressure Strike Rate in Dataset (225.2)",
            rrRole: "Middle-Order Tactical Engine",
            rrStrengths: ["36.0% boundary rate in high-pressure T20I scenarios", "+63.9 strike rate leap", "Low dismissal rate (5.0%) despite extreme scoring pace"],
            rrWeaknesses: ["139 pressure deliveries (reliability factor 0.68)", "Calculated strictly on international T20I deliveries"],
            rrFitNote: "Analytical profile demonstrates unmatched manipulation of defensive boundary riders in overs 10–18.",
        },
        "hardik-pandya": {
            role: "Pace-Hitting Finisher & All-Round Leader",
            headline: "Proven Full-Reliability Match Finisher with 387 Pressure Deliveries",
            rrRole: "Pace-Hitting Number 6 & Pressure Anchor",
            rrStrengths: ["Full 1.0 reliability factor across 32 pressure matches", "Consistent strike rate leap to 170.5", "Controlled dismissal management (5.2%)"],
            rrWeaknesses: ["Lower boundary percentage peak (24.0%) relative to top 3 ranked batters", "Format metrics drawn from T20I pool"],
            rrFitNote: "Brings proven temperament in tight resource-depleted chases, pairing defensive preservation with tactical boundary hitting.",
        },
        "shreyas-iyer": {
            role: "Top-Order Anchor & Spin Enforcer",
            headline: "Decisive Shift from Anchor to Enforcer in Crunch Phases",
            rrRole: "Number 3/4 Stabilizer and Middle-Overs Leader",
            rrStrengths: ["Strike rate escalates from 146.5 to 208.1 (+61.6)", "Boundary percentage jumps to 31.0%", "210 pressure balls across 23 matches"],
            rrWeaknesses: ["Dismissal rate increases from 3.2% to 5.7%", "Reliability factor shrunk to 0.84"],
            rrFitNote: "Excellent counter to spin-heavy middle overs, anchoring against early collapses before shifting gears when wickets fall.",
        },
        "nitish-reddy": {
            role: "Emerging Fast-Bowling All-Rounder",
            headline: "Largest Raw Strike-Rate Acceleration (+74.9) in the Database",
            rrRole: "High-Ceiling Impact Batter & Middle-Order Wedge",
            rrStrengths: ["Unrivaled raw improvement (+74.9 SR delta up to 200.0)", "27.9% boundary rate under strain", "Fast-developing young profile"],
            rrWeaknesses: ["Elevated pressure dismissal rate (8.2%)", "Sample size of 147 balls applies a 0.70 reliability shrinkage"],
            rrFitNote: "Represents an aggressive upside investment whose intent creates instant game leverage, offset by vulnerability to quick dismissals.",
        },
        "rishabh-pant": {
            role: "Dynamic Left-Hand Wicketkeeper-Batter",
            headline: "Unorthodox Boundary Generation in High-Leverage Scenarios",
            rrRole: "Middle-Order Counter-Puncher (Number 4/5)",
            rrStrengths: ["198.6 pressure strike rate", "30.4% boundary conversion", "Natural left-handed matchup advantage"],
            rrWeaknesses: ["Dismissal rate doubles from 3.9% to 8.0%", "138 pressure balls subjects score to a 0.68 reliability factor"],
            rrFitNote: "Breaks defensive spin rhythms and attacks bowling units when fielding restrictions or resource ceilings dictate aggression.",
        },
        "jos-buttler": {
            role: "World-Class Top-Order / Multi-Phase Specialist",
            headline: "Elite Conversion from Controlled Accumulation to 204+ Pressure Striking",
            rrRole: "Top-Order Anchor & Deep-Innings Driver",
            rrStrengths: ["Pressure strike rate jumps from 145.1 to 204.5 (+59.4)", "Low pressure dismissal rate of 5.3%", "Boundary rate expands to 31.6%"],
            rrWeaknesses: ["Only 133 pressure balls (reliability factor 0.67) as top-order batters face fewer end-phase pressure balls", "Score shrunk from raw percentile"],
            rrFitNote: "Proven synergy with Rajasthan Royals conditions; demonstrates the rare ability to carry an innings deep and explode without giving his wicket away.",
        },
        "fakhar-zaman": {
            role: "High-Intent Left-Hand Opening Batter",
            headline: "Aggressive Boundary Hunter Operating Near Sample Eligibility Limit",
            rrRole: "Powerplay / Early Middle-Overs Aggressor",
            rrStrengths: ["+51.4 strike rate uplift", "26.2% boundary conversion under pressure", "Hostile attacking intent against extreme pace"],
            rrWeaknesses: ["Smallest pressure sample in top 10 (103 balls)", "Reliability factor of 0.59 significantly compresses adjusted score", "High dismissal rate (7.8%)"],
            rrFitNote: "A calculated high-risk option whose aggressive intent can overpower opposition lines early, though consistency is curtailed by dismissal risk.",
        },
    };

    const specific = profiles[player.slug] || {
        role: "Specialist Batter",
        headline: `${player.name} — Ranked #${player.rank.toString().padStart(2, "0")}`,
        rrRole: "Middle-Order Striking Asset",
        rrStrengths: [`+${srGain} strike rate improvement`, `${b.boundary_percentage_pressure.toFixed(1)}% boundary rate`],
        rrWeaknesses: [`${b.dismissal_rate_pressure.toFixed(1)}% dismissal rate`],
        rrFitNote: "Analytical candidate for tactical situation deployment.",
    };

    return {
        roleTitle: specific.role,
        headline: specific.headline,
        summary: `Under high-stress conditions (≤5 wickets or death overs with ≤7 wickets), ${player.name} boosts scoring rate from ${b.strike_rate_normal.toFixed(1)} to ${b.strike_rate_pressure.toFixed(1)} (${srGain > "0" ? "+" : ""}${srGain} SR) across ${b.balls_faced_pressure.toFixed(0)} balls.`,
        whySelected: {
            improvement: `Strike rate surged by +${srGain} points, with boundary frequency increasing from ${b.boundary_percentage_normal.toFixed(1)}% to ${b.boundary_percentage_pressure.toFixed(1)}% (+${bndGain}%).`,
            evidence: [
                `Normal baseline strike rate: ${b.strike_rate_normal.toFixed(1)} across ${b.balls_faced_normal.toFixed(0)} recorded deliveries`,
                `Pressure strike rate: ${b.strike_rate_pressure.toFixed(1)} across ${b.balls_faced_pressure.toFixed(0)} balls in ${b.pressure_matches} matches`,
                `Boundary output: ${b.boundary_percentage_pressure.toFixed(1)}% under pressure vs ${b.boundary_percentage_normal.toFixed(1)}% normal`,
                `Dismissal rate shift: ${b.dismissal_rate_normal.toFixed(1)}% normal to ${b.dismissal_rate_pressure.toFixed(1)}% pressure (${dismDiff > "0" ? "+" : ""}${dismDiff}%)`,
            ],
            sampleSizeContext: `Tested on ${b.balls_faced_pressure.toFixed(0)} pressure deliveries (threshold: 100). Reliability factor is ${b.reliability_factor.toFixed(2)}, yielding a format-adjusted score of ${b.adjusted_score.toFixed(1)}/100.`,
            limitations: `Dismissal rate changes from ${b.dismissal_rate_normal.toFixed(1)}% to ${b.dismissal_rate_pressure.toFixed(1)}%. Ranked within the ${player.competition} candidate pool (${player.competition === "IPL" ? "27" : "23"} qualifying batters) and cannot be merged linearly with cross-format data.`,
        },
        rrFit: {
            squadRole: specific.rrRole,
            strengths: specific.rrStrengths,
            weaknesses: specific.rrWeaknesses,
            strategicUtility: specific.rrFitNote,
        },
    };
}

function getBowlerIntelligence(player: BoardPlayer, b: Bowler): PlayerIntelligence {
    const wktGain = b.wicket_rate_change.toFixed(2);
    const bndDiff = (b.boundary_rate_pressure - b.boundary_rate_normal).toFixed(1);

    const profiles: Record<string, { role: string; headline: string; rrRole: string; rrStrengths: string[]; rrWeaknesses: string[]; rrFitNote: string }> = {
        "shaheen-afridi": {
            role: "Left-Arm Opening & Death Spearhead",
            headline: "Top-Ranked T20I Bowler with High Wicket Rate and Boundary Suppression",
            rrRole: "New-Ball Striker & Death-Overs Enforcer",
            rrStrengths: ["Wicket rate nearly doubles from 4.93 to 9.20 per 100 balls", "Boundary rate drops sharply from 19.7% to 14.1%", "Full 1.0 reliability factor (326 balls)"],
            rrWeaknesses: ["Scores derived from international T20I circuit; IPL-specific surface metrics not present in dataset"],
            rrFitNote: "Provides lethal left-arm angle and yorker execution at the death, addressing a key seam bowling requirement for defensive boundary control.",
        },
        "shadab-khan": {
            role: "Leg-Spin All-Rounder & Middle-Phase Squeeze",
            headline: "Drastic Boundary Containment Under Pressure (Halved to 8.5%)",
            rrRole: "Middle-Overs Attacking Wrist Spinner",
            rrStrengths: ["Boundary rate collapses from 15.6% to 8.5%", "Wicket rate elevates to 8.04 per 100 deliveries (+4.96)", "Exceptional defensive economy proxy"],
            rrWeaknesses: ["199 pressure deliveries applies a 0.81 reliability factor", "Sample limited to international T20I matches"],
            rrFitNote: "Ideal tactical fit for Jaipur's expansive boundaries, where restrictive boundary concession directly forces reckless aerial shots.",
        },
        "jofra-archer": {
            role: "Outright Express Pace Bowler",
            headline: "High Strike Output Coupled with Sharp Boundary Reduction",
            rrRole: "Enforcer in Overs 16–20 & Powerplay Spearhead",
            rrStrengths: ["Wicket rate climbs to 9.49 (+4.52)", "Boundary concession plummets from 22.4% to 15.2%", "Uncompromising pace that prevents batters setting up"],
            rrWeaknesses: ["158 pressure balls compresses score to 80.7 via 0.73 reliability shrinkage", "Injury-related workload sensitivity outside data model"],
            rrFitNote: "Familiarity with the Rajasthan Royals ethos combined with elite defensive boundary reduction under extreme pressure.",
        },
        "kuldeep-yadav": {
            role: "Left-Arm Wrist Spinner (Chinaman)",
            headline: "IPL-Leading Reliability with Sub-12% Boundary Rate in Pressure",
            rrRole: "Primary Middle-Overs Attacking Weapon",
            rrStrengths: ["Full 1.0 reliability factor across 348 IPL pressure deliveries", "Boundary rate restricted to 11.5% in high-pressure phases", "Consistent wicket rate climb to 7.76"],
            rrWeaknesses: ["Relies on scoreboard pressure to induce false strokes", "Performance sensitive to boundary length and dew factors"],
            rrFitNote: "World-class wicket-taker in the middle overs whose ability to choke boundaries without sacrificing attacking angles fits Jaipur's venue dimensions.",
        },
        "avesh-khan": {
            role: "Hit-the-Deck Fast-Medium Bowler",
            headline: "Workhorse Reliability with 474 Pressure Deliveries in IPL",
            rrRole: "Middle-and-Death Overs Seam Anchor",
            rrStrengths: ["Highest pressure delivery volume in the entire dataset (474 deliveries across 50 matches)", "Wicket rate nearly doubles to 7.17", "Boundary rate drops by 5.1% to 19.2%"],
            rrWeaknesses: ["Higher baseline boundary rate (19.2% in pressure) than elite spinners", "Requires defensive field support"],
            rrFitNote: "Demonstrates proven durability and wicket-taking resilience in crunch death overs, serving as a reliable workhorse in high-intensity IPL matches.",
        },
        "mitchell-starc": {
            role: "Left-Arm Express Fast Bowler",
            headline: "Highest Pressure Wicket Rate in Entire Dataset (12.18 per 100 Deliveries)",
            rrRole: "Clutch Wicket-Taking Weapon at the Death",
            rrStrengths: ["Peak wicket rate of 12.18 (+7.49 raw improvement)", "Unmatched ability to blow through tailenders and set batters alike", "Aggressive defensive pressure conversion"],
            rrWeaknesses: ["Higher boundary concession (23.7% in pressure)", "156 balls subjects score to a 0.72 reliability shrinkage"],
            rrFitNote: "A high-variance, high-reward strike bowler who trades occasional boundaries for game-breaking wickets in overs 18–20.",
        },
        "yuzvendra-chahal": {
            role: "Attacking Right-Arm Leg-Break Bowler",
            headline: "Proven IPL Match-Winner with 431 Deliveries and 9.05 Wicket Rate",
            rrRole: "Leading Middle-Overs Match-Winner",
            rrStrengths: ["Full 1.0 reliability factor across 48 pressure matches", "Wicket rate jumps from 4.49 to 9.05 (+4.56)", "Immense tactical bravery tossing the ball up under pressure"],
            rrWeaknesses: ["Boundary rate stays relatively flat (15.1% normal vs 15.5% pressure) rather than decreasing"],
            rrFitNote: "Proven historic cornerstone for Rajasthan Royals; the data demonstrates that even when games tighten, his wicket-taking frequency doubles.",
        },
        "rashid-khan": {
            role: "Elite Quick Leg-Spin Specialist",
            headline: "The Gold Standard of Boundary Containment (8.7% Conceded)",
            rrRole: "Universal Containment & Breakthrough Spinner",
            rrStrengths: ["Incredible 8.7% boundary rate conceded under pressure", "Wicket rate leaps from 4.73 to 9.91 (+5.18)", "Full 1.0 reliability factor across 343 deliveries"],
            rrWeaknesses: ["Metrics evaluated in T20I candidate pool", "Batters frequently choose not to attack him, lowering raw wicket totals in low-risk chases"],
            rrFitNote: "Offers unmatched run suppression and decisive breakthroughs, suffocating opponent momentum in any high-stakes situation.",
        },
        "suyash-sharma": {
            role: "Mystery Legbreak Googly Bowler",
            headline: "High-Trajectory Improvement: Boundary Rate Dropped from 20.2% to 14.5%",
            rrRole: "Impact Sub / Attacking Spin Option",
            rrStrengths: ["Boundary rate drops significantly by 5.7%", "Wicket rate more than doubles to 5.61", "214 pressure deliveries across 19 matches"],
            rrWeaknesses: ["Lowest raw pressure wicket rate (5.61) among top 10 bowlers", "Reliability factor adjusted to 0.84"],
            rrFitNote: "Provides young, cost-effective mystery spin depth with strong containment indicators against middle-order hitters.",
        },
        "sai-kishore": {
            role: "Tall Left-Arm Orthodox Spinner",
            headline: "Double-Digit Wicket Rate (10.71) Backed by Tight Containment (14.3%)",
            rrRole: "Powerplay / Squeeze Left-Arm Orthodox Specialist",
            rrStrengths: ["Wicket rate escalates from 5.75 to 10.71 (+4.96)", "Boundary concession drops from 17.5% to 14.3%", "High release point creating steep bounce"],
            rrWeaknesses: ["Smallest bowling pressure sample (112 balls)", "Reliability factor of 0.61 reduces raw score to 74.3", "Limited match sample (13 pressure matches)"],
            rrFitNote: "Height and discipline make him an ideal tactical asset at Jaipur to exploit large boundaries and challenge right-handers with defensive angles.",
        },
    };

    const specific = profiles[player.slug] || {
        role: "Specialist Bowler",
        headline: `${player.name} — Ranked #${player.rank.toString().padStart(2, "0")}`,
        rrRole: "Tactical Bowling Asset",
        rrStrengths: [`+${wktGain} wicket rate change`, `${b.boundary_rate_pressure.toFixed(1)}% boundary rate conceded`],
        rrWeaknesses: [`Sample of ${b.deliveries_pressure.toFixed(0)} deliveries`],
        rrFitNote: "Analytical candidate for high-leverage defensive phases.",
    };

    return {
        roleTitle: specific.role,
        headline: specific.headline,
        summary: `Under resource pressure, ${player.name} increases creditable wicket rate from ${b.wicket_rate_normal.toFixed(2)} to ${b.wicket_rate_pressure.toFixed(2)} per 100 deliveries (+${wktGain}), while managing boundary concession at ${b.boundary_rate_pressure.toFixed(1)}%.`,
        whySelected: {
            improvement: `Wicket-taking rate increased by +${wktGain} wickets per 100 recorded deliveries, while boundary rate conceded shifted from ${b.boundary_rate_normal.toFixed(1)}% to ${b.boundary_rate_pressure.toFixed(1)}% (${bndDiff > "0" ? "+" : ""}${bndDiff}%).`,
            evidence: [
                `Normal baseline wicket rate: ${b.wicket_rate_normal.toFixed(2)} wickets / 100 deliveries (${b.deliveries_normal.toFixed(0)} balls)`,
                `Pressure wicket rate: ${b.wicket_rate_pressure.toFixed(2)} wickets / 100 deliveries (${b.deliveries_pressure.toFixed(0)} balls in ${b.pressure_matches} matches)`,
                `Boundary containment: ${b.boundary_rate_pressure.toFixed(1)}% conceded in pressure vs ${b.boundary_rate_normal.toFixed(1)}% normal`,
                `Improvement delta: +${wktGain} wickets/100 balls with ${bndDiff}% boundary rate variation`,
            ],
            sampleSizeContext: `Tested across ${b.deliveries_pressure.toFixed(0)} pressure deliveries (threshold: 100). Reliability factor is ${b.reliability_factor.toFixed(2)}, yielding a format-adjusted score of ${b.adjusted_score.toFixed(1)}/100.`,
            limitations: `Rates are calculated strictly per 100 recorded deliveries (including extras present in dataset), not official legal-ball economy rates. Format-specific to ${player.competition} candidate pool (${player.competition === "IPL" ? "66" : "68"} bowlers).`,
        },
        rrFit: {
            squadRole: specific.rrRole,
            strengths: specific.rrStrengths,
            weaknesses: specific.rrWeaknesses,
            strategicUtility: specific.rrFitNote,
        },
    };
}

