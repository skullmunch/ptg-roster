import { useState } from "react";
import type { UnitRowProps } from "../types/props";

export default function UnitRow({
  unit,
  onUpdate,
  onRemove,
  onAddAbility,
  onRemoveAbility,
}: UnitRowProps) {
  const [expanded, setExpanded] = useState(false);

  // Normalise any value into an array
  const toArray = <T,>(value: T[] | T | undefined | null): T[] => {
    if (Array.isArray(value)) return value.filter((v) => v !== "");
    if (value == null || value === "") return [];
    return [value];
  };

  // Safe arrays
  const battleScars = toArray(unit.battleScars);
  const enhancements = toArray(unit.enhancements);
  const abilities = toArray(unit.abilities);

  // Local input states
  const [newPath, setNewPath] = useState("");
  const [addingPath, setAddingPath] = useState(false);

  const [newScar, setNewScar] = useState("");
  const [addingScar, setAddingScar] = useState(false);

  const [newEnh, setNewEnh] = useState("");
  const [addingEnh, setAddingEnh] = useState(false);

  const [newAbility, setNewAbility] = useState("");
  const [addingAbilityInput, setAddingAbilityInput] = useState(false);

  return (
    <div className="border-t border-inputbg/40 pt-3 pb-4 w-full">
      {/* Essentials Bar */}
      <div className="flex items-center justify-between gap-2">
        <input
          className="bg-inputbg p-1 rounded text-sm font-semibold flex-1 min-w-0"
          value={unit.name}
          onChange={(e) => onUpdate(unit.id, "name", e.target.value)}
        />

        <div className="flex items-center gap-2">
          {/* Points */}
          <div className="flex items-center">
            <input
              type="number"
              className="bg-inputbg p-1 rounded w-14 text-right"
              value={unit.points}
              onChange={(e) =>
                onUpdate(unit.id, "points", Number(e.target.value))
              }
            />
            <span className="ml-1 text-[10px] uppercase tracking-wide text-text/40">
              pts
            </span>
          </div>

          {/* Wounds */}
          <div className="flex items-center">
            <input
              type="number"
              className="bg-inputbg p-1 rounded w-14 text-right"
              value={unit.battleWounds}
              onChange={(e) =>
                onUpdate(unit.id, "battleWounds", Number(e.target.value))
              }
            />
            <span className="ml-1 text-[10px] uppercase tracking-wide text-text/40">
              wnds
            </span>
          </div>

          {/* Reinforced */}
          <button
            className={`px-2 py-1 rounded text-white text-xs ${
              unit.reinforced ? "bg-green-600" : "bg-gray-600"
            }`}
            onClick={() => onUpdate(unit.id, "reinforced", !unit.reinforced)}
          >
            R
          </button>

          {/* Expand */}
          <button
            className="text-xs text-text/60 hover:text-text"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "▴" : "▾"}
          </button>

          {/* Remove */}
          <button
            className="text-red-500 font-bold"
            onClick={() => onRemove(unit.id)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-3 flex flex-col gap-4 text-xs">
          {/* PATH + RANK */}
          {!unit.path && !addingPath && (
            <button
              className="text-accent underline text-left"
              onClick={() => setAddingPath(true)}
            >
              Add Path
            </button>
          )}

          {addingPath && (
            <div className="flex gap-2 items-center">
              <input
                className="bg-inputbg p-1 rounded flex-1"
                placeholder="Path name"
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
              />
              <button
                className="bg-accent text-white px-2 py-1 rounded"
                onClick={() => {
                  if (newPath.trim().length > 0) {
                    onUpdate(unit.id, "path", newPath.trim());
                    setNewPath("");
                    setAddingPath(false);
                  }
                }}
              >
                Add
              </button>
            </div>
          )}

          {unit.path && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="w-20 text-text/70">Path</label>
                <input
                  className="bg-inputbg p-1 rounded flex-1"
                  value={unit.path}
                  onChange={(e) => onUpdate(unit.id, "path", e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="w-20 text-text/70">Rank</label>
                <select
                  className="bg-inputbg p-1 rounded flex-1"
                  value={unit.rank ?? ""}
                  onChange={(e) => onUpdate(unit.id, "rank", e.target.value)}
                >
                  <option value="">None</option>
                  <option value="aspiring">Aspiring</option>
                  <option value="elite">Elite</option>
                  <option value="mighty">Mighty</option>
                  <option value="legendary">Legendary</option>
                </select>
              </div>
            </div>
          )}

          {/* BATTLE SCARS */}
          <div>
            <div className="font-semibold mb-1">Battle Scars</div>

            {battleScars.map((scar, i) => (
              <div key={i} className="flex justify-between items-center mb-1">
                <span>{scar}</span>
                <button
                  className="text-red-500"
                  onClick={() =>
                    onUpdate(
                      unit.id,
                      "battleScars",
                      battleScars.filter((_, idx) => idx !== i),
                    )
                  }
                >
                  ✕
                </button>
              </div>
            ))}

            {!addingScar && (
              <button
                className="text-accent underline"
                onClick={() => setAddingScar(true)}
              >
                Add Scar
              </button>
            )}

            {addingScar && (
              <div className="flex gap-2 mt-1">
                <input
                  className="bg-inputbg p-1 rounded flex-1"
                  placeholder="New scar"
                  value={newScar}
                  onChange={(e) => setNewScar(e.target.value)}
                />
                <button
                  className="bg-accent text-white px-2 py-1 rounded"
                  onClick={() => {
                    if (newScar.trim().length > 0) {
                      onUpdate(unit.id, "battleScars", [
                        ...battleScars,
                        newScar.trim(),
                      ]);
                      setNewScar("");
                      setAddingScar(false);
                    }
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* ENHANCEMENTS */}
          <div>
            <div className="font-semibold mb-1">Enhancements</div>

            {enhancements.map((enh, i) => (
              <div key={i} className="flex justify-between items-center mb-1">
                <span>{enh}</span>
                <button
                  className="text-red-500"
                  onClick={() =>
                    onUpdate(
                      unit.id,
                      "enhancements",
                      enhancements.filter((_, idx) => idx !== i),
                    )
                  }
                >
                  ✕
                </button>
              </div>
            ))}

            {!addingEnh && (
              <button
                className="text-accent underline"
                onClick={() => setAddingEnh(true)}
              >
                Add Enhancement
              </button>
            )}

            {addingEnh && (
              <div className="flex gap-2 mt-1">
                <input
                  className="bg-inputbg p-1 rounded flex-1"
                  placeholder="New enhancement"
                  value={newEnh}
                  onChange={(e) => setNewEnh(e.target.value)}
                />
                <button
                  className="bg-accent text-white px-2 py-1 rounded"
                  onClick={() => {
                    if (newEnh.trim().length > 0) {
                      onUpdate(unit.id, "enhancements", [
                        ...enhancements,
                        newEnh.trim(),
                      ]);
                      setNewEnh("");
                      setAddingEnh(false);
                    }
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* ABILITIES */}
          {unit.path && (
            <div>
              <div className="font-semibold mb-1">Abilities</div>

              {abilities.map((ability, i) => (
                <div key={i} className="flex justify-between items-center mb-1">
                  <span>{ability}</span>
                  <button
                    className="text-red-500"
                    onClick={() => onRemoveAbility(unit.id, i)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {!addingAbilityInput && (
                <button
                  className="text-accent underline"
                  onClick={() => setAddingAbilityInput(true)}
                >
                  Add Ability
                </button>
              )}

              {addingAbilityInput && (
                <div className="flex gap-2 mt-1">
                  <input
                    className="bg-inputbg p-1 rounded flex-1"
                    placeholder="New ability"
                    value={newAbility}
                    onChange={(e) => setNewAbility(e.target.value)}
                  />
                  <button
                    className="bg-accent text-white px-2 py-1 rounded"
                    onClick={() => {
                      if (newAbility.trim().length > 0) {
                        onAddAbility(unit.id, newAbility.trim());
                        setNewAbility("");
                        setAddingAbilityInput(false);
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
