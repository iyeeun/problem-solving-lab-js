function solution(arr, query) {
  for (const [idx, q] of query.entries()) {
    if (idx % 2 === 0) {
      arr = arr.slice(0, q + 1);
    } else {
      arr = arr.slice(q);
    }
  }

  return arr;
}
