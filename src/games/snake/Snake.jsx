import { useEffect, useRef, useState } from "react";
import { useSound } from "../../hooks/useSound";
import eatSound from "../../assets/sounds/eat.mp3";
import dieSound from "../../assets/sounds/die.mp3";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIR = { x: 0, y: -1 };

function generateFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => generateFood(INITIAL_SNAKE));
  const [dir, setDir] = useState(INITIAL_DIR);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);

  const intervalRef = useRef(null);

  const playEat = useSound(eatSound, 0.5);
  const playDie = useSound(dieSound, 0.6);

  function startGame() {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDir(INITIAL_DIR);
    setScore(0);
    setRunning(true);
  }

  // Keyboard input
  useEffect(() => {
    function handleKey(e) {
      if (!running) return;

      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (map[e.key]) {
        setDir((prev) => {
          if (prev.x + map[e.key].x === 0 && prev.y + map[e.key].y === 0) {
            return prev;
          }
          return map[e.key];
        });
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running]);

  // Game loop
  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = {
          x: head.x + dir.x,
          y: head.y + dir.y,
        };

        // Collision
        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y >= GRID_SIZE ||
          prev.some((s) => s.x === newHead.x && s.y === newHead.y)
        ) {
          playDie();
          setRunning(false);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Eat food
        if (newHead.x === food.x && newHead.y === food.y) {
          playEat();
          setScore((s) => s + 1);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 140);

    return () => clearInterval(intervalRef.current);
  }, [running, dir, food]);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-extrabold mb-2">🐍 Snake</h1>
      <p className="text-gray-400 mb-4">Use arrow keys</p>

      <div className="mb-3 text-lg font-semibold">
        Score: <span className="text-green-400">{score}</span>
      </div>

      {/* BOARD */}
      <div
        className="mx-auto bg-gray-900 rounded-lg border-4 border-gray-700 shadow-xl"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);

          const isHead = snake[0].x === x && snake[0].y === y;
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          let cellClass = "";

          if (isFood) {
            cellClass =
              "bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.9)]";
          } else if (isHead) {
            cellClass =
              "bg-green-600 shadow-[0_0_6px_rgba(34,197,94,0.8)]";
          } else if (isSnake) {
            cellClass = "bg-green-500";
          }

          return (
            <div
              key={i}
              style={{ width: CELL_SIZE, height: CELL_SIZE }}
              className={`transition-all duration-100 ${cellClass}`}
            />
          );
        })}
      </div>

      {!running && (
        <button
          onClick={startGame}
          className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition"
        >
          {score > 0 ? "Restart" : "Start Game"}
        </button>
      )}
    </div>
  );
}
