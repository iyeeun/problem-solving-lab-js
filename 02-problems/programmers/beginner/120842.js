function solution(num_list, n) {
  return Array.from({ length: num_list.length / n }, (_, i) =>
    Array.from({ length: n }, (_, j) => num_list[i * n + j]),
  );
}
