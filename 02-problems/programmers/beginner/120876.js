function solution(lines) {
  const minVal = Math.min(...lines.flat());
  const maxVal = Math.max(...lines.flat());

  const arr = new Array(maxVal - minVal + 1).fill(0);

  for (const [s, e] of lines) {
    for (let i = s; i < e; i++) {
      arr[i - minVal]++;
    }
  }

  return arr.filter((v) => v > 1).length;
}
