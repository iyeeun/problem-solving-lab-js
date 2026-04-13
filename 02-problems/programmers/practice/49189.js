function solution(n, edge) {
  const adj = Array.from({ length: n + 1 }, () => []);

  for (const [s, e] of edge) {
    adj[s].push(e);
    adj[e].push(s);
  }

  const dist = new Array(n + 1).fill(-1);
  const q = [1];
  dist[1] = 0;

  while (q.length) {
    const fr = q.shift();

    for (const next of adj[fr]) {
      if (dist[next] === -1) {
        dist[next] = dist[fr] + 1;
        q.push(next);
      }
    }
  }

  const max = Math.max(...dist);
  return dist.filter((v) => v === max).length;
}
