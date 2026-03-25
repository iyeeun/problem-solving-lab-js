function solution(board) {
  let safe = board.reduce(
    (acc, v) => v.reduce((cnt, num) => (num === 0 ? cnt + 1 : cnt), acc),
    0,
  );

  const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 1) {
        for (let t = 0; t < 8; t++) {
          let nx = i + dx[t];
          let ny = j + dy[t];
          if (0 <= nx && nx < board.length && 0 <= ny && ny < board[i].length) {
            if (board[nx][ny] === 0) {
              board[nx][ny] = -1;
              safe--;
            }
          }
        }
      }
    }
  }

  return safe;
}
