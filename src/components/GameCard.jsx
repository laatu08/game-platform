import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <Link
      to={game.path}
      className="
        group relative rounded-2xl border border-gray-800
        bg-gradient-to-br from-gray-950 to-gray-900
        p-6 transition-all duration-300
        hover:-translate-y-1 hover:border-indigo-500/60
        hover:shadow-lg hover:shadow-indigo-500/10
      "
    >
      {/* Top Row */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
          {game.emoji}
        </span>

        <span className="
          text-xs font-medium px-2.5 py-1 rounded-full
          bg-gray-800/80 border border-gray-700
          text-gray-300
        ">
          {game.difficulty}
        </span>
      </div>

      {/* Title */}
      <h3 className="
        text-lg font-semibold mb-2
        transition-colors duration-200
        group-hover:text-indigo-400
      ">
        {game.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed">
        {game.description}
      </p>

      {/* Play CTA */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Click to play
        </span>

        <span className="
          text-sm font-medium text-indigo-400
          opacity-0 translate-x-2
          transition-all duration-300
          group-hover:opacity-100 group-hover:translate-x-0
        ">
          ▶ Play
        </span>
      </div>
    </Link>
  );
}
