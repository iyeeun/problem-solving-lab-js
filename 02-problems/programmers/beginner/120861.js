function solution(keyinput, board) {
  let [x, y] = [0, 0];

  const move = {
    up: [0, 1],
    down: [0, -1],
    left: [-1, 0],
    right: [1, 0],
  };

  const xlimit = Math.floor(board[0] / 2);
  const ylimit = Math.floor(board[1] / 2);

  for (const k of keyinput) {
    const [dx, dy] = move[k];

    const nx = x + dx;
    const ny = y + dy;

    if (-xlimit <= nx && nx <= xlimit) {
      x = nx;
    }

    if (-ylimit <= ny && ny <= ylimit) {
      y = ny;
    }
  }

  return [x, y];
}
