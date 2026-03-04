function solution(arr) {
  const firstIdx = arr.indexOf(2);
  const lastIdx = arr.lastIndexOf(2);
  const answer = arr.slice(firstIdx, lastIdx + 1);

  return answer.length ? answer : [-1];
}
