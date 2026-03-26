function solution(score) {
  const sorted = score.map((v) => v[0] + v[1]).sort((a, b) => b - a);
  return score.map((v) => sorted.indexOf(v[0] + v[1]) + 1);
}
