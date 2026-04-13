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

      if (this.heap[i] >= this.heap[p]) break;

      this.swap(i, p);
      i = p;
    }
  }

  pop() {
    if (this.size() === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return top;
  }

  bubbleDown() {
    let i = 0;

    while (true) {
      const l = this.getLeft(i);
      const r = this.getRight(i);
      let smallest = i;

      if (l < this.size() && this.heap[l] < this.heap[smallest]) {
        smallest = l;
      }

      if (r < this.size() && this.heap[r] < this.heap[smallest]) {
        smallest = r;
      }

      if (smallest === i) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }

  peek() {
    return this.heap[0];
  }
}

function solution(scoville, K) {
  let answer = 0;
  const heap = new MinHeap();

  for (const s of scoville) {
    heap.push(s);
  }

  while (heap.size() >= 2) {
    if (heap.peek() >= K) break;

    const sm1 = heap.pop();
    const sm2 = heap.pop();
    heap.push(sm1 + sm2 * 2);

    answer++;
  }

  return heap.peek() >= K ? answer : -1;
}
