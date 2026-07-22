function solution(n, costs) {
  let answer = 0;

  const parent = Array.from({ length: n }, (_, i) => i);
  const size = Array(n).fill(1);

  function find(x) {
    if (x === parent[x]) return x;

    parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);

    if (rootA === rootB) return false;

    if (size[rootA] > size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    parent[rootA] = rootB;
    size[rootB] += size[rootA];

    return true;
  }

  costs.sort((a, b) => a[2] - b[2]);

  for (const [s, e, c] of costs) {
    if (!union(s, e)) continue;
    answer += c;
  }

  return answer;
}
