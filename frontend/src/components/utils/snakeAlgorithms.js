import { COLS, ROWS } from "./snakeConstants";

export const bfsStep = (head, food, snake) => {
  const blocked = new Set(snake.map((s) => `${s.x},${s.y}`));
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < COLS && y < ROWS;
  const key = (x, y) => `${x},${y}`;
  const queue = [[head.x, head.y, []]];
  const seen = new Set([key(head.x, head.y)]);
  
  while (queue.length) {
    const [x, y, path] = queue.shift();
    if (x === food.x && y === food.y) return path[0] || null;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx;
      const ny = y + dy;
      const k = key(nx, ny);
      if (inBounds(nx, ny) && !blocked.has(k) && !seen.has(k)) {
        seen.add(k);
        queue.push([nx, ny, [...path, { x: nx, y: ny }]]);
      }
    }
  }
  
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = head.x + dx;
    const ny = head.y + dy;
    if (inBounds(nx, ny) && !blocked.has(`${nx},${ny}`)) return { x: nx, y: ny };
  }
  return null;
};

export const spawnFood = (snake) => {
  while (true) {
    const f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
};

export const initials = (s) => ({ x: s.x, y: s.y });