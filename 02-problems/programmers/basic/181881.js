function solution(arr) {
  let answer = 0;

  while (true) {
    const newArr = arr.map((v) => {
      if (v >= 50 && v % 2 === 0) {
        return v / 2;
      } else if (v < 50 && v % 2 !== 0) {
        return 2 * v + 1;
      } else {
        return v;
      }
    });

    if (arr.every((v, i) => v === newArr[i])) {
      break;
    }

    answer++;
    arr = newArr;
  }

  return answer;
}
