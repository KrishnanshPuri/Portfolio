import { NODES, EDGES } from "./constants";

export const nodeAt = (id) => NODES.find((n) => n.id === id);

const dijkstra = (start, end) => {
  const dist = {};
  const prev = {};
  const visited = new Set();
  
  NODES.forEach((n) => {
    dist[n.id] = Infinity;
    prev[n.id] = null;
  });
  dist[start] = 0;
  
  const order = [];
  
  while (visited.size < NODES.length) {
    let u = null;
    let best = Infinity;
    for (const n of NODES) {
      if (!visited.has(n.id) && dist[n.id] < best) {
        best = dist[n.id];
        u = n.id;
      }
    }
    if (u === null) break;
    
    visited.add(u);
    order.push(u);
    
    for (const [a, b, w] of EDGES) {
      let v = null;
      if (a === u && !visited.has(b)) v = b;
      else if (b === u && !visited.has(a)) v = a;
      
      if (v && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
      }
    }
  }
  
  const path = [];
  let cur = end;
  while (cur) {
    path.unshift(cur);
    cur = prev[cur];
  }
  return { order, path: path[0] === start ? path : [], dist: dist[end] };
};

const bellmanFord = (start, end) => {
  const dist = {};
  const prev = {};
  
  NODES.forEach((n) => {
    dist[n.id] = Infinity;
    prev[n.id] = null;
  });
  dist[start] = 0;
  
  const order = [];
  
  for (let i = 0; i < NODES.length - 1; i++) {
    let changed = false;
    for (const [a, b, w] of EDGES) {
      if (dist[a] !== Infinity && dist[a] + w < dist[b]) {
        dist[b] = dist[a] + w;
        prev[b] = a;
        order.push(b);
        changed = true;
      }
    }
    if (!changed) break;
  }
  
  const path = [];
  let cur = end;
  while (cur) {
    path.unshift(cur);
    cur = prev[cur];
  }
  return { order, path: path[0] === start ? path : [], dist: dist[end] };
};

const floydWarshall = (start, end) => {
  const INF = Infinity;
  const dist = {};
  const next = {};
  
  NODES.forEach((i) => {
    dist[i.id] = {};
    next[i.id] = {};
    NODES.forEach((j) => {
      dist[i.id][j.id] = i.id === j.id ? 0 : INF;
      next[i.id][j.id] = null;
    });
  });
  
  for (const [a, b, w] of EDGES) {
    dist[a][b] = w;
    dist[b][a] = w;
    next[a][b] = b;
    next[b][a] = a;
  }
  
  const order = [];
  for (const k of NODES) {
    order.push(k.id);
    for (const i of NODES) {
      for (const j of NODES) {
        if (dist[i.id][k.id] + dist[k.id][j.id] < dist[i.id][j.id]) {
          dist[i.id][j.id] = dist[i.id][k.id] + dist[k.id][j.id];
          next[i.id][j.id] = k.id;
        }
      }
    }
  }
  
  const buildPath = (i, j) => {
    if (i === j) return [i];
    if (next[i][j] === null) return [];
    if (next[i][j] === j) return [i, j];
    const mid = next[i][j];
    return [...buildPath(i, mid), ...buildPath(mid, j).slice(1)];
  };
  
  const path = buildPath(start, end);
  return {
    order,
    path: path.length > 0 && path[0] === start && path[path.length - 1] === end ? path : [],
    dist: dist[start][end],
  };
};

export const runAlgo = (id, start, end) => {
  if (id === "dijkstra") return dijkstra(start, end);
  if (id === "bellman") return bellmanFord(start, end);
  return floydWarshall(start, end);
};