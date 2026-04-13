function solution(brown, yellow) {
  const sum = brown + yellow;

  for (let h = 1; h * h <= yellow; h++) {
    if (yellow % h === 0) {
      const w = yellow / h;
      if (yellow % w === 0 && (w + 2) * (h + 2) === sum) {
        return [w + 2, h + 2];
      }
    }
  }
}
