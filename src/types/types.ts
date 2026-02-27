// -----------------------------
// Core Unit Type
// -----------------------------
export interface Unit {
  id: string;
  name: string;

  // Core progression fields
  path: string;
  rank: string;

  // Stats
  points: number;
  battleWounds: number;

  // Flags
  reinforced: boolean;

  // Optional campaign fields
  battleScars: string;
  enhancements: string;

  // Abilities
  abilities: string[];
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
  notes?: string;
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
