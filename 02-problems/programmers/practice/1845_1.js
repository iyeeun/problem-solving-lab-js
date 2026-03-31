function solution(nums) {
  const count = new Map();

  for (const n of nums) {
    count.set(n, (count.get(n) || 0) + 1);
  }

  return Math.min(count.size, nums.length / 2);
}
