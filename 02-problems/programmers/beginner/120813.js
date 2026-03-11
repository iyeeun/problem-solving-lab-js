function solution(n) {
  return Array.from({ length: Math.ceil(n / 2) }, (_, i) => 2 * i + 1);
}
