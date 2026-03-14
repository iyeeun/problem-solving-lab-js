function solution(hp) {
  let answer = 0;

  for (const attack of [5, 3, 1]) {
    answer += Math.trunc(hp / attack);
    hp %= attack;
  }

  return answer;
}
