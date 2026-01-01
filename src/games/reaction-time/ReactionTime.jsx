import { useEffect, useRef, useState } from "react";
import clickSound from "../../assets/sounds/click.mp3";
import successSound from "../../assets/sounds/success.mp3";
import failSound from "../../assets/sounds/fail.mp3";
import { useSound } from "../../hooks/useSound";

export default function ReactionTime() {
  const [state, setState] = useState("idle");
  const [reaction, setReaction] = useState(null);
  const [best, setBest] = useState(
    () => Number(localStorage.getItem("reaction-best")) || null
  );

  const playClick = useSound(clickSound, 0.4);
  const playSuccess = useSound(successSound, 0.6);
  const playFail = useSound(failSound, 0.5);

  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  function startGame() {
    setState("waiting");
    setReaction(null);

    const delay = Math.random() * 3000 + 2000;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setState("ready");
    }, delay);
  }

  function handleClick() {
    if (state === "waiting") {
        playFail()
      clearTimeout(timeoutRef.current);
      setState("idle");
      return;
    }

    if (state === "ready") {
        playClick()
      const time = Math.round(performance.now() - startTimeRef.current);
      setReaction(time);
      setState("result");

      if (!best || time < best) {
        playSuccess()
        setBest(time);
        localStorage.setItem("reaction-best", time);
      }
    }
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const arenaStyles = {
    idle: "bg-gray-900",
    waiting: "bg-amber-500/10 animate-pulse",
    ready:
      "bg-green-500 scale-105 shadow-[0_0_40px_rgba(34,197,94,0.6)] animate-shake",
    result: "bg-cyan-500/10",
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <div
        onClick={handleClick}
        className={`
          relative rounded-3xl border border-gray-800
          p-12 cursor-pointer select-none
          transition-all duration-200
          ${arenaStyles[state]}
        `}
      >
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none
          bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10"
        />

        <h1 className="text-3xl font-extrabold mb-6 relative">
          ⏱️ Reaction Time
        </h1>

        {/* STATE TEXT */}
        {state === "idle" && (
          <p className="text-gray-400 text-lg">
            Click start and wait for green
          </p>
        )}

        {state === "waiting" && (
          <p className="text-amber-400 text-2xl font-bold tracking-widest">
            WAIT…
          </p>
        )}

        {state === "ready" && (
          <p className="text-white text-3xl font-extrabold animate-bounce">
            CLICK!
          </p>
        )}

        {state === "result" && (
          <div className="animate-fade-in">
            <p className="text-cyan-400 text-4xl font-extrabold">
              {reaction} ms
            </p>

            {best && (
              <p className="mt-3 text-sm text-gray-400">
                Best:{" "}
                <span className="text-yellow-400 font-semibold">{best} ms</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      {state !== "waiting" && state !== "ready" && (
        <button
          onClick={startGame}
          className="
            mt-8 px-8 py-3 rounded-xl font-semibold
            bg-indigo-600 hover:bg-indigo-500
            active:scale-95 transition
          "
        >
          {state === "result" ? "Try Again" : "Start Game"}
        </button>
      )}
    </div>
  );
}
