function check(num) {
  while (num % 2 === 0) {
    num /= 2;
  }

  while (num % 5 === 0) {
    num /= 5;
  }

  return num === 1;
}

function solution(a, b) {
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  return check(b / gcd(a, b)) ? 1 : 2;
}
