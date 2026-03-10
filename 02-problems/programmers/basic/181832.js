function solution(n) {
  const answer = Array.from({ length: n }, () => Array(n).fill(0));

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  let [x, y, mode] = [0, 0, 0];

  for (let num = 1; num <= n * n; num++) {
    answer[x][y] = num;

    let nx = x + dx[mode];
    let ny = y + dy[mode];

    if (nx < 0 || nx >= n || ny < 0 || ny >= n || answer[nx][ny] !== 0) {
      mode = (mode + 1) % 4;
      nx = x + dx[mode];
      ny = y + dy[mode];
    }

    x = nx;
    y = ny;
  }

  return answer;
}
