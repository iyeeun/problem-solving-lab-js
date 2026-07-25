function solution(rectangle, characterX, characterY, itemX, itemY) {
  const LIMIT = 110;
  const arr = Array.from({ length: LIMIT }, (_, i) => new Array(LIMIT).fill(0));
  const dist = Array.from({ length: LIMIT }, (_, i) =>
    new Array(LIMIT).fill(-1),
  );

  for (const [x1, y1, x2, y2] of rectangle) {
    for (let i = 2 * x1; i <= 2 * x2; i++) {
      for (let j = 2 * y1; j <= 2 * y2; j++) {
        arr[i][j] = 1;
      }
    }
  }

  for (const [x1, y1, x2, y2] of rectangle) {
    for (let i = 2 * x1 + 1; i < 2 * x2; i++) {
      for (let j = 2 * y1 + 1; j < 2 * y2; j++) {
        arr[i][j] = 0;
      }
    }
  }

  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  const q = [];
  q.push([2 * characterX, 2 * characterY]);
  dist[2 * characterX][2 * characterY] = 0;

  let head = 0;
  while (head < q.length) {
    const [x, y] = q[head++];

    if (x === 2 * itemX && y === 2 * itemY) break;

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (0 <= nx && nx < LIMIT && 0 <= ny && ny < LIMIT) {
        if (arr[nx][ny] === 1 && dist[nx][ny] === -1) {
          dist[nx][ny] = dist[x][y] + 1;
          q.push([nx, ny]);
        }
      }
    }
  }

  return dist[2 * itemX][2 * itemY] / 2;
}
