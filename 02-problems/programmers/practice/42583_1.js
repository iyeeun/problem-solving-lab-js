function solution(bridge_length, weight, truck_weights) {
  let answer = 0;
  const bridge = new Array(bridge_length).fill(0);

  let target = 0;
  while (true) {
    answer++;
    bridge.shift();

    const sum = bridge.reduce((acc, num) => acc + num);
    if (target >= truck_weights.length && sum === 0) break;

    if (sum + truck_weights[target] <= weight) {
      bridge[bridge_length - 1] = truck_weights[target];
      target++;
    } else {
      bridge[bridge_length - 1] = 0;
    }
  }

  return answer;
}
