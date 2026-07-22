function solution(routes) {
  let answer = 0;
  let camera = -Infinity;

  routes.sort((a, b) => a[1] - b[1]);

  for (const [s, e] of routes) {
    if (s > camera) {
      camera = e;
      answer++;
    }
  }

  return answer;
}
