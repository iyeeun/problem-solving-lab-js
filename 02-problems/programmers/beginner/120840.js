function factorial(n) {
  let answer = 1n;

  for (let i = 2n; i <= BigInt(n); i++) {
    answer *= i;
  }

  return answer;
}

function solution(balls, share) {
  return factorial(balls) / (factorial(balls - share) * factorial(share));
}
