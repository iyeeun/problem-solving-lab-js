function solution(rsp) {
  const winCase = {
    0: 5,
    2: 0,
    5: 2,
  };

  return [...rsp].map((v) => winCase[v]).join('');
}
