import type { RegimentCardProps } from "../types/props";
import UnitRow from "./UnitRow";

export default function RegimentCard({
  regiment,
  onRename,
  onRemove,
  onToggle,
  onAddUnit,
  onUpdateUnit,
  onRemoveUnit,
  regimentPoints,
}: RegimentCardProps) {
  return (
    <div className="rounded-lg border border-accent/40 bg-inputbg/20 shadow">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-inputbg/30 border-b border-accent/30">
        <div className="flex items-center gap-2">
          <button onClick={onToggle}>{regiment.isOpen ? "▾" : "▸"}</button>
          <input
            className="bg-transparent border-b border-transparent focus:border-accent/60 outline-none text-sm"
            value={regiment.name}
            onChange={(e) => onRename(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-text/70">{regimentPoints} pts</span>
          <button
            className="text-xs px-2 py-1 bg-red-600 text-white rounded"
            onClick={onRemove}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Body */}
      {regiment.isOpen && (
        <div className="px-4 py-3 space-y-3">
          <button
            className="px-2 py-1 bg-accent rounded text-xs"
            onClick={onAddUnit}
          >
            + Add Unit
          </button>

          {regiment.units.length === 0 && (
            <p className="text-xs text-text/60 italic">
              No units in this regiment.
            </p>
          )}

          {regiment.units.map((u) => (
            <UnitRow
              key={u.id}
              unit={u}
              onUpdate={(field, value) => onUpdateUnit(u.id, field, value)}
              onRemove={() => onRemoveUnit(u.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
