function solution(array, commands) {
  const answer = [];

  for (const [i, j, k] of commands) {
    answer.push(
      array
        .slice(i - 1, j)
        .sort((a, b) => a - b)
        .at(k - 1),
    );
  }

  return answer;
}
