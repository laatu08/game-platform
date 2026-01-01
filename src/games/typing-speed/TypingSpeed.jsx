import { useEffect, useState } from "react";
import hitSound from "../../assets/sounds/click.mp3";
import { useSound } from "../../hooks/useSound";


const GAME_TIME = 60;

// Large ENGLISH sentence pools
const SENTENCES = {
  easy: [
    "Practice makes progress",
    "Typing is a useful skill",
    "Accuracy comes before speed",
    "Focus on one word at a time",
    "Relax your hands while typing",
    "Small steps lead to success",
    "Consistency builds confidence",
    "Good posture improves typing",
  ],
  medium: [
    "Typing speed improves when accuracy becomes consistent over time",
    "The best typists focus on rhythm instead of rushing",
    "Daily practice creates noticeable improvement in typing skills",
    "Maintaining focus is more important than raw typing speed",
    "Typing efficiently reduces mental and physical fatigue",
    "Strong fundamentals lead to long term typing mastery",
  ],
  hard: [
    "Typing fluently requires muscle memory, sustained focus, and disciplined practice habits",
    "Professional typists prioritize accuracy, rhythm, and endurance over short bursts of speed",
    "Improving typing speed involves correcting mistakes early and maintaining consistent posture",
    "Long typing sessions demand both mental concentration and physical relaxation to avoid fatigue",
    "Mastery of typing emerges gradually through deliberate practice and continuous self correction",
  ],
};

// Utility
function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function TypingSpeed() {
  const [difficulty, setDifficulty] = useState("easy");
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);

  const bestKey = `typing-best-${difficulty}`;
  const [best, setBest] = useState(
    () => Number(localStorage.getItem(bestKey)) || 0
  );

const playHit = useSound(hitSound, 0.4);


  // Load new sentence
  function loadSentence() {
    setText(randomFrom(SENTENCES[difficulty]));
  }

  // Init / difficulty change
  useEffect(() => {
    setBest(Number(localStorage.getItem(bestKey)) || 0);
    resetGame();
    // eslint-disable-next-line
  }, [difficulty]);

  useEffect(() => {
    loadSentence();
  }, []);

  // Timer
  useEffect(() => {
    if (!running || finished) return;

    if (timeLeft === 0) {
      setFinished(true);
      setRunning(false);
      return;
    }

    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft, finished]);

  function handleChange(e) {
    if (!running) setRunning(true);
    playHit();
    const value = e.target.value;
    setInput(value);

    if (value === text) {
      const correct = text
        .split("")
        .filter((c, i) => c === value[i]).length;

      setTotalChars((c) => c + text.length);
      setCorrectChars((c) => c + correct);

      setInput("");
      loadSentence();
    }
  }

  function resetGame() {
    setInput("");
    setTimeLeft(GAME_TIME);
    setRunning(false);
    setFinished(false);
    setTotalChars(0);
    setCorrectChars(0);
    loadSentence();
  }

  // Stats
  const minutes = (GAME_TIME - timeLeft) / 60;
  const wpm = Math.round(
    minutes > 0 ? totalChars / 5 / minutes : 0
  );
  const accuracy = Math.round(
    (correctChars / totalChars) * 100 || 100
  );

  // Save best
  useEffect(() => {
    if (finished && wpm > best) {
      setBest(wpm);
      localStorage.setItem(bestKey, wpm);
    }
  }, [finished, wpm, best, bestKey]);

  return (
    <div className="max-w-3xl mx-auto text-center select-none">
      <h1 className="text-4xl font-extrabold mb-2">⌨️ Typing Speed Test</h1>
      <p className="text-gray-400 mb-6">
        Type continuously : new sentences appear automatically
      </p>

      {/* Difficulty */}
      <div className="flex justify-center gap-4 mb-6">
        {["easy", "medium", "hard"].map((d) => (
          <button
            key={d}
            disabled={running}
            onClick={() => setDifficulty(d)}
            className={`px-4 py-1 rounded-lg text-sm font-semibold transition
              ${
                difficulty === d
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }
              ${running ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {d.toUpperCase()}
          </button>
        ))}
      </div>

      {/* HUD */}
      <div className="flex justify-center gap-10 mb-6 font-semibold text-lg">
        <div>⏱️ <span className="text-indigo-400">{timeLeft}s</span></div>
        <div>⚡ <span className="text-green-400">{wpm} WPM</span></div>
        <div>🎯 <span className="text-yellow-400">{accuracy}%</span></div>
        <div>🏆 <span className="text-purple-400">{best}</span></div>
      </div>

      {/* Text */}
      <div className="bg-gray-900 rounded-xl p-6 mb-4 text-lg leading-relaxed shadow-inner">
        {text.split("").map((char, i) => {
          let color = "text-gray-500";
          if (i < input.length) {
            color = input[i] === char ? "text-green-400" : "text-red-400";
          }
          return <span key={i} className={color}>{char}</span>;
        })}
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={handleChange}
        disabled={finished}
        placeholder="Start typing here..."
        className="
          w-full p-4 rounded-xl bg-gray-800
          outline-none resize-none text-lg mb-4
          focus:ring-2 focus:ring-indigo-500
        "
        rows={3}
      />

      {finished && (
        <button
          onClick={resetGame}
          className="px-8 py-3 rounded-xl text-lg font-bold
                     bg-indigo-600 hover:bg-indigo-500
                     active:scale-95 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
