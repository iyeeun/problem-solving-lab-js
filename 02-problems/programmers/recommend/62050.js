function solution(land, height) {
  const n = land.length;

  const visited = Array.from({ length: n }, () => new Array(n).fill(-1));
  let groupCnt = 0;
  const diffList = [];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (visited[i][j] !== -1) continue;

      const q = [[i, j]];
      let target = 0;
      visited[i][j] = groupCnt;

      while (target < q.length) {
        const [x, y] = q[target++];

        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (
            0 <= nx &&
            nx < n &&
            0 <= ny &&
            ny < n &&
            visited[nx][ny] === -1
          ) {
            const diff = Math.abs(land[x][y] - land[nx][ny]);

            if (diff <= height) {
              q.push([nx, ny]);
              visited[nx][ny] = visited[x][y];
            } else {
              diffList.push([[x, y], [nx, ny], diff]);
            }
          }
        }
      }
      groupCnt++;
    }
  }

  const edges = [];

  for (let i = 0; i < diffList.length; i++) {
    const [[x, y], [nx, ny], diff] = diffList[i];
    if (visited[x][y] === visited[nx][ny]) continue;

    edges.push([visited[x][y], visited[nx][ny], diff]);
  }

  edges.sort((a, b) => a[2] - b[2]);

  const parents = Array.from({ length: groupCnt }, (_, i) => i);
  const size = Array(groupCnt).fill(1);

  function find(x) {
    if (parents[x] === x) return x;

    parents[x] = find(parents[x]);
    return parents[x];
  }

  function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);

    if (rootA === rootB) return false;

    if (size[rootA] < size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    parents[rootB] = rootA;
    size[rootA] += size[rootB];

    return true;
  }

  let answer = 0;

  for (const [a, b, cost] of edges) {
    if (union(a, b)) {
      answer += cost;
    }
  }

  return answer;
}
