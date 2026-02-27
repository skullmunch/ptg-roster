import type { GrandAllianceId } from "./grandAlliances";

export interface FactionDefinition {
  id: string;
  name: string;
  alliance: GrandAllianceId;
  iconKey: string; // key used in FACTION_ICONS
}

export const FACTIONS: Record<string, FactionDefinition> = {
  // ORDER
  cities: {
    id: "cities",
    name: "Cities of Sigmar",
    alliance: "order",
    iconKey: "cities",
  },
  stormcast: {
    id: "stormcast",
    name: "Stormcast Eternals",
    alliance: "order",
    iconKey: "stormcast",
  },
  fyreslayers: {
    id: "fyreslayers",
    name: "Fyreslayers",
    alliance: "order",
    iconKey: "fyreslayers",
  },
  kharadron: {
    id: "kharadron",
    name: "Kharadron Overlords",
    alliance: "order",
    iconKey: "kharadron",
  },
  seraphon: {
    id: "seraphon",
    name: "Seraphon",
    alliance: "order",
    iconKey: "seraphon",
  },
  sylvaneth: {
    id: "sylvaneth",
    name: "Sylvaneth",
    alliance: "order",
    iconKey: "sylvaneth",
  },
  lumineth: {
    id: "lumineth",
    name: "Lumineth Realm-lords",
    alliance: "order",
    iconKey: "lumineth",
  },
  idoneth: {
    id: "idoneth",
    name: "Idoneth Deepkin",
    alliance: "order",
    iconKey: "idoneth",
  },
  khaine: {
    id: "khaine",
    name: "Daughters of Khaine",
    alliance: "order",
    iconKey: "khaine",
  },

  // CHAOS
  slaves: {
    id: "slaves",
    name: "Slaves to Darkness",
    alliance: "chaos",
    iconKey: "slaves",
  },
  khorne: {
    id: "khorne",
    name: "Blades of Khorne",
    alliance: "chaos",
    iconKey: "khorne",
  },
  tzeentch: {
    id: "tzeentch",
    name: "Disciples of Tzeentch",
    alliance: "chaos",
    iconKey: "tzeentch",
  },
  nurgle: {
    id: "nurgle",
    name: "Maggotkin of Nurgle",
    alliance: "chaos",
    iconKey: "nurgle",
  },
  slaanesh: {
    id: "slaanesh",
    name: "Hedonites of Slaanesh",
    alliance: "chaos",
    iconKey: "slaanesh",
  },
  skaven: {
    id: "skaven",
    name: "Skaven",
    alliance: "chaos",
    iconKey: "skaven",
  },
  helsmiths: {
    id: "helsmiths",
    name: "Helsmiths of Hashut",
    alliance: "chaos",
    iconKey: "helsmiths",
  },

  // DEATH
  soulblight: {
    id: "soulblight",
    name: "Soulblight Gravelords",
    alliance: "death",
    iconKey: "soulblight",
  },
  nighthaunt: {
    id: "nighthaunt",
    name: "Nighthaunt",
    alliance: "death",
    iconKey: "nighthaunt",
  },
  bonereapers: {
    id: "bonereapers",
    name: "Ossiarch Bonereapers",
    alliance: "death",
    iconKey: "bonereapers",
  },
  fecc: {
    id: "fecc",
    name: "Flesh-eater Courts",
    alliance: "death",
    iconKey: "fecc",
  },

  // DESTRUCTION
  orruk: {
    id: "orruk",
    name: "Orruk Warclans",
    alliance: "destruction",
    iconKey: "orruk",
  },
  gitz: {
    id: "gitz",
    name: "Gloomspite Gitz",
    alliance: "destruction",
    iconKey: "gitz",
  },
  ogor: {
    id: "ogor",
    name: "Ogor Mawtribes",
    alliance: "destruction",
    iconKey: "ogor",
  },
  behemat: {
    id: "behemat",
    name: "Sons of Behemat",
    alliance: "destruction",
    iconKey: "behemat",
  },
};
