import { Link, useLocation, useParams } from "react-router-dom";
import { FACTION_ICONS } from "./FactionIcons";
import { getRoster } from "../storage/rosterStorage";

export default function NavBar() {
  const location = useLocation();
  const { id } = useParams();

  // If we're on a roster page, show its faction crest
  let factionIcon = null;
  if (id) {
    const roster = getRoster(id);
    if (roster) {
      const faction = roster.faction ?? "cities";
      factionIcon = FACTION_ICONS[faction];
    }
  }

  const isActive = (path: string) =>
    location.pathname === path ? "text-accent" : "text-text/70";

  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-accent/40 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: App Title + Version */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold tracking-wide">
              Path to Glory
            </div>
            <span className="text-[10px] text-text/60 tracking-wide">v1.1</span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link to="/" className={isActive("/")}>
            Rosters
          </Link>

          <Link to="/create" className={isActive("/create")}>
            Create
          </Link>

          <Link to="/tutorial" className={isActive("/tutorial")}>
            Tutorial
          </Link>

          <Link to="/changelog" className={isActive("/changelog")}>
            Changelog
          </Link>
        </div>

        {/* Right: Faction Crest (only on roster pages) */}
        <div className="w-10 h-10">
          {factionIcon && (
            <div className="w-10 h-10 rounded-full bg-inputbg/40 flex items-center justify-center shadow-inner">
              {factionIcon}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
