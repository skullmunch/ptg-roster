import type { Regiment, Unit, Spell } from "./types";

// -----------------------------
// EmbershardPanel Props
// -----------------------------
export interface EmbershardPanelProps {
  total: number;
  current: number;
  terrainPurchased: boolean;
  totalPoints: number;
  incTotal: () => void;
  decTotal: () => void;
  incCurrent: () => void;
  decCurrent: () => void;
  toggleTerrain: () => void;
}

// -----------------------------
// UnitRow Props
// -----------------------------
export interface UnitRowProps {
  unit: Unit;

  // Must match UnitRow.tsx exactly
  onUpdate: (id: string, field: keyof Unit, value: any) => void;
  onRemove: (id: string) => void;

  onAddAbility: (id: string, ability: string) => void;
  onRemoveAbility: (id: string, index: number) => void;
}

// -----------------------------
// RegimentCard Props
// -----------------------------
export interface RegimentCardProps {
  regiment: Regiment;
  onRename: (name: string) => void;
  onRemove: () => void;
  onToggle: () => void;

  onAddUnit: () => void;
  onUpdateUnit: (id: string, field: keyof Unit, value: any) => void;
  onRemoveUnit: (id: string) => void;

  // Must match UnitRow exactly
  onAddAbility: (id: string, ability: string) => void;
  onRemoveAbility: (id: string, index: number) => void;

  regimentPoints: number;
}

// -----------------------------
// SpellList Props
// -----------------------------
export interface SpellListProps {
  spells: Spell[];
  spellsOpen: boolean;
  newSpellName: string;
  setNewSpellName: (value: string) => void;
  onToggle: () => void;
  onAdd: () => void;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}
