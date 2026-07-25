function solution(n, results) {
  let answer = 0;

  const win = Array.from({ length: n + 1 }, (_, i) => Array(n + 1).fill(false));

  for (const [winner, loser] of results) {
    win[winner][loser] = true;
  }

  for (let mid = 1; mid <= n; mid++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (win[i][mid] && win[mid][j]) {
          win[i][j] = true;
        }
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    let count = 0;
    for (let j = 1; j <= n; j++) {
      if (win[i][j] || win[j][i]) count++;
    }

    if (count === n - 1) answer++;
  }

  return answer;
}
