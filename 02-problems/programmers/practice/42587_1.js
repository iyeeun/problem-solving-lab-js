function solution(priorities, location) {
  let arr = priorities.map((v, idx) => ({ p: v, i: idx }));
  let answer = 0;

  while (arr.length > 0) {
    const max = Math.max(...arr.map((v) => v.p));
    const maxIdx = arr.map((v) => v.p).indexOf(max);

    answer++;

    if (arr[maxIdx].i === location) {
      return answer;
    }

    arr = arr.slice(maxIdx + 1).concat(arr.slice(0, maxIdx));
  }
}
