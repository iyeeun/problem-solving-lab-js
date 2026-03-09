function solution(rank, attendance) {
  const [a, b, c] = rank
    .map((_, i) => i)
    .filter((v, i) => attendance[i])
    .sort((a, b) => rank[a] - rank[b])
    .slice(0, 3);
  return 10000 * a + 100 * b + c;
}
