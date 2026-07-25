function solution(n, results) {
  let answer = 0;

  const arr = Array.from({ length: n + 1 }, (_, i) => new Array(n + 1).fill(0));
  const adj = new Map();

  for (const [w, l] of results) {
    if (adj.has(w)) {
      adj.get(w).push(l);
    } else {
      adj.set(w, [l]);
    }
  }

  for (let i = 1; i <= n; i++) {
    const stack = [i];
    arr[i][i] = 1;

    while (stack.length) {
      const cur = stack.pop();

      for (const next of adj.get(cur) ?? []) {
        if (arr[i][next] !== 0) continue;

        arr[i][next] = 1;
        arr[next][i] = -1;
        stack.push(next);
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    if (arr[i].filter((v) => v === 0).length === 1) answer++;
  }

  return answer;
}
