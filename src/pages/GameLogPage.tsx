import { useState } from "react";
import type { GameEntry } from "../types/types";

interface Props {
  games: GameEntry[];
  onAddGame: (g: GameEntry) => void;
  onRemoveGame: (id: string) => void;
}

export default function GameLogPage({ games, onAddGame, onRemoveGame }: Props) {
  const [opponent, setOpponent] = useState("");
  const [battleplan, setBattleplan] = useState("");
  const [shards, setShards] = useState<string>("");
  const [winner, setWinner] = useState("");

  const [errors, setErrors] = useState({
    opponent: "",
    battleplan: "",
    winner: "",
  });

  function validate() {
    const next = {
      opponent: opponent.trim() ? "" : "Opponent is required.",
      battleplan: battleplan.trim() ? "" : "Battleplan is required.",
      winner: winner ? "" : "Winner must be selected.",
    };

    setErrors(next);

    return !next.opponent && !next.battleplan && !next.winner;
  }

  function handleAdd() {
    if (!validate()) return;

    onAddGame({
      id: crypto.randomUUID(),
      opponent: opponent.trim(),
      battleplan: battleplan.trim(),
      shards: Number(shards || 0),
      winner: winner as "you" | "opponent",
    });

    setOpponent("");
    setBattleplan("");
    setShards("");
    setWinner("");
    setErrors({ opponent: "", battleplan: "", winner: "" });
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold tracking-wide">Game Log</h2>

      {/* DISCLAIMER */}
      <p className="text-xs italic text-text/60">
        Shards earned in logged games are automatically added to your Current
        and Total Embershards. Removing a game will subtract its shards.
      </p>

      <div className="p-3 bg-inputbg/20 rounded border border-inputbg/40 space-y-3">
        {/* Opponent */}
        <div>
          <input
            className="bg-inputbg p-2 rounded w-full"
            placeholder="Opponent name"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
          {errors.opponent && (
            <p className="text-red-400 text-xs mt-1">{errors.opponent}</p>
          )}
        </div>

        {/* Battleplan */}
        <div>
          <input
            className="bg-inputbg p-2 rounded w-full"
            placeholder="Battleplan"
            value={battleplan}
            onChange={(e) => setBattleplan(e.target.value)}
          />
          {errors.battleplan && (
            <p className="text-red-400 text-xs mt-1">{errors.battleplan}</p>
          )}
        </div>

        {/* Shards */}
        <div>
          <input
            type="number"
            className="bg-inputbg p-2 rounded w-full"
            placeholder="Shards earned"
            value={shards}
            onChange={(e) => setShards(e.target.value)}
          />
        </div>

        {/* Winner */}
        <div>
          <select
            className="bg-inputbg p-2 rounded w-full"
            value={winner}
            onChange={(e) => setWinner(e.target.value)}
          >
            <option value="">Who won?</option>
            <option value="you">You</option>
            <option value="opponent">Opponent</option>
          </select>
          {errors.winner && (
            <p className="text-red-400 text-xs mt-1">{errors.winner}</p>
          )}
        </div>

        {/* Add button */}
        <button
          className="bg-accent text-white px-3 py-1 rounded w-full"
          onClick={handleAdd}
        >
          + Log Game
        </button>
      </div>

      {/* Game list */}
      <div className="space-y-3">
        {games.length === 0 && (
          <p className="text-xs text-text/60 italic">No games logged yet.</p>
        )}

        {games.map((g) => (
          <div
            key={g.id}
            className="p-3 bg-inputbg/20 rounded border border-inputbg/40"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{g.opponent}</div>
                <div className="text-xs text-text/60">{g.battleplan}</div>
              </div>

              <button
                className="text-red-500 font-bold text-lg leading-none"
                onClick={() => onRemoveGame(g.id)}
              >
                ✕
              </button>
            </div>

            <div className="text-sm mt-2">
              <span className="font-semibold">Shards:</span> {g.shards}
            </div>

            <div className="text-sm">
              <span className="font-semibold">Winner:</span>{" "}
              {g.winner === "you" ? "You" : g.opponent}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
