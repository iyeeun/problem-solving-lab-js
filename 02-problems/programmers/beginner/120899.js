function solution(array) {
  const maxVal = Math.max(...array);
  return [maxVal, array.indexOf(maxVal)];
}
