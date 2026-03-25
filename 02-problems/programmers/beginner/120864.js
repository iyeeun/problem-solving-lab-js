function solution(my_string) {
  const nums = my_string.match(/\d+/g);
  return nums ? nums.reduce((acc, v) => acc + Number(v), 0) : 0;
}
