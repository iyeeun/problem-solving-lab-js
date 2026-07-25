function rotate(shape) {
  return shape.map(([x, y]) => [y, -x]);
}

function isFit(a, b) {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const sortedB = [...b].sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const adiff = sortedA.map(([x, y]) => [x - sortedA[0][0], y - sortedA[0][1]]);
  const bdiff = sortedB.map(([x, y]) => [x - sortedB[0][0], y - sortedB[0][1]]);

  return JSON.stringify(adiff) === JSON.stringify(bdiff);
}

function solution(game_board, table) {
  let answer = 0;

  const n = game_board.length;

  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  const blanks = [];
  const pieces = [];

  const blankdist = Array.from({ length: n }, (_, i) => new Array(n).fill(-1));
  const piecedist = Array.from({ length: n }, (_, i) => new Array(n).fill(-1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (game_board[i][j] === 0 && blankdist[i][j] === -1) {
        const q = [];

        q.push([i, j]);
        blankdist[i][j] = 0;

        const routes = [[i, j]];

        while (q.length) {
          const [x, y] = q.shift();

          for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + dx[i], y + dy[i]];
            if (0 <= nx && nx < n && 0 <= ny && ny < n) {
              if (game_board[nx][ny] === 0 && blankdist[nx][ny] === -1) {
                q.push([nx, ny]);
                blankdist[nx][ny] = blankdist[x][y] + 1;
                routes.push([nx, ny]);
              }
            }
          }
        }
        blanks.push(routes);
      }

      if (table[i][j] === 1 && piecedist[i][j] === -1) {
        const q = [];

        q.push([i, j]);
        piecedist[i][j] = 0;

        const routes = [[i, j]];

        while (q.length) {
          const [x, y] = q.shift();

          for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + dx[i], y + dy[i]];
            if (0 <= nx && nx < n && 0 <= ny && ny < n) {
              if (table[nx][ny] === 1 && piecedist[nx][ny] === -1) {
                q.push([nx, ny]);
                piecedist[nx][ny] = piecedist[x][y] + 1;
                routes.push([nx, ny]);
              }
            }
          }
        }
        pieces.push(routes);
      }
    }
  }

  const used = new Array(pieces.length).fill(false);

  for (const b of blanks) {
    for (let i = 0; i < pieces.length; i++) {
      if (used[i]) continue;

      if (b.length !== pieces[i].length) continue;

      let same = false;

      const rotate1 = rotate(pieces[i]);
      const rotate2 = rotate(rotate1);
      const rotate3 = rotate(rotate2);

      for (const target of [pieces[i], rotate1, rotate2, rotate3]) {
        if (isFit(b, target)) {
          same = true;
          break;
        }
      }

      if (same) {
        used[i] = true;
        answer += b.length;
        break;
      }
    }
  }

  return answer;
}
