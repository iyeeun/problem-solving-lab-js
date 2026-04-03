function solution(progresses, speeds) {
  const answer = [];

  const complete = progresses.map((v, i) => Math.ceil((100 - v) / speeds[i]));

  let target = complete[0];
  let count = 1;

  for (let i = 1; i < complete.length; i++) {
    if (complete[i] <= target) {
      count++;
    } else {
      target = complete[i];
      answer.push(count);
      count = 1;
    }
  }

  answer.push(count);

  return answer;
}
