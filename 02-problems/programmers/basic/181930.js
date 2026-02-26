function solution(a, b, c) {
  const score = new Set([a, b, c]);

  const s1 = a + b + c;
  const s2 = a ** 2 + b ** 2 + c ** 2;
  const s3 = a ** 3 + b ** 3 + c ** 3;

  switch (score.size) {
    case 1:
      return s1 * s2 * s3;
    case 2:
      return s1 * s2;
    case 3:
      return s1;
  }
}
