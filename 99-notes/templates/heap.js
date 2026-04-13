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

  pop() {
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return top;
  }

  bubbleUp() {
    let i = this.heap.length - 1;

    while (i > 0) {
      const parent = this.getParent(i);
      if (this.heap[parent] <= this.heap[i]) break;
      this.swap(i, parent);
      i = parent;
    }
  }

  bubbleDown() {
    let i = 0;

    while (true) {
      const l = this.getLeft(i);
      const r = this.getRight(i);

      let smallest = i;

      if (l < this.heap.length && this.heap[l] < this.heap[smallest]) {
        smallest = l;
      }

      if (r < this.heap.length && this.heap[r] < this.heap[smallest]) {
        smallest = r;
      }

      if (smallest === i) break;

      this.swap(i, smallest);
      i = smallest;
    }
  }
}
