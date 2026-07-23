function solution(triangle) {
  const dp = Array.from({ length: triangle.length }, (_, i) =>
    new Array(i + 1).fill(-1),
  );

  dp[0][0] = triangle[0][0];

  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] =
        Math.max(dp[i - 1][j - 1] || 0, dp[i - 1][j] || 0) + triangle[i][j];
    }
  }

  return Math.max(...dp[triangle.length - 1]);
}
