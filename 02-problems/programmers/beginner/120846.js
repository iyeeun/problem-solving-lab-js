function findPrimeNumber(num) {
  const isPrime = new Array(num + 1).fill(true);

  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= num; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= num; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return isPrime;
}

function solution(n) {
  return findPrimeNumber(n).filter((v) => !v).length - 2; // 0, 1 제외
}
