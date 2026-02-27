import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoster, saveRoster } from "../storage/rosterStorage";
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

    setRoster(safe);
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
              units: [
                ...r.units,
                {
                  id: crypto.randomUUID(),
                  name: "New Unit",
                  points: 0,
                  reinforced: false,

                  // New fields your UnitRow expects:
                  path: "",
                  rank: "",
                  battleWounds: 0,
                  battleScars: "",
                  enhancements: "",
                  abilities: [], // ← this prevents the blank page
                },
              ],
            }
          : r,
      ),
    );

  const updateUnit = (
    regId: string,
    unitId: string,
    field: keyof Unit,
    value: any,
  ) =>
    setRegiments(
      regiments.map((r) =>
        r.id === regId
          ? {
              ...r,
              units: r.units.map((u) =>
                u.id === unitId ? { ...u, [field]: value } : u,
              ),
            }
          : r,
      ),
    );

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
    setRoster((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        spells: prev.data.spells.map((s) =>
          s.id === spellId ? { ...s, notes } : s,
        ),
      },
    }));
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
          <div className="absolute inset-0 opacity-10 bg-[url('/textures/parchment.png')] pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">
                {roster.name}
              </h1>
              <p className="text-sm text-text/70 mt-1">{roster.formation}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-inputbg/40 flex items-center justify-center shadow-inner">
                {FACTION_ICONS[roster.faction ?? "cities"]}
              </div>

              <select
                className="border border-accent/40 rounded bg-inputbg text-inputtext px-2 py-1 text-xs"
                value={theme}
                onChange={(e) => updateData({ theme: e.target.value })}
              >
                <option value="default">Default</option>
                <option value="theme-soulblight">Soulblight</option>
                <option value="theme-nighthaunt">Nighthaunt</option>
                <option value="theme-stormcast">Stormcast</option>
                <option value="theme-orruk">Orruk</option>
                <option value="theme-ogor">Ogor</option>
                <option value="theme-seraphon">Seraphon</option>
                <option value="theme-fyreslayers">Fyreslayers</option>
                <option value="theme-kharadron">Kharadron</option>
                <option value="theme-sylvaneth">Sylvaneth</option>
                <option value="theme-cities">Cities of Sigmar</option>
              </select>
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
    </main>
  );
}
