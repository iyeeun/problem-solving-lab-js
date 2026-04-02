function solution(n, lost, reserve) {
  const count = new Array(n + 2).fill(1);
  count[0] = 0;
  count[n + 1] = 0;
  lost.forEach((v) => count[v]--);
  reserve.forEach((v) => count[v]++);

  for (let i = 1; i <= n; i++) {
    if (count[i] === 0) {
      if (count[i - 1] > 1) {
        count[i - 1]--;
        count[i]++;
      } else if (count[i + 1] > 1) {
        count[i + 1]--;
        count[i]++;
      }
    }
  }

  return count.filter((v) => v > 0).length;
}
