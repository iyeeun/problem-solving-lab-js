function solution(arr, intervals) {
  const answer = [];

  for (const [a, b] of intervals) {
    answer.push(...arr.slice(a, b + 1));
  }

  return answer;
}
