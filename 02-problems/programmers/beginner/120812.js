function solution(array) {
  const count = {};

  for (const a of array) {
    count[a] = (count[a] ?? 0) + 1;
  }

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);

  if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) return -1;

  return Number(sorted[0][0]);
}
