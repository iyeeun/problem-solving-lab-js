function solution(n, a, b) {
  let answer = 1;

  while (Math.floor((a + 1) / 2) !== Math.floor((b + 1) / 2)) {
    a = Math.floor((a + 1) / 2);
    b = Math.floor((b + 1) / 2);

    answer++;
  }

  return answer;
}
