function solution(picture, k) {
  const answer = [];

  for (const line of picture) {
    let expanded = [...line].map((c) => c.repeat(k)).join('');

    for (let i = 0; i < k; i++) {
      answer.push(expanded);
    }
  }

  return answer;
}
