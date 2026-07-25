function solution(n, times) {
  let left = 1;
  let right = Math.min(...times) * n;

  let mid;
  while (left < right) {
    mid = Math.trunc((left + right) / 2);

    let processed = 0;
    for (const t of times) {
      processed += Math.trunc(mid / t);
    }

    if (processed >= n) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
