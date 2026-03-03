function solution(number) {
  const rest = [...number].reduce((sum, num) => sum + Number(num), 0) % 9;
  return rest;
}
