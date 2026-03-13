function solution(num_list) {
  const { odd, even } = num_list.reduce(
    (acc, num) => {
      if (num % 2 === 0) {
        acc.even++;
      } else {
        acc.odd++;
      }
      return acc;
    },
    { odd: 0, even: 0 },
  );
  return [even, odd];
}
