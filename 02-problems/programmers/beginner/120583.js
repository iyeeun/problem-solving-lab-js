function solution(array, n) {
  return array.reduce((acc, v) => (v === n ? acc + 1 : acc), 0);
}
