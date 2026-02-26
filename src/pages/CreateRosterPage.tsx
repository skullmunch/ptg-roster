import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveRoster } from "../storage/rosterStorage";
import { FACTION_ICONS } from "../ui/FactionIcons";
import NavBar from "../ui/NavBar";

export default function CreateRosterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [formation, setFormation] = useState("");
  const [faction, setFaction] = useState("");

  const createRoster = () => {
    if (!name.trim() || !formation.trim()) return;

    const id = crypto.randomUUID();

    const newRoster = {
      id,
      name: name.trim(),
      formation: formation.trim(),
      faction: faction || "cities",

      data: {
        theme: "default",
        totalEmbershards: 0,
        currentEmbershards: 0,
        terrainPurchased: false,
        regiments: [],
        spells: [],
      },
    };

    saveRoster(newRoster);
    navigate(`/roster/${id}`);
  };

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

        {/* Faction Grid */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-text/80">
            Choose a Faction
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {Object.entries(FACTION_ICONS).map(([key, icon]) => (
              <button
                key={key}
                onClick={() => setFaction(key)}
                className={`
                  flex flex-col items-center p-3 rounded-xl border transition
                  ${
                    faction === key
                      ? "border-accent bg-accent/20 shadow-lg"
                      : "border-inputbg/40 hover:border-accent/40"
                  }
                `}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-inputbg/40">
                  {icon}
                </div>
                <span className="text-xs mt-2 capitalize">{key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <button
          className="w-full p-3 bg-accent text-text rounded font-semibold shadow-md hover:shadow-lg transition"
          onClick={createRoster}
        >
          Create Roster
        </button>
      </div>
    </main>
  );
}
