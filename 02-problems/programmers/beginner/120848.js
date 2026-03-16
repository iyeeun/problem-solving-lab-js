function solution(n) {
  let num = 1;
  for (let i = 1; i <= 10; i++) {
    if (num * i > n) {
      return i - 1;
    }
    num *= i;
  }
  return 10;
}
