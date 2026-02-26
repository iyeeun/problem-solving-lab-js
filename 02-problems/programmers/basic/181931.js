function solution(a, d, included) {
  let answer = 0;

  included.forEach((i, idx) => {
    if (i) {
      answer += a + idx * d;
    }
  });

  return answer;
}
