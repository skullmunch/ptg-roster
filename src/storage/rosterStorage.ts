// rosterStorage.ts
import type { Roster, Spell, Regiment } from "../types/types";
const STORAGE_KEY = "rosters";

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
        ? (data.regiments as Regiment[])
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
