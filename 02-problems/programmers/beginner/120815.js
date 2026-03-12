function solution(n) {
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  // lcm(n, 6) / 6
  return n / gcd(n, 6);
}
