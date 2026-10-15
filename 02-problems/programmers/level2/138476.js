function solution(k, tangerine) {
  let answer = 0;

  const map = new Map();

  for (const t of tangerine) {
    map.set(t, (map.get(t) || 0) + 1);
  }

  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);

  let sum = 0;
  for (const [num, count] of sorted) {
    if (sum >= k) break;
    sum += count;
    answer++;
  }

  return answer;
}
