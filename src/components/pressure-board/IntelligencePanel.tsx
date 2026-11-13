
"use client";

import type { BoardPlayer } from "@/types/player";

interface Props {
    player: BoardPlayer;
}

function fmt(value: number) {
    return value.toFixed(2);
}

function getReason(player: BoardPlayer): string[] {
    const reasons: string[] = [];

    if (player.type === "batter") {
        reasons.push(
            `Pressure strike rate: ${fmt(player.pressureMetric)} compared with ${fmt(player.normalMetric)} normally, a change of ${player.metricChange >= 0 ? "+" : ""}${fmt(player.metricChange)}.`
        );

        reasons.push(
            `Boundary percentage: ${fmt(player.secondaryPressureMetric)}% under pressure versus ${fmt(player.secondaryNormalMetric)}% normally.`
        );

        reasons.push(
            `${Math.round(player.sampleSize)} pressure balls across ${Math.round(player.pressureMatches)} pressure matches.`
        );
    } else {
        reasons.push(
            `Pressure wicket rate: ${fmt(player.pressureMetric)} versus ${fmt(player.normalMetric)} normally, a change of ${player.metricChange >= 0 ? "+" : ""}${fmt(player.metricChange)} per 100 recorded deliveries.`
        );

        reasons.push(
            `Boundary rate conceded: ${fmt(player.secondaryPressureMetric)} under pressure versus ${fmt(player.secondaryNormalMetric)} normally.`
        );

        reasons.push(
            `${Math.round(player.sampleSize)} pressure deliveries across ${Math.round(player.pressureMatches)} pressure matches.`
        );
    }

    return reasons;
}

export default function IntelligencePanel({ player }: Props) {
    const isBatter = player.type === "batter";
    const reasons = getReason(player);

    return (
        <aside className="intelligence-panel">
            <div className="panel-header">
                <div>
                    <p className="panel-eyebrow">SELECTED PLAYER</p>
                    <p className="panel-category">
                        {isBatter ? "BATTER" : "BOWLER"} · {player.competition}
                    </p>
                </div>
                <span className="panel-rank">
                    #{String(player.rank).padStart(2, "0")}
                </span>
            </div>

            <div className="profile-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={player.image}
                    alt={player.name}
                    onError={(event) => {
                        event.currentTarget.style.display = "none";
                    }}
                />
                <div className="profile-initials">
                    {player.name.split(" ").map((word) => word[0]).join("")}
                </div>
            </div>

            <h2 className="profile-name">{player.name}</h2>

            <p className="profile-role">
                {isBatter ? "Pressure batting profile" : "Pressure bowling profile"}
            </p>

            <div className="primary-stat">
                <div>
                    <span>{player.primaryMetricLabel.toUpperCase()}</span>
                    <strong>{fmt(player.pressureMetric)}</strong>
                </div>
                <div className={`change-pill ${player.metricChange >= 0 ? "positive" : "negative"}`}>
                    {player.metricChange >= 0 ? "+" : ""}
                    {fmt(player.metricChange)}
                </div>
            </div>

            <div className="comparison-grid">
                <div>
                    <span>NORMAL</span>
                    <strong>{fmt(player.normalMetric)}</strong>
                </div>
                <div>
                    <span>PRESSURE</span>
                    <strong>{fmt(player.pressureMetric)}</strong>
                </div>
            </div>

            <div className="panel-sample">
                <div>
                    <span>Pressure matches</span>
                    <strong>{Math.round(player.pressureMatches)}</strong>
                </div>
                <div>
                    <span>{isBatter ? "Pressure balls" : "Pressure deliveries"}</span>
                    <strong>{Math.round(player.sampleSize)}</strong>
                </div>
                <div>
                    <span>Total matches</span>
                    <strong>{Math.round(player.matches)}</strong>
                </div>
            </div>

            <section className="selection-reason">
                <p className="panel-eyebrow">WHY THIS PLAYER?</p>
                <ul>
                    {reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                    ))}
                </ul>
            </section>

            <div className="secondary-stat">
                <div>
                    <span>{player.secondaryMetricLabel}</span>
                    <strong>{fmt(player.secondaryPressureMetric)}%</strong>
                </div>
                <div className="secondary-normal">
                    Normal: {fmt(player.secondaryNormalMetric)}%
                </div>
            </div>

            <div className="reliability-section">
                <div>
                    <span>Sample reliability factor</span>
                    <strong>{Math.round(player.reliability * 100)}%</strong>
                </div>
                <div className="reliability-track">
                    <div style={{ width: `${Math.max(0, Math.min(100, player.reliability * 100))}%` }} />
                </div>
            </div>

            <p className="score-note">
                Format-specific adjusted score: {fmt(player.adjustedScore)}.
                Not directly comparable across player roles or competition formats.
            </p>
        </aside>
    );
}
