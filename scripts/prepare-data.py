
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "outputs"
PUBLIC_DATA = Path(__file__).resolve().parents[1] / "public" / "data"

PUBLIC_DATA.mkdir(parents=True, exist_ok=True)


def read_csv(path):
    with open(path, "r", newline="", encoding="utf-8-sig") as file:
        return list(csv.DictReader(file))


def write_csv(path, rows):
    if not rows:
        raise ValueError(f"No rows to write: {path}")

    with open(path, "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def prepare_batters():
    selected = read_csv(OUTPUT / "final_top10_batters.csv")
    eligible = read_csv(OUTPUT / "all_eligible_batters.csv")

    lookup = {
        (row["striker_name"], row["competition_group"]): row
        for row in eligible
    }

    result = []

    for player in selected:
        key = (player["player_name"], player["competition_source"])

        if key not in lookup:
            raise ValueError(f"Missing batter analytics: {key}")

        metrics = lookup[key]

        result.append({
            "rank": player["rank"],
            "player_name": player["player_name"],
            "competition_source": player["competition_source"],
            "matches": metrics["matches"],
            "pressure_matches": metrics["pressure_matches"],
            "balls_faced_normal": metrics["balls_faced_normal"],
            "balls_faced_pressure": metrics["balls_faced_pressure"],
            "strike_rate_normal": metrics["strike_rate_normal"],
            "strike_rate_pressure": metrics["strike_rate_pressure"],
            "strike_rate_change": metrics["strike_rate_change"],
            "boundary_percentage_normal": metrics["boundary_percentage_normal"],
            "boundary_percentage_pressure": metrics["boundary_percentage_pressure"],
            "dismissal_rate_normal": metrics["dismissal_rate_normal"],
            "dismissal_rate_pressure": metrics["dismissal_rate_pressure"],
            "adjusted_score": metrics["adjusted_score"],
            "reliability_factor": metrics["reliability_factor"],
        })

    write_csv(PUBLIC_DATA / "batters.csv", result)
    print(f"Created batters.csv: {len(result)} players")


def prepare_bowlers():
    selected = read_csv(OUTPUT / "final_top10_bowlers.csv")
    eligible = read_csv(OUTPUT / "all_eligible_bowlers.csv")

    lookup = {
        (row["bowler_name"], row["competition_group"]): row
        for row in eligible
    }

    result = []

    for player in selected:
        key = (player["player_name"], player["competition_source"])

        if key not in lookup:
            raise ValueError(f"Missing bowler analytics: {key}")

        metrics = lookup[key]

        result.append({
            "rank": player["rank"],
            "player_name": player["player_name"],
            "competition_source": player["competition_source"],
            "matches": metrics["matches"],
            "pressure_matches": metrics["pressure_matches"],
            "deliveries_normal": metrics["deliveries_normal"],
            "deliveries_pressure": metrics["deliveries_pressure"],
            "wicket_rate_normal": metrics["wicket_rate_normal"],
            "wicket_rate_pressure": metrics["wicket_rate_pressure"],
            "wicket_rate_change": metrics["wicket_rate_change"],
            "boundary_rate_normal": metrics["boundary_rate_normal"],
            "boundary_rate_pressure": metrics["boundary_rate_pressure"],
            "adjusted_score": metrics["adjusted_score"],
            "reliability_factor": metrics["reliability_factor"],
        })

    write_csv(PUBLIC_DATA / "bowlers.csv", result)
    print(f"Created bowlers.csv: {len(result)} players")


if __name__ == "__main__":
    prepare_batters()
    prepare_bowlers()
    print("Dashboard datasets prepared successfully.")
