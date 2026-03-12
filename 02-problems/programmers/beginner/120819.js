function solution(money) {
  const americano = 5500;
  return [Math.trunc(money / americano), money % americano];
}
