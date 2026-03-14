function solution(numbers, k) {
  const pass = 2 * (k - 1);
  return numbers[pass % numbers.length];
}
