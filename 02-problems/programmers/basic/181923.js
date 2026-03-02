function findMinValue(arr, query) {
  const [s, e, k] = query;
  let minVal = -1;

  for (let i = s; i <= e; i++) {
    if (arr[i] > k && (minVal === -1 || arr[i] < minVal)) {
      minVal = arr[i];
    }
  }

  return minVal;
}

function solution(arr, queries) {
  return queries.map((query) => findMinValue(arr, query));
}
