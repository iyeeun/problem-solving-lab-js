function solution(clothes) {
  const map = {};

  for (const [_, category] of clothes) {
    map[category] = (map[category] || 0) + 1;
  }

  return Object.values(map).reduce((acc, num) => acc * (num + 1), 1) - 1;
}
