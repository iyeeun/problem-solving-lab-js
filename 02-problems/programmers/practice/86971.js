function solution(n, wires) {
  let answer = Infinity;

  const adj = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of wires) {
    adj[a].push(b);
    adj[b].push(a);
  }

  for (const [cutA, cutB] of wires) {
    const visited = new Array(n + 1).fill(false);

    function dfs(cur) {
      visited[cur] = true;
      let count = 1;

      for (const next of adj[cur]) {
        if ((cur === cutA && next === cutB) || (cur === cutB && next === cutA))
          continue;
        if (!visited[next]) {
          count += dfs(next);
        }
      }

      return count;
    }

    const size = dfs(cutA);
    const other = n - size;

    answer = Math.min(answer, Math.abs(size - other));
  }

  return answer;
}
