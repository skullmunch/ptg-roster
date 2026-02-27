import type { UnitRowProps } from "../types/props";

export default function UnitRow({ unit, onUpdate, onRemove }: UnitRowProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-2 items-center text-xs border-t border-inputbg/40 pt-2">
      <input
        className="bg-inputbg border border-inputbg/60 rounded px-2 py-1"
        value={unit.name}
        onChange={(e) => onUpdate("name", e.target.value)}
      />

      <input
        type="number"
        className="bg-inputbg border border-inputbg/60 rounded px-2 py-1 text-center"
        value={unit.points}
        onChange={(e) => onUpdate("points", Number(e.target.value))}
      />

      <input
        type="number"
        className="bg-inputbg border border-inputbg/60 rounded px-2 py-1 text-center"
        value={unit.veteranLevel}
        onChange={(e) => onUpdate("veteranLevel", Number(e.target.value))}
      />

      <div className="flex items-center gap-2 justify-end">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={unit.reinforced}
            onChange={(e) => onUpdate("reinforced", e.target.checked)}
          />
          <span>Reinf.</span>
        </label>

        <button
          className="px-2 py-1 bg-red-600 text-white rounded"
          onClick={onRemove}
        >
          X
        </button>
      </div>
    </div>
  );
}
