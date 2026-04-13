function solution(scoville, K) {
  let answer = 0;
  while (scoville.length >= 2) {
    scoville.sort((a, b) => a - b);
    if (scoville[0] >= K) return answer;

    const newFood = scoville[0] + scoville[1] * 2;
    scoville.shift();
    scoville.shift();
    scoville.push(newFood);

    answer++;
  }

  return scoville[0] >= K ? answer : -1;
}
