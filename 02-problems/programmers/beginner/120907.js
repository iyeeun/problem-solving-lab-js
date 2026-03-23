function check(x, op, y, z) {
  if (op === '+') {
    return +x + +y === +z;
  } else if (op === '-') {
    return +x - +y === +z;
  }
  return false;
}

function solution(quiz) {
  const answer = [];

  for (const q of quiz) {
    const [x, op, y, eq, z] = q.split(' ');
    answer.push(check(x, op, y, z) ? 'O' : 'X');
  }

  return answer;
}
