import type { GameEntry, UpgradeEntry } from "../types/types";

interface Props {
  total: number;
  current: number;
  games: GameEntry[];
  upgrades: UpgradeEntry[];
}

export default function EconomySummary({
  total,
  current,
  games,
  upgrades,
}: Props) {
  const totalEarnedFromGames = games.reduce((sum, g) => sum + g.shards, 0);
  const totalSpentOnUpgrades = upgrades.reduce((sum, u) => sum + u.cost, 0);

  return (
    <div className="p-4 bg-inputbg/20 border border-inputbg/40 rounded-xl space-y-2">
      <h3 className="text-lg font-bold tracking-wide">Economy Summary</h3>

      <div className="text-sm space-y-1">
        <p>
          <span className="font-semibold">Total Earned:</span> {total} shards
        </p>

        <p>
          <span className="font-semibold">Current Available:</span> {current}{" "}
          shards
        </p>

        <p>
          <span className="font-semibold">Earned from Games:</span>{" "}
          {totalEarnedFromGames} shards
        </p>

        <p>
          <span className="font-semibold">Spent on Upgrades:</span>{" "}
          {totalSpentOnUpgrades} shards
        </p>
      </div>

      <p className="text-xs italic text-text/60">
        This summary updates automatically as you log games and upgrades.
      </p>
    </div>
  );
}
