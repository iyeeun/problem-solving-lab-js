class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  getParent(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeft(i) {
    return 2 * i + 1;
  }

  getRight(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(v) {
    this.heap.push(v);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.size() - 1;
    while (i > 0) {
      const p = this.getParent(i);
      if (this.heap[p][0] <= this.heap[i][0]) break;
      this.swap(i, p);
      i = p;
    }
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }

  bubbleDown() {
    let i = 0;

    while (true) {
      let smallest = i;

      const l = this.getLeft(i);
      const r = this.getRight(i);

      if (l < this.size() && this.heap[l][0] < this.heap[i][0]) {
        smallest = l;
      }

      if (r < this.size() && this.heap[r][0] < this.heap[i][0]) {
        smallest = r;
      }

      if (smallest === i) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}

function solution(N, road, K) {
  const graph = Array.from({ length: N + 1 }, () => []);

  for (const [a, b, cost] of road) {
    graph[a].push([b, cost]);
    graph[b].push([a, cost]);
  }

  const dist = Array(N + 1).fill(Infinity);

  const heap = new MinHeap();

  dist[1] = 0;
  heap.push([0, 1]);

  while (heap.size() > 0) {
    const [curCost, cur] = heap.pop();

    if (curCost > dist[cur]) continue;

    for (const [next, weight] of graph[cur]) {
      const nextCost = curCost + weight;

      if (nextCost < dist[next]) {
        dist[next] = nextCost;
        heap.push([nextCost, next]);
      }
    }
  }

  return dist.slice(1).filter((cost) => cost <= K).length;
}
