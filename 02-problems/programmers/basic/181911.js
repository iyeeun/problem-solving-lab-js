function solution(my_strings, parts) {
  const answer = [];

  for (const [i, str] of my_strings.entries()) {
    const [s, e] = parts[i];
    answer.push(str.slice(s, e + 1));
  }

  return answer.join('');
}
