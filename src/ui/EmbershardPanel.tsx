import type { EmbershardPanelProps } from "../types/props";
import { useState } from "react";

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
  const [editTotal, setEditTotal] = useState(false);
  const [editCurrent, setEditCurrent] = useState(false);

  // Shared square button style
  const squareBtn =
    "w-8 h-8 flex items-center justify-center bg-accent rounded";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      {/* Total */}
      <div className="p-4 rounded-lg bg-inputbg/20 border border-accent/40 shadow text-center">
        <span className="text-xs text-text/70 block text-center">
          Total Embershards
        </span>

        <div className="flex items-center justify-between mt-1">
          {/* Left button */}
          {editTotal ? (
            <button
              className={squareBtn}
              onMouseDown={(e) => e.preventDefault()}
              onClick={decTotal}
            >
              -
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}

          {/* Centered number */}
          <button
            className="text-2xl font-bold bg-transparent cursor-pointer select-none text-center w-full"
            onClick={() => setEditTotal(true)}
            onBlur={() => setEditTotal(false)}
          >
            {total}
          </button>

          {/* Right button */}
          {editTotal ? (
            <button
              className={squareBtn}
              onMouseDown={(e) => e.preventDefault()}
              onClick={incTotal}
            >
              +
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      </div>

      {/* Current */}
      <div className="p-4 rounded-lg bg-inputbg/20 border border-accent/40 shadow text-center">
        <span className="text-xs text-text/70 block text-center">
          Current Embershards
        </span>

        <div className="flex items-center justify-between mt-1">
          {/* Left button */}
          {editCurrent ? (
            <button
              className={squareBtn}
              onMouseDown={(e) => e.preventDefault()}
              onClick={decCurrent}
            >
              -
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}

          {/* Centered number */}
          <button
            className="text-2xl font-bold bg-transparent cursor-pointer select-none text-center w-full"
            onClick={() => setEditCurrent(true)}
            onBlur={() => setEditCurrent(false)}
          >
            {current}
          </button>

          {/* Right button */}
          {editCurrent ? (
            <button
              className={squareBtn}
              onMouseDown={(e) => e.preventDefault()}
              onClick={incCurrent}
            >
              +
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}
        </div>
      </div>

      {/* Points + Terrain */}
      <div className="p-4 rounded-lg bg-inputbg/20 border border-accent/40 shadow flex flex-col items-center text-center">
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
