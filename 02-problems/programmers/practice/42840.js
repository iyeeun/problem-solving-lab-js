function solution(answers) {
  const res = [];

  const checks = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];
  const score = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    for (let j = 0; j < checks.length; j++) {
      if (answers[i] === checks[j][i % checks[j].length]) score[j]++;
    }
  }

  const maxScore = Math.max(...score);
  for (let i = 0; i < checks.length; i++) {
    if (maxScore === score[i]) res.push(i + 1);
  }

  return res;
}
