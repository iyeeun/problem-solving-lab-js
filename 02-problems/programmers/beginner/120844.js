function solution(numbers, direction) {
  switch (direction) {
    case 'left':
      return [...numbers.slice(1), numbers[0]];
    case 'right':
      return [numbers.at(-1), ...numbers.slice(0, -1)];
  }
}
