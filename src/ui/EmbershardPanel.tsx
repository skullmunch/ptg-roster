import type { EmbershardPanelProps } from "../types/props";

export default function EmbershardPanel({
  total,
  current,
  terrainPurchased,
  totalPoints,
  incTotal,
  decTotal,
  incCurrent,
  decCurrent,
  toggleTerrain,
}: EmbershardPanelProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      {/* Total */}
      <div className="p-4 rounded-lg bg-inputbg/20 border border-accent/40 shadow">
        <span className="text-xs text-text/70">Total Embershards</span>
        <div className="flex items-center justify-between mt-1">
          <button className="px-2 py-1 bg-accent rounded" onClick={decTotal}>
            -
          </button>
          <span className="text-xl font-semibold">{total}</span>
          <button className="px-2 py-1 bg-accent rounded" onClick={incTotal}>
            +
          </button>
        </div>
      </div>

      {/* Current */}
      <div className="p-4 rounded-lg bg-inputbg/20 border border-accent/40 shadow">
        <span className="text-xs text-text/70">Current Embershards</span>
        <div className="flex items-center justify-between mt-1">
          <button className="px-2 py-1 bg-accent rounded" onClick={decCurrent}>
            -
          </button>
          <span className="text-xl font-semibold">{current}</span>
          <button className="px-2 py-1 bg-accent rounded" onClick={incCurrent}>
            +
          </button>
        </div>
      </div>

      {/* Points + Terrain */}
      <div className="p-4 rounded-lg bg-inputbg/20 border border-accent/40 shadow">
        <span className="text-xs text-text/70">Total Army Points</span>
        <span className="text-2xl font-bold mt-1 block">{totalPoints}</span>
        <button
          className={`mt-2 text-xs px-2 py-1 rounded ${
            terrainPurchased ? "bg-accent" : "bg-inputbg/40"
          }`}
          onClick={toggleTerrain}
        >
          Terrain: {terrainPurchased ? "Purchased" : "Not Purchased"}
        </button>
      </div>
    </section>
  );
}
