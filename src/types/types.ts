// -----------------------------
// Core Unit Type
// -----------------------------
export interface Unit {
  id: string;
  name: string;
  points: number;
  veteranLevel: number;
  reinforced: boolean;
}

// -----------------------------
// Regiment Type
// -----------------------------
export interface Regiment {
  id: string;
  name: string;
  units: Unit[];
  isOpen: boolean;
}

// -----------------------------
// Spell Type
// -----------------------------
export interface Spell {
  id: string;
  name: string;
}

// -----------------------------
// Roster Data (mutable section)
// -----------------------------
export interface RosterData {
  theme: string;
  totalEmbershards: number;
  currentEmbershards: number;
  terrainPurchased: boolean;
  regiments: Regiment[];
  spells: Spell[];
}

// -----------------------------
// Full Roster
// -----------------------------
export interface Roster {
  id: string;
  name: string;
  formation: string;
  faction?: string;
  data: RosterData;
}
