// rosterStorage.ts
import type { Roster } from "../types/types";
const STORAGE_KEY = "rosters";

function loadAll(): Roster[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(repairRoster);
  } catch {
    return [];
  }
}

function saveAll(rosters: Roster[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
}

// Ensures every roster has a complete, valid data object
export function repairRoster(raw: any): Roster {
  return {
    id: raw.id ?? crypto.randomUUID(),
    name: raw.name ?? "Unnamed Roster",
    formation: raw.formation ?? "Unknown",
    faction: raw.faction ?? "unknown",

    data: {
      theme: raw.data?.theme ?? "default",
      totalEmbershards: raw.data?.totalEmbershards ?? 0,
      currentEmbershards: raw.data?.currentEmbershards ?? 0,
      terrainPurchased: raw.data?.terrainPurchased ?? false,
      regiments: Array.isArray(raw.data?.regiments) ? raw.data.regiments : [],
      spells: Array.isArray(raw.data?.spells) ? raw.data.spells : [],
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
  const repaired = repairRoster(roster);
  const updated = all.some((r) => r.id === repaired.id)
    ? all.map((r) => (r.id === repaired.id ? repaired : r))
    : [...all, repaired];

  saveAll(updated);
}

export function deleteRoster(id: string) {
  const all = loadAll();
  saveAll(all.filter((r) => r.id !== id));
}

export function getAllRosters(): Roster[] {
  return loadAll();
}
