function solution(n) {
  let answer = 0;

  let left = 1;
  let right = 2;

  let sum = 1;

  while (left <= n) {
    if (sum <= n) {
      if (sum === n) {
        answer++;
      }
      sum += right++;
    } else {
      sum -= left++;
    }
  }

  return answer;
}
