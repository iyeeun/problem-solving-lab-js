function solution(numbers) {
  const answer = numbers
    .sort((a, b) => {
      const num1 = a.toString() + b.toString();
      const num2 = b.toString() + a.toString();

      if (num1 < num2) return 1;
      if (num2 < num1) return -1;
      return 0;
    })
    .join('');

  return Number(answer) ? answer : '0';
}
