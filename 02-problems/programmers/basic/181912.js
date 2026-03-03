function solution(intStrs, k, s, l) {
  const answer = [];

  for (const str of intStrs) {
    const substr = str.slice(s, s + l);
    if (Number(substr) > k) {
      answer.push(Number(substr));
    }
  }

  return answer;
}
