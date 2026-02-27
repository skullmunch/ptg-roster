import NavBar from "../ui/NavBar";

export default function ChangelogPage() {
  return (
    <>
      <NavBar />

      <div className="max-w-3xl mx-auto p-6 space-y-6 text-sm">
        <h1 className="text-2xl font-bold tracking-wide mb-4">Changelog</h1>

        <section>
          <h2 className="text-lg font-semibold">v1.0</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Initial release of the Path to Glory tracker.</li>
            <li>Rosters, regiments, and unit management.</li>
            <li>Embershard tracking with editable totals.</li>
            <li>Game logging with shard adjustments.</li>
            <li>Upgrade logging with shard spending.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
