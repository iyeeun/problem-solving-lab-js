function solution(dots) {
  const x = dots.map((v) => v[0]);
  const y = dots.map((v) => v[1]);

  return (Math.max(...x) - Math.min(...x)) * (Math.max(...y) - Math.min(...y));
}
