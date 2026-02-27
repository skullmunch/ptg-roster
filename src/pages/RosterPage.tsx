import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoster, saveRoster, createNewUnit } from "../storage/rosterStorage";
import type { Roster, RosterData, Regiment, Unit, Spell } from "../types/types";
import NavBar from "../ui/NavBar";
import EmbershardPanel from "../ui/EmbershardPanel";
import RegimentCard from "../ui/RegimentCard";
import SpellList from "../ui/SpellList";
import { FACTION_ICONS } from "../ui/FactionIcons";

export default function RosterPage() {
  const { id } = useParams();

  // -----------------------------
  // HOOKS (must stay at top)
  // -----------------------------
  const [roster, setRoster] = useState<Roster | null>(null);
  const [newRegimentName, setNewRegimentName] = useState("");
  const [newSpellName, setNewSpellName] = useState("");
  const [spellsOpen, setSpellsOpen] = useState(true);
  const [themeModal, setThemeModal] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingFormation, setEditingFormation] = useState(false);

  // Load roster
  useEffect(() => {
    const raw = getRoster(id);
    if (!raw) return;

    const safe: Roster = {
      ...raw,
      data: {
        theme: raw.data?.theme ?? "default",
        totalEmbershards: raw.data?.totalEmbershards ?? 0,
        currentEmbershards: raw.data?.currentEmbershards ?? 0,
        terrainPurchased: raw.data?.terrainPurchased ?? false,
        regiments: raw.data?.regiments ?? [],
        spells: raw.data?.spells ?? [],
      },
    };

    queueMicrotask(() => {
      setRoster(safe);
    });
  }, [id]);

  // Autosave
  useEffect(() => {
    if (roster) saveRoster(roster);
  }, [roster]);

  // Apply theme
  useEffect(() => {
    if (!roster) return;
    const theme = roster.data.theme;
    document.documentElement.className = theme === "default" ? "" : theme;
  }, [roster]);

  // Compute totals BEFORE skeleton
  const totalArmyPoints = useMemo(() => {
    if (!roster) return 0;
    return roster.data.regiments.reduce(
      (sum, reg) => sum + reg.units.reduce((uSum, u) => uSum + u.points, 0),
      0,
    );
  }, [roster]);

  // -----------------------------
  // SKELETON LOADER
  // -----------------------------
  if (!roster) {
    return (
      <main className="min-h-screen bg-bg text-text p-6">
        <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
          <div className="h-8 w-64 bg-inputbg/40 rounded" />
          <div className="h-4 w-80 bg-inputbg/30 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="h-20 bg-inputbg/30 rounded" />
            <div className="h-20 bg-inputbg/30 rounded" />
            <div className="h-20 bg-inputbg/30 rounded" />
          </div>
          <div className="h-6 w-40 bg-inputbg/40 rounded" />
          <div className="h-16 bg-inputbg/30 rounded" />
        </div>
      </main>
    );
  }

  // -----------------------------
  // SAFE ACCESS TO DATA
  // -----------------------------
  const {
    theme,
    totalEmbershards,
    currentEmbershards,
    terrainPurchased,
    regiments,
    spells,
  } = roster.data;

  const updateData = (patch: Partial<RosterData>) =>
    setRoster((prev) =>
      prev ? { ...prev, data: { ...prev.data, ...patch } } : prev,
    );

  // Embershards
  const incTotal = () => updateData({ totalEmbershards: totalEmbershards + 1 });
  const decTotal = () =>
    updateData({ totalEmbershards: Math.max(0, totalEmbershards - 1) });

  const incCurrent = () =>
    updateData({ currentEmbershards: currentEmbershards + 1 });
  const decCurrent = () =>
    updateData({ currentEmbershards: Math.max(0, currentEmbershards - 1) });

  // Terrain
  const toggleTerrain = () =>
    updateData({ terrainPurchased: !terrainPurchased });

  // Regiments
  const setRegiments = (value: Regiment[]) => updateData({ regiments: value });

  const addRegiment = () => {
    if (!newRegimentName.trim()) return;
    const reg: Regiment = {
      id: crypto.randomUUID(),
      name: newRegimentName.trim(),
      units: [],
      isOpen: true,
    };
    setRegiments([...regiments, reg]);
    setNewRegimentName("");
  };

  const removeRegiment = (regId: string) =>
    setRegiments(regiments.filter((r) => r.id !== regId));

  const toggleRegiment = (regId: string) =>
    setRegiments(
      regiments.map((r) => (r.id === regId ? { ...r, isOpen: !r.isOpen } : r)),
    );

  const renameRegiment = (regId: string, name: string) =>
    setRegiments(regiments.map((r) => (r.id === regId ? { ...r, name } : r)));

  // Units
  const addUnit = (regId: string) =>
    setRegiments(
      regiments.map((r) =>
        r.id === regId
          ? {
              ...r,
              units: [...r.units, createNewUnit()],
            }
          : r,
      ),
    );

  const updateUnit = <K extends keyof Unit>(
    regId: string,
    unitId: string,
    field: K,
    value: Unit[K],
  ) => {
    setRoster((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: {
          ...prev.data,
          regiments: prev.data.regiments.map((reg) =>
            reg.id !== regId
              ? reg
              : {
                  ...reg,
                  units: reg.units.map((u) =>
                    u.id !== unitId ? u : { ...u, [field]: value },
                  ),
                },
          ),
        },
      };
    });
  };

  const removeUnit = (regId: string, unitId: string) =>
    setRegiments(
      regiments.map((r) =>
        r.id === regId
          ? {
              ...r,
              units: r.units.filter((u) => u.id !== unitId),
            }
          : r,
      ),
    );

  const addAbility = (unitId: string, ability: string) => {
    setRegiments(
      regiments.map((r) => ({
        ...r,
        units: r.units.map((u) =>
          u.id === unitId ? { ...u, abilities: [...u.abilities, ability] } : u,
        ),
      })),
    );
  };

  const removeAbility = (unitId: string, index: number) => {
    setRegiments(
      regiments.map((r) => ({
        ...r,
        units: r.units.map((u) =>
          u.id === unitId
            ? {
                ...u,
                abilities: u.abilities.filter((_, i) => i !== index),
              }
            : u,
        ),
      })),
    );
  };

  // Spells
  const setSpellsState = (value: Spell[]) => updateData({ spells: value });

  const addSpell = () => {
    if (!newSpellName.trim()) return;
    const spell: Spell = {
      id: crypto.randomUUID(),
      name: newSpellName.trim(),
    };
    setSpellsState([...spells, spell]);
    setNewSpellName("");
  };

  const updateSpellNotes = (spellId: string, notes: string) => {
    setRoster((prev) => {
      if (!prev) return prev; // <-- must be here, before returning an object

      return {
        ...prev,
        data: {
          ...prev.data,
          spells: prev.data.spells.map((s) =>
            s.id === spellId ? { ...s, notes } : s,
          ),
        },
      };
    });
  };

  const removeSpell = (spellId: string) =>
    setSpellsState(spells.filter((s) => s.id !== spellId));

  const renameSpell = (spellId: string, name: string) =>
    setSpellsState(spells.map((s) => (s.id === spellId ? { ...s, name } : s)));

  const regimentPoints = (reg: Regiment) =>
    reg.units.reduce((sum, u) => sum + u.points, 0);

  // -----------------------------
  // FULL DELUXE UI (now modular)
  // -----------------------------
  return (
    <main className="min-h-screen bg-bg text-text">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-10">
        {/* HEADER */}
        <header className="relative p-6 rounded-xl bg-gradient-to-br from-bg/60 to-bg/20 border border-accent/40 shadow-lg overflow-hidden">
          <div className="relative flex items-center justify-between">
            <div className="space-y-1">
              {/* Editable Roster Name */}
              <div className="flex items-center gap-2">
                {editingName ? (
                  <input
                    className="bg-inputbg border border-accent/40 rounded px-2 py-1 text-xl font-bold"
                    value={roster.name}
                    onChange={(e) =>
                      setRoster((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev,
                      )
                    }
                    onBlur={() => setEditingName(false)}
                    autoFocus
                  />
                ) : (
                  <h1 className="text-3xl font-bold tracking-wide">
                    {roster.name}
                  </h1>
                )}

                <button
                  className="text-text/60 hover:text-text"
                  onClick={() => setEditingName(true)}
                >
                  <svg
                    className="w-4 h-4 text-text/60 hover:text-text"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-9.193 9.193L4 16l.393-3.221 9.193-9.193z" />
                  </svg>
                </button>
              </div>

              {/* Editable Formation */}
              <div className="flex items-center gap-2">
                {editingFormation ? (
                  <input
                    className="bg-inputbg border border-accent/40 rounded px-2 py-1 text-sm"
                    value={roster.formation}
                    onChange={(e) =>
                      setRoster((prev) =>
                        prev ? { ...prev, formation: e.target.value } : prev,
                      )
                    }
                    onBlur={() => setEditingFormation(false)}
                    autoFocus
                  />
                ) : (
                  <p className="text-sm text-text/70">{roster.formation}</p>
                )}

                <button
                  className="text-text/60 hover:text-text"
                  onClick={() => setEditingFormation(true)}
                >
                  <svg
                    className="w-4 h-4 text-text/60 hover:text-text"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-9.193 9.193L4 16l.393-3.221 9.193-9.193z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-inputbg/40 flex items-center justify-center shadow-inner">
                {FACTION_ICONS[roster.faction ?? "cities"]}
              </div>

              {/* Theme Picker */}
              <button
                onClick={() => setThemeModal(true)}
                className="px-3 py-1 text-xs border border-accent/40 rounded hover:border-accent transition"
              >
                Change Theme
              </button>
            </div>
          </div>
        </header>

        {/* EMBERSHARDS PANEL */}
        <EmbershardPanel
          total={totalEmbershards}
          current={currentEmbershards}
          terrainPurchased={terrainPurchased}
          totalPoints={totalArmyPoints}
          incTotal={incTotal}
          decTotal={decTotal}
          incCurrent={incCurrent}
          decCurrent={decCurrent}
          toggleTerrain={toggleTerrain}
        />

        {/* REGIMENTS */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-wide">Regiments</h2>

          <div className="flex gap-2 text-sm">
            <input
              className="border border-accent/40 rounded bg-inputbg text-inputtext px-2 py-1 flex-1"
              placeholder="New regiment name"
              value={newRegimentName}
              onChange={(e) => setNewRegimentName(e.target.value)}
            />
            <button
              className="px-3 py-1 bg-accent rounded"
              onClick={addRegiment}
            >
              + Add Regiment
            </button>
          </div>

          <div className="space-y-4">
            {regiments.length === 0 && (
              <p className="text-xs text-text/60 italic">No regiments yet.</p>
            )}

            {regiments.map((reg) => (
              <RegimentCard
                key={reg.id}
                regiment={reg}
                regimentPoints={regimentPoints(reg)}
                onRename={(name) => renameRegiment(reg.id, name)}
                onRemove={() => removeRegiment(reg.id)}
                onToggle={() => toggleRegiment(reg.id)}
                onAddUnit={() => addUnit(reg.id)}
                onUpdateUnit={(unitId, field, value) =>
                  updateUnit(reg.id, unitId, field, value)
                }
                onRemoveUnit={(unitId) => removeUnit(reg.id, unitId)}
                onAddAbility={addAbility}
                onRemoveAbility={removeAbility}
              />
            ))}
          </div>
        </section>

        {/* SPELLS */}
        <SpellList
          spells={spells}
          spellsOpen={spellsOpen}
          newSpellName={newSpellName}
          setNewSpellName={setNewSpellName}
          onToggle={() => setSpellsOpen((o) => !o)}
          onAdd={addSpell}
          onRename={renameSpell}
          onRemove={removeSpell}
          onUpdateNotes={updateSpellNotes}
        />
      </div>
      {themeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-bg p-4 rounded-xl border border-accent/40 max-w-md w-full max-h-[80vh] overflow-y-auto space-y-4 shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Choose Theme</h2>
              <button
                onClick={() => setThemeModal(false)}
                className="text-text/60 hover:text-text"
              >
                ✕
              </button>
            </div>

            {/* Theme Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "default", name: "Default" },
                { id: "theme-soulblight", name: "Soulblight" },
                { id: "theme-nighthaunt", name: "Nighthaunt" },
                { id: "theme-stormcast", name: "Stormcast" },
                { id: "theme-orruk", name: "Orruk" },
                { id: "theme-ogor", name: "Ogor" },
                { id: "theme-seraphon", name: "Seraphon" },
                { id: "theme-fyreslayers", name: "Fyreslayers" },
                { id: "theme-kharadron", name: "Kharadron" },
                { id: "theme-sylvaneth", name: "Sylvaneth" },
                { id: "theme-cities", name: "Cities" },
                { id: "theme-lumineth", name: "Lumineth" },
                { id: "theme-idoneth", name: "Idoneth" },
                { id: "theme-khaine", name: "Daughters of Khaine" },
                { id: "theme-slaves", name: "Slaves to Darkness" },
                { id: "theme-khorne", name: "Khorne" },
                { id: "theme-tzeentch", name: "Tzeentch" },
                { id: "theme-nurgle", name: "Nurgle" },
                { id: "theme-slaanesh", name: "Slaanesh" },
                { id: "theme-skaven", name: "Skaven" },
                { id: "theme-helsmiths", name: "Helsmiths" },
                { id: "theme-bonereapers", name: "Bonereapers" },
                { id: "theme-fecc", name: "FEC" },
                { id: "theme-gitz", name: "Gitz" },
                { id: "theme-behemat", name: "Behemat" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    updateData({ theme: t.id });
                    setThemeModal(false);
                  }}
                  className={`
              flex items-center gap-3 p-2 rounded-md border transition text-xs
              ${
                theme === t.id
                  ? "border-accent bg-accent/20 shadow-sm"
                  : "border-inputbg/40 hover:border-accent/40"
              }
            `}
                >
                  {/* Theme preview swatch */}
                  <div className={t.id}>
                    <div className="w-10 h-6 rounded overflow-hidden flex flex-col">
                      <div
                        className="flex-1"
                        style={{
                          background:
                            t.id === "default" ? "#1e1e1e" : "var(--color-bg)",
                        }}
                      />
                      <div
                        className="h-1"
                        style={{
                          background:
                            t.id === "default"
                              ? "#6b7280"
                              : "var(--color-accent)",
                        }}
                      />
                      <div
                        className="flex-1"
                        style={{
                          background:
                            t.id === "default"
                              ? "#2a2a2a"
                              : "var(--color-input-bg)",
                        }}
                      />
                    </div>
                  </div>

                  <span className="leading-tight">{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
