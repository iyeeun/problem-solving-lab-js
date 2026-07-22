function solution(routes) {
  let answer = 0;

  routes.sort((a, b) => a[0] - b[0]);

  let overlap = [-30000, 30000];

  for (const [s, e] of routes) {
    if (s <= overlap[1]) {
      overlap[0] = s;
      overlap[1] = Math.min(overlap[1], e);
    } else {
      overlap = [s, e];
      answer++;
    }
  }

  return answer + 1;
}
