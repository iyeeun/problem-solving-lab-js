function solution(arr) {
  const answer = [];

  for (const num of arr) {
    answer.push(...Array(num).fill(num));
  }

  return answer;
}
