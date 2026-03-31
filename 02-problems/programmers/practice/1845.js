function solution(nums) {
  const count = new Set(nums);
  return Math.min(count.size, nums.length / 2);
}
