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
  onUpdateNotes,
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

          {spells.map((spell) => (
            <div
              key={spell.id}
              className="flex flex-col gap-2 p-2 bg-inputbg/20 rounded"
            >
              <input
                className="bg-inputbg p-1 rounded"
                value={spell.name}
                onChange={(e) => onRename(spell.id, e.target.value)}
              />

              <textarea
                className="bg-inputbg p-1 rounded text-sm"
                placeholder="Notes (optional)"
                value={spell.notes ?? ""}
                onChange={(e) => onUpdateNotes(spell.id, e.target.value)}
              />

              <button
                className="text-red-500 text-xs"
                onClick={() => onRemove(spell.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
