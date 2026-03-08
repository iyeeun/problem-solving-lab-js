function solution(arr, n) {
  return arr.length % 2 === 0
    ? arr.map((v, idx) => (v += (idx % 2) * n))
    : arr.map((v, idx) => (v += !(idx % 2) * n));
}
