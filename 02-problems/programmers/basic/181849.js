function solution(num_str) {
  let answer = 0;

  for (const num of num_str) {
    answer += Number(num);
  }

  return answer;
}
