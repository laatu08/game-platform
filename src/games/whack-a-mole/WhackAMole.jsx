import { useEffect, useRef, useState } from "react";
import { useSound } from "../../hooks/useSound";
import hitSound from "../../assets/sounds/click.mp3";
import failSound from "../../assets/sounds/fail.mp3";

const HOLES = 9;
const GAME_TIME = 30;

export default function WhackAMole() {
  const [active, setActive] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [running, setRunning] = useState(false);

  const bestKey = "whack-a-mole-high-score";
  const [best, setBest] = useState(
    () => Number(localStorage.getItem(bestKey)) || 0
  );

  const timerRef = useRef(null);
  const moleRef = useRef(null);

  const playHit = useSound(hitSound, 0.4);
  const playFail = useSound(failSound, 0.4);

  function startGame() {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setRunning(true);
  }

  // Countdown timer
  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t === 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running]);

  // Mole pop logic (gets faster)
  useEffect(() => {
    if (!running) return;

    const speed = Math.max(400, 900 - score * 30);

    moleRef.current = setTimeout(() => {
      setActive(Math.floor(Math.random() * HOLES));
    }, speed);

    return () => clearTimeout(moleRef.current);
  }, [running, score, active]);

  function whack(index) {
    if (!running) return;

    if (index === active) {
      playHit();
      setScore(s => s + 1);
      setActive(null);
    } else {
      playFail();
    }
  }

  // Save best score
  useEffect(() => {
    if (!running && score > best) {
      setBest(score);
      localStorage.setItem(bestKey, score);
    }
  }, [running]);

  return (
  <div className="text-center select-none">
    {/* TITLE */}
    <h1 className="text-4xl font-extrabold mb-2 tracking-wide">
      🔨 Whack-a-Mole
    </h1>
    <p className="text-gray-400 mb-6">
      Hit the mole before it hides!
    </p>

    {/* HUD */}
    <div className="flex justify-center gap-8 mb-6 font-semibold text-lg">
      <div>
        ⏱️{" "}
        <span
          className={`${
            timeLeft <= 5 ? "text-red-400 animate-pulse" : "text-indigo-400"
          }`}
        >
          {timeLeft}s
        </span>
      </div>
      <div>
        🎯 <span className="text-green-400">{score}</span>
      </div>
      <div>
        🏆 <span className="text-yellow-400">{best}</span>
      </div>
    </div>

    {/* GAME ARENA */}
    <div className="relative mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br  shadow-2xl">
      <div className="grid grid-cols-3 gap-5 max-w-xs mx-auto">
        {Array.from({ length: HOLES }).map((_, i) => {
          const isActive = active === i;

          return (
            <button
              key={i}
              onClick={() => whack(i)}
              className={`
                relative h-24 w-24 rounded-full
                bg-gray-900 border-4 border-gray-700
                flex items-center justify-center
                transition-all duration-150
                ${
                  isActive
                    ? "scale-110 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.7)] animate-pop"
                    : "hover:border-gray-500"
                }
              `}
            >
              {/* HOLE SHADOW */}
              <div className="absolute inset-0 rounded-full shadow-inner" />

              {/* MOLE */}
              {isActive && (
                <span className="text-4xl animate-bounce">
                  🐹
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>

    {/* CONTROLS */}
    {!running && (
      <button
        onClick={startGame}
        className="
          mt-2 px-8 py-3 rounded-xl text-lg font-bold
          bg-indigo-600 hover:bg-indigo-500
          active:scale-95 transition
        "
      >
        {timeLeft === 0 ? "Play Again" : "Start Game"}
      </button>
    )}
  </div>
);

}
