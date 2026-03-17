function solution(array, n) {
  array.sort((a, b) => {
    if (Math.abs(n - a) === Math.abs(n - b)) {
      return a - b;
    } else {
      return Math.abs(n - a) - Math.abs(n - b);
    }
  });

  return array[0];
}
