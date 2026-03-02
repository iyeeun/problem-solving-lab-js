function solution(numLog) {
  const answer = [];

  for (let i = 0; i < numLog.length - 1; i++) {
    const diff = numLog[i] - numLog[i + 1];
    if (diff === -1) {
      answer.push('w');
    } else if (diff === 1) {
      answer.push('s');
    } else if (diff === -10) {
      answer.push('d');
    } else if (diff === 10) {
      answer.push('a');
    }
  }

  return answer.join('');
}
