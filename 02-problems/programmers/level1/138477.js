function solution(k, score) {
  const answer = [];

  const prize = [];

  for (const s of score) {
    if (prize.length < k) {
      prize.push(s);
      prize.sort((a, b) => b - a);
    } else if (prize.at(-1) < s) {
      prize.pop();
      prize.push(s);
      prize.sort((a, b) => b - a);
    }

    answer.push(prize.at(-1));
  }

  return answer;
}
