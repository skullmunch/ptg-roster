import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRosters, deleteRoster } from "../storage/rosterStorage";
import { FACTION_ICONS } from "../ui/FactionIcons";
import NavBar from "../ui/NavBar";
import type React from "react";

export default function MainPage() {
  const [rosters, setRosters] = useState(getAllRosters());

  // React‑19 safe: compute once before first render
  const [now] = useState(() => Date.now());

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Delete this roster permanently?")) return;

    deleteRoster(id);
    setRosters((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    document.documentElement.className = "";
  }, []);

  return (
    <main className="min-h-screen bg-bg text-text">
      <NavBar />

      <div className="p-6 max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <header className="relative p-6 rounded-xl bg-gradient-to-br from-bg/60 to-bg/20 border border-accent/40 shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" />

          <div className="relative">
            <h1 className="text-4xl font-bold tracking-wide">Your Rosters</h1>
            <p className="text-sm text-text/70 mt-1">
              Choose a roster to continue your Path to Glory
            </p>
          </div>
        </header>

        {/* GRID OF ROSTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CREATE NEW ROSTER CARD */}
          <Link
            to="/create"
            className="flex flex-col items-center justify-center p-6 rounded-xl border border-accent/40 bg-inputbg/20 shadow hover:shadow-lg hover:border-accent transition"
          >
            <div className="w-16 h-16 rounded-full bg-inputbg/40 flex items-center justify-center text-4xl">
              +
            </div>
            <p className="mt-3 text-lg font-semibold">Create New Roster</p>
          </Link>

          {/* EXISTING ROSTERS */}
          {rosters.map((r) => {
            const faction = r.faction ?? "cities";
            const icon = FACTION_ICONS[faction];

            const regimentCount = r.data?.regiments?.length ?? 0;
            const spellCount = r.data?.spells?.length ?? 0;

            const totalPoints =
              r.data?.regiments?.reduce(
                (sum, reg) =>
                  sum +
                  reg.units.reduce((uSum, u) => uSum + (u.points || 0), 0),
                0,
              ) ?? 0;

            const updatedDate = new Date(r.lastUpdated).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            );

            const diffMs = now - r.lastUpdated;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            const relative =
              diffDays === 0
                ? "today"
                : diffDays === 1
                  ? "1 day ago"
                  : `${diffDays} days ago`;

            return (
              <Link
                key={r.id}
                to={`/roster/${r.id}`}
                className="relative p-5 rounded-xl border border-accent/40 bg-inputbg/20 shadow hover:shadow-lg hover:border-accent transition flex flex-col gap-4"
              >
                {/* DELETE BUTTON */}
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
                  onClick={(e) => handleDelete(e, r.id)}
                  title="Delete roster"
                >
                  🗑️
                </button>

                {/* FACTION CREST */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-inputbg/40 flex items-center justify-center shadow-inner">
                    {icon}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">{r.name}</h2>
                    <p className="text-xs text-text/70">{r.formation}</p>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 text-center text-xs mt-2">
                  <div className="p-2 rounded bg-inputbg/30 border border-inputbg/40">
                    <p className="font-semibold">{regimentCount}</p>
                    <p className="text-text/70">Regiments</p>
                  </div>

                  <div className="p-2 rounded bg-inputbg/30 border border-inputbg/40">
                    <p className="font-semibold">{spellCount}</p>
                    <p className="text-text/70">Spells</p>
                  </div>

                  <div className="p-2 rounded bg-inputbg/30 border border-inputbg/40">
                    <p className="font-semibold">{totalPoints}</p>
                    <p className="text-text/70">Points</p>
                  </div>
                </div>

                {/* LAST UPDATED */}
                <p className="text-[10px] text-text/60 mt-1">
                  Updated {updatedDate} • {relative}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
