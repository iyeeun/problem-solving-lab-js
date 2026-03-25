function solution(sides) {
  const [short, long] = sides.sort((a, b) => a - b);
  const maxVal = sides[0] + sides[1];
  const arr = new Array(maxVal).fill(false);

  for (let i = 1; i < arr.length; i++) {
    if (i <= long) {
      if (short + i > long) {
        arr[i] = true;
      }
    } else {
      if (short + long > i) {
        arr[i] = true;
      }
    }
  }

  return arr.filter((v) => v).length;
}
