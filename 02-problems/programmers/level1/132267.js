function solution(a, b, n) {
  let answer = 0;
  let has = n;

  while (has >= a) {
    const tmp = Math.floor(has / a);
    answer += tmp * b;
    has += tmp * b;
    has -= tmp * a;
  }

  return answer;
}
