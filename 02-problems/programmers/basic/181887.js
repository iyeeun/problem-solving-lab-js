function solution(num_list) {
  const sum = num_list.reduce(
    (acc, num, idx) => {
      idx % 2 === 0 ? (acc.even += num) : (acc.odd += num);
      return acc;
    },
    { odd: 0, even: 0 },
  );

  return Math.max(sum.odd, sum.even);
}
