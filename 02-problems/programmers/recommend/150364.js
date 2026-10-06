function next(adj, path) {
  const visited = [];
  let target = 1;

  while (target) {
    visited.push(target);
    target = adj[target][path[target]];
  }

  for (const node of visited) {
    path[node] = (path[node] + 1) % adj[node].length;
  }

  return visited.at(-1);
}

function solution(edges, target) {
  const n = target.length;
  const adj = Array.from({ length: n + 1 }, () => []);
  const path = Array(n + 1).fill(0);
  const nodeCount = Array(n + 1).fill(0);

  target.unshift(0);

  edges.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  for (const [a, b] of edges) {
    adj[a].push(b);
  }

  const answerPath = [];
  const possible = target.map((v) => v === 0);

  while (!possible.every((v) => v)) {
    const visited = next(adj, path);
    nodeCount[visited]++;
    answerPath.push(visited);

    if (nodeCount[visited] > target[visited]) {
      return [-1];
    }

    if (target[visited] <= 3 * nodeCount[visited]) {
      possible[visited] = true;
    }
  }

  const numbers = Array.from({ length: n + 1 }, () => []);

  for (let i = 1; i <= n; i++) {
    let sum = target[i];
    let cnt = nodeCount[i];

    while (cnt > 0) {
      for (let x = 1; x <= 3; x++) {
        const nextSum = sum - x;
        const nextCnt = cnt - 1;

        if (nextCnt <= nextSum && nextSum <= 3 * nextCnt) {
          numbers[i].push(x);

          sum = nextSum;
          cnt = nextCnt;

          break;
        }
      }
    }
  }

  const answer = [];
  answerPath.forEach((v) => answer.push(numbers[v].shift()));

  return answer;
}
