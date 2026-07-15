import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Brain, Gamepad2, Trophy } from "lucide-react";
import {
  COLS,
  ROWS,
  CELL,
  START_SNAKE,
  START_FOOD,
  START_DIR,
  TICK_HUMAN,
  TICK_AI,
} from "../utils/snakeConstants";
import { bfsStep, spawnFood, initials } from "../utils/snakeAlgorithms";

export const SnakePreview = () => {
  const [snake, setSnake] = useState(START_SNAKE.map(initials));
  const [dir, setDir] = useState(START_DIR);
  const dirRef = useRef(dir);
  const [food, setFood] = useState(START_FOOD);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(0);
  const [over, setOver] = useState(false);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("ai");
  const tickRef = useRef(null);

  useEffect(() => {
    dirRef.current = dir;
  }, [dir]);

  const step = useCallback(() => {
    setSnake((prev) => {
      const head = prev[0];
      let nextDir = dirRef.current;
      if (mode === "ai") {
        const next = bfsStep(head, food, prev);
        if (!next) {
          setOver(true);
          setRunning(false);
          return prev;
        }
        nextDir = { x: next.x - head.x, y: next.y - head.y };
      }
      const newHead = { x: head.x + nextDir.x, y: head.y + nextDir.y };
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= COLS ||
        newHead.y >= ROWS ||
        prev.some((s) => s.x === newHead.x && s.y === newHead.y)
      ) {
        setOver(true);
        setRunning(false);
        return prev;
      }
      const ate = newHead.x === food.x && newHead.y === food.y;
      const body = ate ? prev : prev.slice(0, -1);
      const nextSnake = [newHead, ...body];
      if (ate) {
        setScore((s) => {
          const ns = s + 1;
          setHigh((h) => Math.max(h, ns));
          return ns;
        });
        setFood(spawnFood(nextSnake));
      }
      return nextSnake;
    });
    if (mode === "human") {
       // 
    } else {
      setDir((d) => d);
    }
  }, [food, mode]);

  useEffect(() => {
    if (!running || over) return;
    const speed = mode === "ai" ? TICK_AI : TICK_HUMAN;
    tickRef.current = setInterval(step, speed);
    return () => clearInterval(tickRef.current);
  }, [running, over, step, mode]);

  useEffect(() => {
    const onKey = (e) => {
      if (mode !== "human") return;
      const k = e.key;
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      if (map[k]) {
        e.preventDefault();
        const nd = map[k];
        if (nd.x === -dirRef.current.x && nd.y === -dirRef.current.y) return;
        setDir(nd);
        if (!running) setRunning(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, running]);

  const reset = () => {
    setSnake(START_SNAKE.map(initials));
    setDir(START_DIR);
    dirRef.current = START_DIR;
    setFood(START_FOOD);
    setScore(0);
    setOver(false);
    setRunning(false);
  };

  const toggle = () => {
    if (over) reset();
    setRunning((r) => !r);
  };

  return (
    <div className="flex h-[480px] w-full flex-col overflow-hidden border border-white/10 bg-[#050505]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0A0A0A] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="font-mono text-[10px] text-zinc-500">snake_ai — dqn demo</div>
        <div className="font-mono text-[10px] text-zinc-500">v0.4.2</div>
      </div>

      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex gap-1">
          {[
            { id: "ai", label: "ai", icon: Brain },
            { id: "human", label: "human", icon: Gamepad2 },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  reset();
                }}
                className={`flex items-center gap-1 border px-2 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  mode === m.id
                    ? "border-[#00FFA3]/50 bg-[#00FFA3]/10 text-[#00FFA3]"
                    : "border-white/10 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Icon className="h-3 w-3" />
                {m.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="text-zinc-500">
            score <span className="text-[#00FFA3]">{score}</span>
          </span>
          <span className="flex items-center gap-1 text-zinc-500">
            <Trophy className="h-3 w-3 text-amber-300" />
            <span className="text-amber-300">{high}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center gap-6 p-4">
        <div
          className="relative shrink-0"
          style={{ width: COLS * CELL, height: ROWS * CELL }}
        >
          <div
            className="grid h-full w-full bg-[#0A0A0A]"
            style={{
              gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
              gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
            }}
          >
            {Array.from({ length: ROWS * COLS }).map((_, i) => (
              <div
                key={i}
                className="border border-white/[0.03]"
                style={{ width: CELL, height: CELL }}
              />
            ))}
          </div>

          <motion.div
            key={`food-${food.x}-${food.y}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute rounded-sm bg-rose-500/90"
            style={{
              left: food.x * CELL,
              top: food.y * CELL,
              width: CELL - 2,
              height: CELL - 2,
              boxShadow: "0 0 8px rgba(244,63,94,0.6)",
            }}
          />

          <AnimatePresence>
            {snake.map((seg, i) => {
              const isHead = i === 0;
              return (
                <motion.div
                  key={`${seg.x}-${seg.y}-${i}`}
                  layout
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.08 }}
                  className={`absolute ${
                    isHead
                      ? "bg-[#00FFA3]"
                      : i % 2 === 0
                      ? "bg-[#00FFA3]/80"
                      : "bg-[#00FFA3]/60"
                  }`}
                  style={{
                    left: seg.x * CELL,
                    top: seg.y * CELL,
                    width: CELL - 2,
                    height: CELL - 2,
                    boxShadow: isHead ? "0 0 10px rgba(0,255,163,0.7)" : undefined,
                  }}
                />
              );
            })}
          </AnimatePresence>

          <AnimatePresence>
            {over && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-rose-400">
                  game over
                </div>
                <div className="heading-font mt-1 text-2xl font-black text-white">
                  {score} pts
                </div>
                <button
                  onClick={reset}
                  className="mt-2 flex items-center gap-1 border border-[#00FFA3] bg-[#00FFA3] px-2.5 py-1 font-mono text-[10px] font-bold text-black"
                >
                  <RotateCcw className="h-3 w-3" /> restart
                </button>
              </motion.div>
            )}
            {!running && !over && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
              >
                <button
                  onClick={toggle}
                  className="flex items-center gap-1.5 border border-[#00FFA3] bg-[#00FFA3] px-3 py-1.5 font-mono text-[11px] font-bold text-black"
                >
                  <Play className="h-3 w-3" />
                  {mode === "ai" ? "run ai" : "play"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden min-w-[140px] flex-col gap-3 border-l border-white/5 pl-6 sm:flex">
          <SideStat label="mode" value={mode === "ai" ? "BFS · ε=0" : "human"} color="#00FFA3" />
          <SideStat label="speed" value={`${mode === "ai" ? 70 : 130}ms/tick`} color="#4F46E5" />
          <SideStat label="board" value={`${COLS}×${ROWS}`} color="#f59e0b" />
          <SideStat label="food" value={score} color="#f43f5e" />
          <div className="mt-1 border-t border-white/10 pt-3 font-mono text-[9px] leading-relaxed text-zinc-500">
            {mode === "ai" ? (
              <>
                BFS shortest-path solver.
                <br />
                Auto-runs from start.
              </>
            ) : (
              <>
                Use arrow keys to move.
                <br />
                No 180° turns.
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-[#0A0A0A] px-3 py-1.5 font-mono text-[9px]">
        <span className="text-zinc-500">
          {mode === "ai" ? "bfs · ε=0.0" : "arrows / wasd"}
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={toggle}
            className="flex items-center gap-1 border border-white/10 px-2 py-0.5 text-zinc-300 transition-colors hover:border-[#00FFA3] hover:text-[#00FFA3]"
          >
            {running ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
            {running ? "pause" : "start"}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1 border border-white/10 px-2 py-0.5 text-zinc-300 transition-colors hover:border-[#00FFA3] hover:text-[#00FFA3]"
          >
            <RotateCcw className="h-2.5 w-2.5" /> reset
          </button>
        </div>
      </div>
    </div>
  );
};

const SideStat = ({ label, value, color }) => (
  <div>
    <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
      {label}
    </div>
    <div
      className="heading-font mt-0.5 text-sm font-bold"
      style={{ color }}
    >
      {value}
    </div>
  </div>
);