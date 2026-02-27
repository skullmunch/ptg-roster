export const GRAND_ALLIANCES = {
  order: {
    id: "order",
    name: "Order",
  },
  chaos: {
    id: "chaos",
    name: "Chaos",
  },
  death: {
    id: "death",
    name: "Death",
  },
  destruction: {
    id: "destruction",
    name: "Destruction",
  },
} as const;

export type GrandAllianceId = keyof typeof GRAND_ALLIANCES;
