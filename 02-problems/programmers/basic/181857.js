function solution(arr) {
  let target = 1;

  while (target < arr.length) {
    target *= 2;
  }

  return arr.concat(Array(target - arr.length).fill(0));
}
