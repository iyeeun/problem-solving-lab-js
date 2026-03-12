function solution(numbers) {
  const sum = numbers.reduce((sum, num) => sum + num, 0);
  return sum / numbers.length;
}
