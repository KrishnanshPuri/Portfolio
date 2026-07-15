import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, MapPin, Zap, Cpu, GitBranch, Network } from "lucide-react";
import { NODES, EDGES, ALGOS } from "../utils/constants.js";
import { nodeAt, runAlgo } from "../utils/algorithms.js";
const pathEdges = (path) => {
  if (!path || path.length < 2) return new Set();
  const set = new Set();
  for (let i = 0; i < path.length - 1; i++) {
    set.add([path[i], path[i + 1]].sort().join("-"));
  }
  return set;
};

const labelOffset = (A, B) => {
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const len = Math.hypot(dx, dy) || 1;
  return { nx: -dy / len, ny: dx / len };
};

export const GraphPreview = () => {
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("N");
  const [algo, setAlgo] = useState("dijkstra");
  const [running, setRunning] = useState(false);
  const [visited, setVisited] = useState(new Set());
  const [path, setPath] = useState([]);
  const [cost, setCost] = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [hovered, setHovered] = useState(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const reset = () => {
    clearTimers();
    setVisited(new Set());
    setPath([]);
    setCost(null);
    setStepIdx(0);
    setRunning(false);
  };

  const run = () => {
    reset();
    setRunning(true);
    const result = runAlgo(algo, start, end);
    const visitedOrder = result.order;
    const finalPath = result.path;
    const finalCost = result.dist;

    const visitStep = Math.max(120, Math.min(360, 3600 / visitedOrder.length));
    
    visitedOrder.forEach((nid, i) => {
      const t = setTimeout(() => {
        setVisited((prev) => {
          const next = new Set(prev);
          next.add(nid);
          return next;
        });
        setStepIdx(i + 1);
      }, visitStep * (i + 1));
      timers.current.push(t);
    });

    const pathStart = visitStep * (visitedOrder.length + 1);
    
    if (finalPath && finalPath.length > 0) {
      const revealStep = Math.max(140, 1800 / finalPath.length);
      finalPath.forEach((_, i) => {
        const t = setTimeout(() => {
          setPath(finalPath.slice(0, i + 1));
        }, pathStart + revealStep * i);
        timers.current.push(t);
      });
      const ct = setTimeout(
        () => {
          setCost(finalCost);
          setRunning(false);
        },
        pathStart + revealStep * finalPath.length + 120
      );
      timers.current.push(ct);
    } else {
      const ct = setTimeout(() => {
        setCost(finalCost);
        setRunning(false);
      }, pathStart);
      timers.current.push(ct);
    }
  };

  const handleNodeClick = (id) => {
    if (running) return;
    if (id === start) return;
    if (id === end) {
      setEnd(start);
      setStart(id);
      return;
    }
    setEnd(id);
    reset();
  };

  const edgeSet = useMemo(() => pathEdges(path), [path]);
  const algoMeta = ALGOS.find((a) => a.id === algo);
  const progress = visited.size / NODES.length;

  return (
    <div className="flex h-[480px] w-full flex-col overflow-hidden border border-white/10 bg-[#050505]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0A0A0A] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
          <Network className="h-3 w-3" />
          graph-sim · path finder v2
        </div>
        <div className="font-mono text-[10px] text-zinc-500">
          {NODES.length} nodes · {EDGES.length} edges
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <div className="flex gap-1">
          {ALGOS.map((a) => {
            const active = algo === a.id;
            return (
              <button
                key={a.id}
                onClick={() => {
                  setAlgo(a.id);
                  reset();
                }}
                className={`flex flex-col items-start border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  active ? "text-black" : "border-white/10 text-zinc-500 hover:text-zinc-300"
                }`}
                style={active ? { background: a.color, borderColor: a.color } : undefined}
              >
                <span className="font-bold">{a.label}</span>
                <span
                  className={`mt-px text-[8px] ${
                    active ? "text-black/70" : "text-zinc-700"
                  }`}
                >
                  {a.blurb}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={run}
            disabled={running}
            className="flex items-center gap-1 border border-[#00FFA3] bg-[#00FFA3] px-2.5 py-1.5 font-mono text-[10px] font-bold text-black transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Play className="h-3 w-3" /> run
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1 border border-white/10 px-2 py-1.5 font-mono text-[10px] text-zinc-300 transition-colors hover:border-[#00FFA3] hover:text-[#00FFA3]"
          >
            <RotateCcw className="h-3 w-3" /> reset
          </button>
        </div>
      </div>

      <div className="relative bg-[#0A0A0A]">
        <svg
          viewBox="0 0 590 400"
          className="block h-[340px] w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="dotgrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="rgba(255,255,255,0.05)" />
            </pattern>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgrid)" />

          {EDGES.map(([a, b, w], i) => {
            const A = nodeAt(a);
            const B = nodeAt(b);
            const key = [a, b].sort().join("-");
            const inPath = edgeSet.has(key);
            const isHovered =
              hovered && (key === hovered || key === [hovered.a, hovered.b].sort().join("-"));
            return (
              <g key={i}>
                <line
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke={
                    inPath
                      ? algoMeta.color
                      : isHovered
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(255,255,255,0.10)"
                  }
                  strokeWidth={inPath ? 2.6 : isHovered ? 1.5 : 1}
                  strokeLinecap="round"
                  style={{ transition: "stroke 200ms, stroke-width 200ms" }}
                />
                {(() => {
                  const { nx, ny } = labelOffset(A, B);
                  const mx = (A.x + B.x) / 2;
                  const my = (A.y + B.y) / 2;
                  return (
                    <g>
                      <rect
                        x={mx + nx * 7 - 7}
                        y={my + ny * 7 - 6}
                        width="14"
                        height="12"
                        rx="1.5"
                        fill="#050505"
                        stroke={inPath ? algoMeta.color : "rgba(255,255,255,0.18)"}
                        strokeWidth="0.8"
                      />
                      <text
                        x={mx + nx * 7}
                        y={my + ny * 7 + 3}
                        fontSize="8"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="700"
                        fill={inPath ? algoMeta.color : "#71717a"}
                        textAnchor="middle"
                      >
                        {w}
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })}

          {NODES.map((n) => {
            const isStart = n.id === start;
            const isEnd = n.id === end;
            const isVisited = visited.has(n.id);
            const inPath = path.includes(n.id);
            const fill = inPath
              ? algoMeta.color
              : isStart
              ? "#00FFA3"
              : isEnd
              ? "#f43f5e"
              : isVisited
              ? "#1a1a1a"
              : "#0A0A0A";
            const stroke = inPath
              ? algoMeta.color
              : isStart
              ? "#00FFA3"
              : isEnd
              ? "#f43f5e"
              : isVisited
              ? "rgba(0,255,163,0.5)"
              : "rgba(255,255,255,0.25)";
            return (
              <g
                key={n.id}
                onClick={() => handleNodeClick(n.id)}
                onMouseEnter={() => setHovered({ id: n.id, a: "", b: "" })}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
                filter={inPath ? "url(#glow)" : undefined}
              >
                {isStart || isEnd ? (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="16"
                    fill="none"
                    stroke={isStart ? "#00FFA3" : "#f43f5e"}
                    strokeWidth="1"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      values="12;18;12"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                ) : null}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="11"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1.6"
                  style={{ transition: "fill 200ms, stroke 200ms" }}
                />
                <text
                  x={n.x}
                  y={n.y + 3}
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fill={inPath || isStart ? "#000" : "#e4e4e7"}
                  textAnchor="middle"
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>

        {!running && visited.size === 0 && path.length === 0 && (
          <div className="pointer-events-none absolute bottom-2 left-3 font-mono text-[9px] text-zinc-600">
            click a node → set as target · press run
          </div>
        )}

        {(running || visited.size > 0) && (
          <div className="absolute left-3 right-3 top-3 flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              {running ? "running" : "done"}
            </span>
            <div className="h-1 flex-1 overflow-hidden bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full"
                style={{ background: algoMeta.color }}
              />
            </div>
            <span className="font-mono text-[9px]" style={{ color: algoMeta.color }}>
              {visited.size}/{NODES.length}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#0A0A0A] px-3 py-1.5 font-mono text-[9px]">
        <span className="flex flex-wrap items-center gap-3 text-zinc-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5 text-[#00FFA3]" />
            start <span className="text-[#00FFA3]">{start}</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5 text-rose-400" />
            end <span className="text-rose-400">{end}</span>
          </span>
          <span className="flex items-center gap-1">
            <GitBranch className="h-2.5 w-2.5 text-zinc-500" />
            path <span className="text-zinc-300">{path.length || 0}</span>
          </span>
        </span>
        <AnimatePresence mode="wait">
          {cost !== null && Number.isFinite(cost) ? (
            <motion.span
              key="cost"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
              style={{ color: algoMeta.color }}
            >
              <Zap className="h-2.5 w-2.5" /> cost {cost}
            </motion.span>
          ) : cost === Infinity ? (
            <motion.span
              key="inf"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-rose-400"
            >
              no path
            </motion.span>
          ) : running ? (
            <motion.span
              key="run"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 text-amber-300"
            >
              <Cpu className="h-2.5 w-2.5 animate-spin" />
              step {stepIdx}/{NODES.length}
            </motion.span>
          ) : (
            <span className="text-zinc-600">idle</span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};