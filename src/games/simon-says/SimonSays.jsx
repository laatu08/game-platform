import { useEffect, useState } from "react";
import { useSound } from "../../hooks/useSound";
import clickSound from "../../assets/sounds/click.mp3";
import failSound from "../../assets/sounds/fail.mp3";

const COLOR_SETS = {
  normal: [
    {
      id: 0,
      base: "bg-red-600",
      active: "bg-red-400 shadow-[0_0_30px_rgba(248,113,113,1)]",
    },
    {
      id: 1,
      base: "bg-green-600",
      active: "bg-green-400 shadow-[0_0_30px_rgba(74,222,128,1)]",
    },
    {
      id: 2,
      base: "bg-blue-600",
      active: "bg-blue-400 shadow-[0_0_30px_rgba(96,165,250,1)]",
    },
    {
      id: 3,
      base: "bg-yellow-500",
      active: "bg-yellow-300 shadow-[0_0_30px_rgba(253,224,71,1)]",
    },
  ],

  hard: [
    {
      id: 0,
      base: "bg-red-600",
      active: "bg-red-400 shadow-[0_0_30px_rgba(248,113,113,1)]",
    },
    {
      id: 1,
      base: "bg-green-600",
      active: "bg-green-400 shadow-[0_0_30px_rgba(74,222,128,1)]",
    },
    {
      id: 2,
      base: "bg-blue-600",
      active: "bg-blue-400 shadow-[0_0_30px_rgba(96,165,250,1)]",
    },
    {
      id: 3,
      base: "bg-yellow-500",
      active: "bg-yellow-300 shadow-[0_0_30px_rgba(253,224,71,1)]",
    },
    {
      id: 4,
      base: "bg-purple-600",
      active: "bg-purple-400 shadow-[0_0_30px_rgba(192,132,252,1)]",
    },
    {
      id: 5,
      base: "bg-pink-600",
      active: "bg-pink-400 shadow-[0_0_30px_rgba(244,114,182,1)]",
    },
  ],
};

export default function SimonSays() {
  const [sequence, setSequence] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [active, setActive] = useState(null);
  const [level, setLevel] = useState(0);
  const [running, setRunning] = useState(false);
  const [locked, setLocked] = useState(true);
  const [mode, setMode] = useState("normal");

  const COLORS = COLOR_SETS[mode];

  const bestKey = `simon-says-best-${mode}`;
  const [best, setBest] = useState(
    () => Number(localStorage.getItem(bestKey)) || 0
  );

  useEffect(() => {
    setBest(Number(localStorage.getItem(bestKey)) || 0);
  }, [mode]);

  const playClick = useSound(clickSound, 0.4);
  const playFail = useSound(failSound, 0.6);

  function startGame() {
    setSequence([]);
    setLevel(0);
    setRunning(true);
    nextRound([]);
  }

  function nextRound(prev) {
    const next = [...prev, Math.floor(Math.random() * COLORS.length)];
    setSequence(next);
    setLevel(next.length);
    setUserIndex(0);
    playSequence(next);
  }

  function playSequence(seq) {
    setLocked(true);
    let i = 0;

    const interval = setInterval(() => {
      setActive(seq[i]);

      setTimeout(() => setActive(null), 450);
      i++;

      if (i >= seq.length) {
        clearInterval(interval);
        setTimeout(() => setLocked(false), 600);
      }
    }, 750);
  }

  function handleClick(index) {
    if (locked || !running) return;

    playClick();

    if (sequence[userIndex] !== index) {
      playFail();
      setRunning(false);
      setLocked(true);

      if (level > best) {
        setBest(level);
        localStorage.setItem(bestKey, level);
      }
      return;
    }

    if (userIndex + 1 === sequence.length) {
      setLocked(true);
      setTimeout(() => nextRound(sequence), 900);
    } else {
      setUserIndex((i) => i + 1);
    }
  }

  return (
    <div className="text-center select-none">
      <h1 className="text-4xl font-extrabold mb-2">🟦 Simon Says</h1>
      <p className="text-gray-400 mb-4">Repeat the color pattern correctly</p>

      {/* STATUS */}
      <p className="mb-4 font-semibold">
        {running ? (
          locked ? (
            <span className="text-indigo-400 animate-pulse">
              👀 Watch carefully…
            </span>
          ) : (
            <span className="text-green-400">🎯 Your turn</span>
          )
        ) : (
          <span className="text-gray-500">Press start to begin</span>
        )}
      </p>

      {/* HUD */}
      <div className="flex justify-center gap-8 mb-6 font-semibold text-lg">
        <div>
          Level: <span className="text-green-400">{level}</span>
        </div>
        <div>
          Best: <span className="text-yellow-400">{best}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {["normal", "hard"].map((m) => (
          <button
            key={m}
            disabled={running}
            onClick={() => setMode(m)}
            className={`
        px-4 py-1 rounded-lg text-sm font-semibold transition
        ${
          mode === m
            ? "bg-indigo-600 text-white"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }
        ${running ? "opacity-50 cursor-not-allowed" : ""}
      `}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* BOARD */}
      <div
        className="grid gap-5 mx-auto mb-6"
        style={{
          gridTemplateColumns: `repeat(${mode === "hard" ? 3 : 2}, 1fr)`,
          maxWidth: mode === "hard" ? "20rem" : "14rem",
        }}
      >
        {COLORS.map((c) => {
          const isActive = active === c.id;

          return (
            <button
              key={c.id}
              onClick={() => handleClick(c.id)}
              className={`
                h-28 rounded-2xl
                transition-all duration-200
                ${isActive ? c.active : c.base}
                ${locked ? "opacity-70" : "hover:scale-105 active:scale-95"}
                shadow-inner
              `}
            />
          );
        })}
      </div>

      {!running && (
        <button
          onClick={startGame}
          className="
            px-8 py-3 rounded-xl text-lg font-bold
            bg-indigo-600 hover:bg-indigo-500
            active:scale-95 transition
          "
        >
          {level > 0 ? "Play Again" : "Start Game"}
        </button>
      )}
    </div>
  );
}
