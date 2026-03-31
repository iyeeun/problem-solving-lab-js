function solution(arr) {
  const answer = [];

  for (const a of arr) {
    if (answer.length === 0 || answer[answer.length - 1] !== a) {
      answer.push(a);
    }
  }

  return answer;
}
