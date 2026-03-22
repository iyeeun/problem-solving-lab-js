function solution(s) {
  const count = {};

  [...s].forEach((ch) => (count[ch] = (count[ch] || 0) + 1));

  return Object.keys(count)
    .filter((ch) => count[ch] === 1)
    .sort()
    .join('');
}
