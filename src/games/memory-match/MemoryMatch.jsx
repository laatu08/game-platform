import { useEffect, useState } from "react";
import { useSound } from "../../hooks/useSound";
import flipSound from "../../assets/sounds/click.mp3";
import matchSound from "../../assets/sounds/success.mp3";

/* ------------------ CONFIG ------------------ */

const DIFFICULTY_CONFIG = {
  easy: ["🍎", "🍌", "🍇", "🍒", "🥝", "🍉"], // 12 cards
  medium: ["🍎", "🍌", "🍇", "🍒", "🥝", "🍉", "🍍", "🥭", "🍑", "🍓"], // 20 cards
  hard: [
    "🍎",
    "🍌",
    "🍇",
    "🍒",
    "🥝",
    "🍉",
    "🍍",
    "🥭",
    "🍑",
    "🍓",
    "🍋",
    "🍊",
  ], // 24 cards
};

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* ------------------ COMPONENT ------------------ */

export default function MemoryMatch() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  /* ---------- High score per difficulty ---------- */
  const bestKey = `memory-match-best-time-${difficulty}`;
  const [best, setBest] = useState(
    () => Number(localStorage.getItem(bestKey)) || null
  );

  useEffect(() => {
    
    setBest(Number(localStorage.getItem(bestKey)) || null);
  }, [difficulty]);

  /* ------------------ Sounds ------------------ */
  const playFlip = useSound(flipSound, 0.4);
  const playMatch = useSound(matchSound, 0.6);

  /* ------------------ Start Game ------------------ */
  function startGame() {
    const emojis = DIFFICULTY_CONFIG[difficulty];
    const deck = shuffle([...emojis, ...emojis]).map((emoji, i) => ({
      id: i,
      emoji,
    }));

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTime(0);
    setRunning(true);
  }

  /* ------------------ Timer ------------------ */
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  /* ------------------ Flip Card ------------------ */
  function flipCard(index) {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    playFlip();
    setFlipped((prev) => [...prev, index]);
  }

  /* ------------------ Match Logic ------------------ */
  useEffect(() => {
    if (flipped.length !== 2) return;

    setMoves((m) => m + 1);
    const [a, b] = flipped;

    if (cards[a].emoji === cards[b].emoji) {
      playMatch();
      setMatched((prev) => [...prev, a, b]);
      setFlipped([]);
    } else {
      const timeout = setTimeout(() => setFlipped([]), 800);
      return () => clearTimeout(timeout);
    }
  }, [flipped, cards]);

  /* ------------------ Win Condition ------------------ */
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setRunning(false);
      if (!best || time < best) {
        setBest(time);
        localStorage.setItem(bestKey, time);
      }
    }
  }, [matched, cards, time, best, bestKey]);

  /* ------------------ UI ------------------ */
  return (
    <div className="text-center select-none">
      <h1 className="text-4xl font-extrabold mb-2">🧠 Memory Match</h1>
      <p className="text-gray-400 mb-6">
        Match all pairs with the fewest moves
      </p>

      {/* HUD */}
      <div className="flex justify-center gap-10 mb-6 font-semibold text-lg">
        <div>
          ⏱️ <span className="text-indigo-400">{time}s</span>
        </div>
        <div>
          🧩 <span className="text-green-400">{moves}</span>
        </div>
        {best && (
          <div>
            🏆 <span className="text-yellow-400">{best}s</span>
          </div>
        )}
      </div>

      {/* Difficulty Selector */}
      <div className="flex justify-center gap-4 mb-6">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            disabled={running}
            onClick={() => setDifficulty(level)}
            className={`
              px-4 py-1 rounded-lg text-sm font-semibold transition
              ${
                difficulty === level
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }
              ${running ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>

      {/* GAME BOARD */}
      <div className="mx-auto mb-6 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
        {cards.length === 0 && (
          <p className="text-gray-500 mb-4 animate-pulse">
            Select difficulty and press Start
          </p>
        )}

        <div
          className="grid gap-4 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${
              difficulty === "easy" ? 4 : difficulty === "medium" ? 5 : 6
            }, 1fr)`,
            maxWidth:
              difficulty === "easy"
                ? "20rem"
                : difficulty === "medium"
                ? "25rem"
                : "30rem",
          }}
        >
          {cards.map((card, i) => {
            const isOpen = flipped.includes(i) || matched.includes(i);
            const isMatched = matched.includes(i);

            return (
              <button
                key={card.id}
                onClick={() => flipCard(i)}
                className={`
                  h-20 w-20 rounded-xl
                  flex items-center justify-center
                  text-3xl font-bold
                  transition-all duration-300
                  ${
                    isOpen
                      ? "bg-indigo-600 scale-105 shadow-lg"
                      : "bg-gray-800 hover:bg-gray-700"
                  }
                  ${isMatched ? "bg-green-600 animate-pop" : ""}
                `}
              >
                {isOpen ? card.emoji : "❓"}
              </button>
            );
          })}
        </div>
      </div>

      {/* WIN MESSAGE */}
      {!running && cards.length > 0 && matched.length === cards.length && (
        <p className="mb-4 text-green-400 font-semibold animate-pulse">
          🎉 You completed the game!
        </p>
      )}

      {/* CONTROLS */}
      {!running && (
        <button
          onClick={startGame}
          className="
            px-8 py-3 rounded-xl text-lg font-bold
            bg-indigo-600 hover:bg-indigo-500
            active:scale-95 transition
          "
        >
          {cards.length ? "Play Again" : "Start Game"}
        </button>
      )}
    </div>
  );
}
