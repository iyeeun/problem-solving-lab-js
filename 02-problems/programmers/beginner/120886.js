function solution(before, after) {
  return Number([...before].sort().join('') === [...after].sort().join(''));
}
