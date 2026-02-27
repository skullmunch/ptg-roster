import { useState } from "react";
import type { UpgradeEntry } from "../types/types";

interface Props {
  upgrades: UpgradeEntry[];
  onAddUpgrade: (u: UpgradeEntry) => void;
  onRemoveUpgrade: (id: string) => void;
}

export default function UpgradeLogPage({
  upgrades,
  onAddUpgrade,
  onRemoveUpgrade,
}: Props) {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState<string>("");

  const [errors, setErrors] = useState({
    description: "",
    cost: "",
  });

  function validate() {
    const next = {
      description: description.trim() ? "" : "Description is required.",
      cost: cost.trim() ? "" : "Cost is required.",
    };

    setErrors(next);
    return !next.description && !next.cost;
  }

  function handleAdd() {
    if (!validate()) return;

    onAddUpgrade({
      id: crypto.randomUUID(),
      description: description.trim(),
      cost: Number(cost || 0),
    });

    setDescription("");
    setCost("");
    setErrors({ description: "", cost: "" });
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold tracking-wide">Upgrades</h2>

      <p className="text-xs italic text-text/60">
        Logging an upgrade will automatically deduct its shard cost from your
        Current Embershards. Removing an upgrade will refund the shards.
      </p>

      <div className="p-3 bg-inputbg/20 rounded border border-inputbg/40 space-y-3">
        <div>
          <input
            className="bg-inputbg p-2 rounded w-full"
            placeholder="Upgrade description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-red-400 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            className="bg-inputbg p-2 rounded w-full"
            placeholder="Shard cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          {errors.cost && (
            <p className="text-red-400 text-xs mt-1">{errors.cost}</p>
          )}
        </div>

        <button
          className="bg-accent text-white px-3 py-1 rounded w-full"
          onClick={handleAdd}
        >
          + Log Upgrade
        </button>
      </div>

      <div className="space-y-3">
        {upgrades.length === 0 && (
          <p className="text-xs text-text/60 italic">No upgrades logged yet.</p>
        )}

        {upgrades.map((u) => (
          <div
            key={u.id}
            className="p-3 bg-inputbg/20 rounded border border-inputbg/40"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{u.description}</div>
                <div className="text-xs text-text/60">
                  Cost: {u.cost} shards
                </div>
              </div>

              <button
                className="text-red-500 font-bold text-lg leading-none"
                onClick={() => onRemoveUpgrade(u.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
