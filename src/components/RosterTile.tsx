import { FACTION_THEMES } from "./factionThemes";

export default function RosterTile({ roster, openRoster, deleteRoster }) {
  const theme = FACTION_THEMES[roster.faction] ?? FACTION_THEMES.default;

  return (
    <div
      className={`
        relative rounded-xl shadow-md p-4 cursor-pointer
        bg-gradient-to-br ${theme.bg} ${theme.border}
        border hover:scale-[1.02] hover:brightness-110 transition-transform
      `}
      onClick={() => openRoster(roster.id)}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-black/40 text-xl">
          {theme.icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-text truncate">
            {roster.name}
          </h3>
          <p className="text-xs text-text/70 truncate">{theme.label}</p>
        </div>
      </div>

      <p className="text-sm text-text/80 mt-1">
        Formation: {roster.formation || "No Formation Selected"}
      </p>

      <button
        className="absolute top-2 right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition"
        onClick={(e) => {
          e.stopPropagation();
          deleteRoster(roster.id);
        }}
        title="Delete roster"
      >
        ✕
      </button>
    </div>
  );
}
