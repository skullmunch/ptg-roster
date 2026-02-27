import NavBar from "../ui/NavBar";

export default function TutorialPage() {
  return (
    <>
      <NavBar />

      <div className="max-w-3xl mx-auto p-6 space-y-6 text-sm">
        <h1 className="text-2xl font-bold tracking-wide mb-4">Tutorial</h1>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">What This App Does</h2>
          <p>
            This tracker helps you manage a full Path to Glory campaign:
            rosters, units, upgrades, embershard economy, battle logs, and
            progression. Everything is saved locally in your browser.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Creating a Roster</h2>
          <p>
            Go to <strong>Create</strong> in the top navigation. Choose your
            faction, name your roster, and begin adding regiments and units.
            Each roster stores its own embershard totals, upgrades, and battle
            logs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Managing Units</h2>
          <p>
            Each unit row lets you edit its name, points, wounds, reinforcement
            status, and progression. Click the arrow on the left to expand
            additional options like Path, Rank, Battle Scars, Enhancements, and
            Abilities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Tracking Embershards</h2>
          <p>
            The Embershard panel shows your <strong>Total</strong> and{" "}
            <strong>Current</strong> embershards. Click the number to reveal +/–
            buttons and adjust values. Total embershards represent lifetime
            earned; current embershards represent what you can spend.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Logging Games</h2>
          <p>
            Use the <strong>Games</strong> tab to record battles. Each game adds
            or removes embershards depending on the result. Deleting a game
            refunds its shard change.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Logging Upgrades</h2>
          <p>
            Use the <strong>Upgrades</strong> tab to record what you spend
            embershards on. Each upgrade deducts from your current embershards.
            Removing an upgrade refunds the cost.
          </p>
        </section>

        <p className="text-xs text-text/60 mt-6">
          More features will be added in future versions.
        </p>
      </div>
    </>
  );
}
