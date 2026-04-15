function solution(name) {
  const [codeA, codeZ] = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];
  let answer = 0;

  for (const c of name) {
    const code = c.charCodeAt(0);
    answer += Math.min(Math.abs(codeA - code), Math.abs(codeZ + 1 - code));
  }

  let cursor = name.length - 1;

  for (let i = 0; i < name.length; i++) {
    let next = i + 1;

    while (next < name.length && name[next] === 'A') {
      next++;
    }

    const move1 = i * 2 + (name.length - next);
    const move2 = (name.length - next) * 2 + i;

    cursor = Math.min(cursor, move1, move2);
  }

  return answer + cursor;
}
