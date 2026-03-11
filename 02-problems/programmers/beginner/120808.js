function getGcd(a, b) {
  if (b === 0) return a;
  return getGcd(b, a % b);
}

function solution(numer1, denom1, numer2, denom2) {
  const numer3 = numer1 * denom2 + numer2 * denom1;
  const denom3 = denom1 * denom2;

  const gcd = getGcd(numer3, denom3);
  return [numer3 / gcd, denom3 / gcd];
}
