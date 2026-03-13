function solution(n, k) {
  const total = 12000 * n + 2000 * (k - Math.trunc(n / 10));
  return total;
}
