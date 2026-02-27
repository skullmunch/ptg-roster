// rosterStorage.ts
import type {
  Roster,
  Spell,
  Regiment,
  Unit,
  GameEntry,
  UpgradeEntry,
} from "../types/types";
const STORAGE_KEY = "rosters";

// Normalise any value into a clean array
function toArray<T>(value: T[] | T | undefined | null): T[] {
  if (Array.isArray(value)) return value.filter((v) => v !== "");
  if (value == null || value === "") return [];
  return [value];
}

// Normalise a single unit object
function repairUnit(u: unknown): Unit {
  const raw = u as Record<string, unknown>;

  return {
    id: typeof raw.id === "string" ? raw.id : crypto.randomUUID(),
    name: typeof raw.name === "string" ? raw.name : "New Unit",

    path: typeof raw.path === "string" ? raw.path : null,
    rank: typeof raw.rank === "string" ? raw.rank : null,

    points:
      typeof raw.points === "number" ? raw.points : Number(raw.points ?? 0),

    battleWounds:
      typeof raw.battleWounds === "number"
        ? raw.battleWounds
        : Number(raw.battleWounds ?? 0),

    reinforced: Boolean(raw.reinforced),

    battleScars: toArray(
      Array.isArray(raw.battleScars)
        ? (raw.battleScars as unknown[])
        : raw.battleScars,
    ) as string[],

    enhancements: toArray(
      Array.isArray(raw.enhancements)
        ? (raw.enhancements as unknown[])
        : raw.enhancements,
    ) as string[],

    abilities: toArray(
      Array.isArray(raw.abilities)
        ? (raw.abilities as unknown[])
        : raw.abilities,
    ) as string[],
  };
}

// Normalise a regiment and all its units
function repairRegiment(r: unknown): Regiment {
  const raw = r as Record<string, unknown>;

  return {
    id: typeof raw.id === "string" ? raw.id : crypto.randomUUID(),
    name: typeof raw.name === "string" ? raw.name : "Unnamed Regiment",
    isOpen: typeof raw.isOpen === "boolean" ? raw.isOpen : true,

    units: Array.isArray(raw.units) ? raw.units.map((u) => repairUnit(u)) : [],
  };
}

export function createNewUnit() {
  return {
    id: crypto.randomUUID(),
    name: "",
    points: 0,
    battleWounds: 0,
    reinforced: false,

    // Conditional fields start empty
    path: null,
    rank: null,

    // Always arrays
    battleScars: [],
    enhancements: [],
    abilities: [],
  };
}

export function loadAll(): Roster[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => repairRoster(item));
  } catch {
    return [];
  }
}

export function saveAll(rosters: Roster[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
}

// Ensures every roster has a complete, valid data object
export function repairRoster(raw: unknown): Roster {
  const r = raw as Record<string, unknown>;

  const data = (r.data as Record<string, unknown>) ?? {};

  return {
    id: typeof r.id === "string" ? r.id : crypto.randomUUID(),
    name: typeof r.name === "string" ? r.name : "Unnamed Roster",
    formation: typeof r.formation === "string" ? r.formation : "",
    faction: typeof r.faction === "string" ? r.faction : "cities",
    lastUpdated: typeof r.lastUpdated === "number" ? r.lastUpdated : Date.now(),

    data: {
      spells: Array.isArray(data.spells) ? (data.spells as Spell[]) : [],
      games: Array.isArray(data.games) ? (data.games as GameEntry[]) : [],
      upgrades: Array.isArray(data.upgrades)
        ? (data.upgrades as UpgradeEntry[])
        : [],
      theme: typeof data.theme === "string" ? data.theme : "default",
      totalEmbershards:
        typeof data.totalEmbershards === "number" ? data.totalEmbershards : 0,
      currentEmbershards:
        typeof data.currentEmbershards === "number"
          ? data.currentEmbershards
          : 0,
      terrainPurchased:
        typeof data.terrainPurchased === "boolean"
          ? data.terrainPurchased
          : false,
      regiments: Array.isArray(data.regiments)
        ? data.regiments.map(repairRegiment)
        : [],
    },
  };
}

export function getRoster(id: string | undefined): Roster | null {
  if (!id) return null;
  const all = loadAll();
  const found = all.find((r) => r.id === id);
  return found ? repairRoster(found) : null;
}

export function saveRoster(roster: Roster) {
  const all = loadAll();

  const updated: Roster = {
    ...roster,
    lastUpdated: Date.now(),
  };

  const idx = all.findIndex((r) => r.id === updated.id);
  if (idx >= 0) all[idx] = updated;
  else all.push(updated);

  saveAll(all);
}

export function deleteRoster(id: string) {
  const all = loadAll();
  const filtered = all.filter((r) => r.id !== id);
  saveAll(filtered);
}

export function getAllRosters(): Roster[] {
  return loadAll();
}
