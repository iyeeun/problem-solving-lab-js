function solution(i, j, k) {
  let answer = 0;

  for (let t = i; t <= j; t++) {
    answer += t
      .toString()
      .split('')
      .filter((v) => v === k.toString()).length;
  }

  return answer;
}
