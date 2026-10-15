function solution(arr) {
  function gcd(a, b) {
    if (a % b === 0) return b;
    return gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a / gcd(a, b)) * b;
  }

  return arr.reduce((acc, v) => lcm(acc, v));
}
