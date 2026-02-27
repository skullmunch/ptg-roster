import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveRoster } from "../storage/rosterStorage";
import { FACTION_ICONS } from "../ui/FactionIcons";
import { GRAND_ALLIANCES } from "../data/grandAlliances";
import { FACTIONS } from "../data/factions";
import NavBar from "../ui/NavBar";

export default function CreateRosterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [formation, setFormation] = useState("");

  // NEW
  const [alliance, setAlliance] = useState("");
  const [faction, setFaction] = useState("");

  const createRoster = () => {
    if (!name.trim() || !formation.trim() || !faction.trim()) return;

    const id = crypto.randomUUID();

    const newRoster = {
      id,
      name: name.trim(),
      formation: formation.trim(),
      faction,
      lastUpdated: Date.now(),
      data: {
        theme: "default",
        totalEmbershards: 0,
        currentEmbershards: 0,
        terrainPurchased: false,
        regiments: [],
        spells: [],
        games: [],
        upgrades: [],
      },
    };

    saveRoster(newRoster);
    navigate(`/roster/${id}`);
  };

  // Filter factions by chosen alliance
  const filteredFactions = alliance
    ? Object.values(FACTIONS).filter((f) => f.alliance === alliance)
    : [];

  return (
    <main className="min-h-screen bg-bg text-text">
      <NavBar />
      <div className="p-6 max-w-xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-wide">
            Create New Roster
          </h1>
          <p className="text-sm text-text/70">
            Choose your faction and begin your Path to Glory
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm text-text/70">Roster Name</label>
          <input
            className="w-full p-3 border border-accent/40 rounded bg-inputbg text-inputtext"
            placeholder="e.g. The Crimson Host"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Formation */}
        <div className="space-y-1">
          <label className="text-sm text-text/70">Formation</label>
          <input
            className="w-full p-3 border border-accent/40 rounded bg-inputbg text-inputtext"
            placeholder="e.g. Deathmarch"
            value={formation}
            onChange={(e) => setFormation(e.target.value)}
          />
        </div>

        {/* NEW — Grand Alliance Selector */}
        <div className="space-y-1">
          <label className="text-sm text-text/70">Grand Alliance</label>
          <select
            className="w-full p-3 border border-accent/40 rounded bg-inputbg text-inputtext"
            value={alliance}
            onChange={(e) => {
              setAlliance(e.target.value);
              setFaction(""); // reset faction when alliance changes
            }}
          >
            <option value="">Select Grand Alliance</option>
            {Object.values(GRAND_ALLIANCES).map((ga) => (
              <option key={ga.id} value={ga.id}>
                {ga.name}
              </option>
            ))}
          </select>
        </div>

        {/* NEW — Faction Grid (filtered by alliance) */}
        {alliance && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-text/80">
              Choose a Faction
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {filteredFactions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFaction(f.id)}
                  className={`
                    flex flex-col items-center p-3 rounded-xl border transition
                    ${
                      faction === f.id
                        ? "border-accent bg-accent/20 shadow-lg"
                        : "border-inputbg/40 hover:border-accent/40"
                    }
                  `}
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-inputbg/40">
                    {FACTION_ICONS[f.iconKey]}
                  </div>
                  <span className="text-xs mt-2">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Create Button */}
        <button
          className="w-full p-3 bg-accent text-text rounded font-semibold shadow-md hover:shadow-lg transition"
          onClick={createRoster}
          disabled={!name.trim() || !formation.trim() || !faction.trim()}
        >
          Create Roster
        </button>
      </div>
    </main>
  );
}
