function solution(a, b) {
  const oddCount = (a % 2) + (b % 2);

  switch (oddCount) {
    case 0:
      return Math.abs(a - b);
    case 1:
      return 2 * (a + b);
    case 2:
      return a * a + b * b;
  }
}
