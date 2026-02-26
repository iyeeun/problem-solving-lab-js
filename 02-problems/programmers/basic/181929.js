function solution(num_list) {
  const multiply = num_list.reduce((acc, cur) => acc * cur);
  const sum = num_list.reduce((acc, cur) => acc + cur);

  return Number(multiply < sum * sum);
}
