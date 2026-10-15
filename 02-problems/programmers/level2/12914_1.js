function solution(n) {
  if (n === 1) return 1;

  let prev = 1;
  let cur = 2;

  for (let i = 3; i <= n; i++) {
    const next = (prev + cur) % 1234567;
    prev = cur;
    cur = next;
  }

  return cur;
}
