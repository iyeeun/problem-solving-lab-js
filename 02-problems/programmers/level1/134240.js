function solution(food) {
  const order = [];

  for (let i = 1; i < food.length; i++) {
    order.push(i.toString().repeat(Math.trunc(food[i] / 2)));
  }

  return order.join('') + '0' + order.reverse().join('');
}
