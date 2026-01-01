import { useEffect, useState } from "react";

export default function ClickSpeed() {
  const GAME_TIME = 10;

  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [clicks, setClicks] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bestCps, setBestCps] = useState(
    () => Number(localStorage.getItem("click-speed-best-cps")) || 0
  );
  const [pop, setPop] = useState(false);

  // Timer
  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  // Game end
  useEffect(() => {
    if (timeLeft !== 0) return;

    setIsRunning(false);
    const cps = clicks / GAME_TIME;

    if (cps > bestCps) {
      setBestCps(cps);
      localStorage.setItem("click-speed-best-cps", cps.toFixed(2));
    }
  }, [timeLeft, clicks, bestCps]);

  function startGame() {
    setClicks(0);
    setTimeLeft(GAME_TIME);
    setIsRunning(true);
  }

  function handleClick() {
    if (!isRunning) return;

    setClicks((c) => c + 1);
    setPop(true);
    setTimeout(() => setPop(false), 100);
  }

  const danger = timeLeft <= 3 && isRunning;

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Game Card */}
      <div className="relative bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-3xl p-8 shadow-xl">
        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
          ⚡ Click Speed Test
        </h1>
        <p className="text-gray-400 mb-8">
          Click as fast as you can in {GAME_TIME} seconds
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8">
          <div
            className={`px-6 py-4 rounded-xl transition-all
              ${danger ? "bg-red-900/40 animate-pulse" : "bg-gray-900"}
            `}
          >
            <p className="text-xs text-gray-400">Time</p>
            <p className="text-3xl font-bold">{timeLeft}</p>
          </div>

          <div
            className={`px-6 py-4 rounded-xl bg-gray-900 transition-transform
              ${pop ? "scale-110" : ""}
            `}
          >
            <p className="text-xs text-gray-400">Clicks</p>
            <p className="text-3xl font-bold">{clicks}</p>
          </div>
        </div>

        {/* Click Area */}
        <button
          onClick={handleClick}
          disabled={!isRunning}
          className={`
            w-full py-10 rounded-2xl text-2xl font-extrabold
            transition-all duration-150
            ${
              isRunning
                ? "bg-indigo-600 hover:bg-indigo-500 active:scale-95"
                : "bg-gray-700 cursor-not-allowed"
            }
          `}
        >
          {isRunning ? "CLICK!" : "WAIT"}
        </button>

        {/* Controls */}
        {!isRunning && (
          <div className="mt-6">
            <button
              onClick={startGame}
              className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              {timeLeft === 0 ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}

        {/* Result */}
        {timeLeft === 0 && (
          <div className="mt-8 animate-fade-in">
            <p className="text-2xl font-bold text-green-400">
              CPS: {(clicks / GAME_TIME).toFixed(2)}
            </p>
          </div>
        )}
        {bestCps > 0 && (
          <p className="mt-2 text-sm text-gray-400">
            Best:{" "}
            <span className="text-yellow-400 font-semibold">
              {bestCps.toFixed(2)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
