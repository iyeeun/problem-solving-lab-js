function solution(N, number) {
  const dp = Array.from({ length: 9 }, (_, i) => new Set());

  for (let count = 1; count <= 8; count++) {
    dp[count].add(+N.toString().repeat(count));

    for (let selected = 1; selected <= count / 2; selected++) {
      for (const a of dp[selected]) {
        for (const b of dp[count - selected]) {
          dp[count].add(a + b);
          dp[count].add(a - b);
          dp[count].add(b - a);
          dp[count].add(a * b);

          if (a) dp[count].add(Math.trunc(b / a));
          if (b) dp[count].add(Math.trunc(a / b));
        }
      }

      if (dp[count].has(number)) return count;
    }
  }

  return -1;
}
