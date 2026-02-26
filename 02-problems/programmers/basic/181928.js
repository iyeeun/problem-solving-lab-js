function solution(num_list) {
  const { odd, even } = num_list.reduce(
    (acc, cur) => {
      cur % 2 === 0 ? (acc.even += cur) : (acc.odd += cur);
      return acc;
    },
    { odd: '', even: '' },
  );

  return Number(odd) + Number(even);
}
