import { useEffect, useRef, useState } from "react";
import { useSound } from "../../hooks/useSound";
import hitSound from "../../assets/sounds/click.mp3";
import failSound from "../../assets/sounds/fail.mp3";

const GAME_TIME = 30;
const BOARD_SIZE = 350;

export default function AimTrainer() {
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [running, setRunning] = useState(false);

  const bestKey = "aim-trainer-high-score";
  const [best, setBest] = useState(
    () => Number(localStorage.getItem(bestKey)) || 0
  );

  const timerRef = useRef(null);
  const targetRef = useRef(null);

  const playHit = useSound(hitSound, 0.4);
  const playFail = useSound(failSound, 0.4);

  function spawnTarget() {
    const size = Math.max(24, 60 - score * 2);

    setTarget({
      x: Math.random() * (BOARD_SIZE - size),
      y: Math.random() * (BOARD_SIZE - size),
      size,
    });
  }

  function startGame() {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setRunning(true);
    spawnTarget();
  }

  // Countdown
  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running]);

  // Target timeout
  useEffect(() => {
    if (!running || !target) return;

    targetRef.current = setTimeout(() => {
      playFail();
      spawnTarget();
    }, Math.max(500, 1200 - score * 30));

    return () => clearTimeout(targetRef.current);
  }, [target, running, score]);

  function hitTarget() {
    if (!running) return;

    playHit();
    setScore((s) => s + 1);
    spawnTarget();
  }

  // Save high score
  useEffect(() => {
    if (!running && score > best) {
      setBest(score);
      localStorage.setItem(bestKey, score);
    }
  }, [running]);

  return (
    <div className="text-center select-none">
      <h1 className="text-4xl font-extrabold mb-2">🎯 Aim Trainer</h1>
      <p className="text-gray-400 mb-6">
        Click the target as fast as you can
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

      {/* GAME BOARD */}
      <div
        className="relative mx-auto bg-gray-900 rounded-xl border-4 border-gray-700 shadow-xl"
        style={{ width: BOARD_SIZE, height: BOARD_SIZE }}
        onClick={() => running && playFail()}
      >
        {running && target && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              hitTarget();
            }}
            className="absolute rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pop"
            style={{
              width: target.size,
              height: target.size,
              left: target.x,
              top: target.y,
            }}
          />
        )}
      </div>

      {!running && (
        <button
          onClick={startGame}
          className="
            mt-6 px-8 py-3 rounded-xl text-lg font-bold
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
