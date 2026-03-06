function solution(num_list) {
  return num_list.length > 10
    ? num_list.reduce((acc, num) => acc + num, 0)
    : num_list.reduce((acc, num) => acc * num, 1);
}
