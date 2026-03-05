function solution(numbers, n) {
  let sum = 0;

  for (const number of numbers) {
    sum += number;
    if (sum > n) {
      break;
    }
  }

  return sum;
}
