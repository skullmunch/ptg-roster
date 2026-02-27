import { useState } from "react";
import type { UnitRowProps } from "../types/props";

export default function UnitRow({
  unit,
  onUpdate,
  onRemove,
  onAddAbility,
  onRemoveAbility,
}: UnitRowProps) {
  const [abilitiesOpen, setAbilitiesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [newAbility, setNewAbility] = useState("");

  return (
    <div className="border-t border-inputbg/40 pt-2 pb-3">
      {/* MAIN GRID */}
      <div className="grid grid-cols-[2fr_1fr_1fr_0.7fr_0.7fr_2.4rem] gap-2 items-center text-xs">
        <input
          className="bg-inputbg p-1 rounded"
          value={unit.name}
          onChange={(e) => onUpdate(unit.id, "name", e.target.value)}
        />

        <input
          className="bg-inputbg p-1 rounded"
          value={unit.path ?? ""}
          placeholder="Path"
          onChange={(e) => onUpdate(unit.id, "path", e.target.value)}
        />

        <input
          className="bg-inputbg p-1 rounded"
          value={unit.rank ?? ""}
          placeholder="Rank"
          onChange={(e) => onUpdate(unit.id, "rank", e.target.value)}
        />

        <input
          type="number"
          className="bg-inputbg p-1 rounded"
          value={unit.points}
          onChange={(e) => onUpdate(unit.id, "points", Number(e.target.value))}
        />

        <input
          type="number"
          className="bg-inputbg p-1 rounded"
          value={unit.battleWounds}
          onChange={(e) =>
            onUpdate(unit.id, "battleWounds", Number(e.target.value))
          }
        />

        <div className="flex justify-end gap-2">
          <button
            className={`px-2 py-1 rounded text-white text-xs ${
              unit.reinforced ? "bg-green-600" : "bg-gray-600"
            }`}
            onClick={() => onUpdate(unit.id, "reinforced", !unit.reinforced)}
          >
            R
          </button>

          <button
            className="text-xs text-text/60 hover:text-text"
            onClick={() => setMoreOpen((v) => !v)}
          >
            {moreOpen ? "Hide" : "More…"}
          </button>

          <button
            className="text-red-500 font-bold"
            onClick={() => onRemove(unit.id)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* COLLAPSIBLE OPTIONAL FIELDS */}
      {moreOpen && (
        <div className="ml-4 mt-2 p-2 bg-inputbg/20 rounded space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <label className="w-24 text-text/70">Battle Scars</label>
            <input
              className="flex-1 bg-inputbg border border-accent/30 rounded px-2 py-1"
              value={unit.battleScars}
              onChange={(e) => onUpdate(unit.id, "battleScars", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-24 text-text/70">Enhancements</label>
            <input
              className="flex-1 bg-inputbg border border-accent/30 rounded px-2 py-1"
              value={unit.enhancements}
              onChange={(e) =>
                onUpdate(unit.id, "enhancements", e.target.value)
              }
            />
          </div>
        </div>
      )}

      {/* ABILITIES TOGGLE */}
      <button
        className="text-accent text-xs underline ml-4 mt-2"
        onClick={() => setAbilitiesOpen((v) => !v)}
      >
        {abilitiesOpen ? "Hide abilities" : "Show abilities"}
      </button>

      {/* ABILITIES SECTION */}
      {abilitiesOpen && (
        <div className="ml-4 mt-2 p-2 bg-inputbg/20 rounded">
          {(unit.abilities ?? []).map((ability, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-xs mb-1"
            >
              <span>{ability}</span>
              <button
                className="text-red-500"
                onClick={() => onRemoveAbility(unit.id, i)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              className="bg-inputbg p-1 rounded text-xs flex-1"
              placeholder="New ability"
              value={newAbility}
              onChange={(e) => setNewAbility(e.target.value)}
            />
            <button
              className="bg-accent text-white px-2 py-1 rounded text-xs"
              onClick={() => {
                if (newAbility.trim().length > 0) {
                  onAddAbility(unit.id, newAbility.trim());
                  setNewAbility("");
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
