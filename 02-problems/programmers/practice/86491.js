function solution(sizes) {
  sizes.forEach((size) => size.sort((a, b) => a - b));
  return (
    Math.max(...sizes.map((v) => v[0])) * Math.max(...sizes.map((v) => v[1]))
  );
}
