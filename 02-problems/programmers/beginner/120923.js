function solution(num, total) {
  const answer = [];
  const center = total / num;
  for (let i = center - (num - 1) / 2; i <= center + (num - 1) / 2; i++) {
    answer.push(i);
  }
  return answer;
}
