import GameCard from "../components/GameCard";
import { games } from "../games/games";

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          🎮 Playground
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          A growing collection of bite-sized games built with
          <span className="text-gray-200"> React</span> and
          <span className="text-gray-200"> Tailwind</span>.
          Play, relax, and challenge yourself.
        </p>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-800" />
        <span className="text-xs text-gray-500 uppercase tracking-wider">
          Games
        </span>
        <div className="flex-1 h-px bg-gray-800" />
      </div>

      {/* Games Grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}
