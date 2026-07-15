export const NODES = [
  { id: "A", x: 60, y: 50 },
  { id: "B", x: 180, y: 40 },
  { id: "C", x: 320, y: 60 },
  { id: "D", x: 460, y: 50 },
  { id: "E", x: 100, y: 150 },
  { id: "F", x: 250, y: 145 },
  { id: "G", x: 400, y: 160 },
  { id: "H", x: 530, y: 145 },
  { id: "I", x: 50, y: 260 },
  { id: "J", x: 180, y: 270 },
  { id: "K", x: 320, y: 260 },
  { id: "L", x: 450, y: 275 },
  { id: "M", x: 130, y: 350 },
  { id: "N", x: 380, y: 350 },
];

export const EDGES = [
  ["A", "B", 4], ["B", "C", 6], ["C", "D", 3], ["A", "E", 5],
  ["B", "F", 2], ["C", "G", 4], ["D", "H", 7], ["E", "F", 3],
  ["F", "G", 5], ["G", "H", 2], ["E", "I", 6], ["F", "J", 4],
  ["G", "K", 3], ["H", "L", 4], ["I", "J", 2], ["J", "K", 5],
  ["K", "L", 4], ["I", "M", 7], ["J", "M", 3], ["K", "N", 6],
  ["L", "N", 2], ["M", "N", 8], ["F", "K", 7], ["E", "J", 4],
];

export const ALGOS = [
  { id: "dijkstra", label: "Dijkstra", color: "#00FFA3", blurb: "O((V+E) log V)" },
  { id: "bellman", label: "Bellman-Ford", color: "#4F46E5", blurb: "O(V·E)" },
  { id: "floyd", label: "Floyd-Warshall", color: "#f59e0b", blurb: "O(V³)" },
];