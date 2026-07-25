function solution(distance, rocks, n) {
  rocks.sort((a, b) => a - b);
  rocks.push(distance);

  let left = 1;
  let right = distance;
  let answer = 0;

  while (left <= right) {
    const mid = Math.trunc((left + right) / 2);

    let cur = 0;
    let remove = 0;

    for (const r of rocks) {
      if (r - cur >= mid) {
        cur = r;
      } else {
        remove++;
      }
    }

    if (remove <= n) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}
