function solution(l, r) {
  const answer = [];

  for (let i = l; i <= r; i++) {
    if ([...i.toString()].every((v) => v === '0' || v === '5')) {
      answer.push(i);
    }
  }

  return answer.length ? answer : [-1];
}
