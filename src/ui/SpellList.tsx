import type { SpellListProps } from "../types/props";

export default function SpellList({
  spells,
  spellsOpen,
  newSpellName,
  setNewSpellName,
  onToggle,
  onAdd,
  onRename,
  onRemove,
}: SpellListProps) {
  return (
    <section className="space-y-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-xl font-bold tracking-wide">Spells</h2>
        <span className="text-xs">{spellsOpen ? "Hide" : "Show"}</span>
      </div>

      {spellsOpen && (
        <div className="space-y-3">
          <div className="flex gap-2 text-sm">
            <input
              className="border border-accent/40 rounded bg-inputbg text-inputtext px-2 py-1 flex-1"
              placeholder="New spell name"
              value={newSpellName}
              onChange={(e) => setNewSpellName(e.target.value)}
            />
            <button className="px-3 py-1 bg-accent rounded" onClick={onAdd}>
              + Add Spell
            </button>
          </div>

          {spells.length === 0 && (
            <p className="text-xs text-text/60 italic">No spells yet.</p>
          )}

          {spells.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between border-b border-inputbg/40 py-1 text-xs"
            >
              <input
                className="bg-inputbg border border-inputbg/60 rounded px-2 py-1 flex-1 mr-2"
                value={s.name}
                onChange={(e) => onRename(s.id, e.target.value)}
              />

              <button
                className="px-2 py-1 bg-red-600 text-white rounded"
                onClick={() => onRemove(s.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
