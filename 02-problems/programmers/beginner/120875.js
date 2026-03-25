function isParallel(a, b, c, d) {
  return (b[1] - a[1]) * (d[0] - c[0]) === (b[0] - a[0]) * (d[1] - c[1]);
}

function solution(dots) {
  if (
    isParallel(dots[0], dots[1], dots[2], dots[3]) ||
    isParallel(dots[0], dots[2], dots[1], dots[3]) ||
    isParallel(dots[0], dots[3], dots[1], dots[2])
  ) {
    return 1;
  }

  return 0;
}
