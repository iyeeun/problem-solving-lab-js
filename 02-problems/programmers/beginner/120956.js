function solution(babbling) {
  let answer = 0;

  for (const b of babbling) {
    let replaced = b
      .replace('aya', ' ')
      .replace('ye', ' ')
      .replace('woo', ' ')
      .replace('ma', ' ');
    if (replaced.trim().length === 0) answer++;
  }

  return answer;
}
