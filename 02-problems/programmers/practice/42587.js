function solution(priorities, location) {
  const arr = priorities.map((p, i) => ({ p, i }));
  let answer = 0;

  while (true) {
    const cur = arr.shift();

    if (arr.some((v) => v.p > cur.p)) {
      arr.push(cur);
    } else {
      answer++;
      if (cur.i === location) break;
    }
  }

  return answer;
}
