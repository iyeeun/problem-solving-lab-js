function solution(s) {
  const numbers = [];

  s.split(' ').forEach((v) => {
    if (v === 'Z') {
      numbers.pop();
    } else {
      numbers.push(Number(v));
    }
  });

  return numbers.reduce((sum, num) => sum + num, 0);
}
