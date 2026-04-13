function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      maps[i][j] *= -1;
    }
  }

  const q = [[0, 0]];
  maps[0][0] = 1;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  while (q.length > 0) {
    const [x, y] = q.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (0 <= nx && nx < n && 0 <= ny && ny < m) {
        if (maps[nx][ny] === -1) {
          maps[nx][ny] = maps[x][y] + 1;
          q.push([nx, ny]);
        }
      }
    }
  }

  return maps[n - 1][m - 1];
}
