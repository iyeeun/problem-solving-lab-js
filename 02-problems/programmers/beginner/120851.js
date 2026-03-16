function solution(my_string) {
  return [...my_string]
    .filter((v) => !isNaN(v))
    .map((v) => Number(v))
    .reduce((sum, num) => sum + num);
}
