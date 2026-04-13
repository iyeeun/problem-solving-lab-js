function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let curWeight = 0;
  const bridge = [];

  while (truck_weights.length > 0 || bridge.length > 0) {
    time++;

    if (bridge[0]?.end === time) {
      curWeight -= bridge.shift().truck;
    }

    if (curWeight + truck_weights[0] <= weight) {
      const truck = truck_weights.shift();
      curWeight += truck;
      bridge.push({ truck: truck, end: time + bridge_length });
    }
  }

  return time;
}
