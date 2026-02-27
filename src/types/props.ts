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
  onUpdate: (field: keyof Unit, value: any) => void;
  onRemove: () => void;
}

// -----------------------------
// RegimentCard Props
// -----------------------------
export interface RegimentCardProps {
  regiment: Regiment;
  regimentPoints: number;
  onRename: (name: string) => void;
  onRemove: () => void;
  onToggle: () => void;
  onAddUnit: () => void;
  onUpdateUnit: (unitId: string, field: keyof Unit, value: any) => void;
  onRemoveUnit: (unitId: string) => void;
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
}
