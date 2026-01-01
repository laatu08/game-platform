import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <h1 className="text-lg font-semibold tracking-wide">
            Playground
          </h1>
        </div>

        {/* Center: Nav (future ready) */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-gray-200"
              }`
            }
          >
            Home
          </NavLink>
        </div>

        {/* Right: Status / Tagline */}
        <div className="text-xs px-3 py-1 rounded-full bg-gray-900 text-gray-400 border border-gray-800">
          Mini Games Hub
        </div>
      </div>
    </nav>
  );
}
