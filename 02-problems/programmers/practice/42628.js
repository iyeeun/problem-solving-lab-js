class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
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

  push(v) {
    this.heap.push(v);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.size() - 1;

    while (i > 0) {
      const p = this.getParent(i);
      if (this.compare(this.heap[p], this.heap[i]) <= 0) break;
      this.swap(p, i);
      i = p;
    }
  }

  pop() {
    if (this.size() === 0) return undefined;
    if (this.size() === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return top;
  }

  bubbleDown() {
    let i = 0;

    while (true) {
      let l = this.getLeft(i);
      let r = this.getRight(i);
      let target = i;

      if (
        l < this.size() &&
        this.compare(this.heap[l], this.heap[target]) < 0
      ) {
        target = l;
      }

      if (
        r < this.size() &&
        this.compare(this.heap[r], this.heap[target]) < 0
      ) {
        target = r;
      }

      if (target === i) break;

      this.swap(target, i);
      i = target;
    }
  }
}

function solution(operations) {
  const minHeap = new Heap((a, b) => a - b);
  const maxHeap = new Heap((a, b) => b - a);
  const count = new Map();

  const clean = (heap) => {
    while (heap.size()) {
      const top = heap.peek();
      if ((count.get(top) || 0) > 0) break;
      heap.pop();
    }
  };

  for (const op of operations) {
    const [cmd, num] = op.split(' ');

    if (cmd === 'I') {
      minHeap.push(+num);
      maxHeap.push(+num);
      count.set(+num, (count.get(+num) || 0) + 1);
    } else if (cmd === 'D') {
      if (num === '1') {
        clean(maxHeap);
        const target = maxHeap.pop();
        if (target !== undefined) count.set(target, count.get(target) - 1);
      } else if (num === '-1') {
        clean(minHeap);
        const target = minHeap.pop();
        if (target !== undefined) count.set(target, count.get(target) - 1);
      }
    }
  }

  clean(minHeap);
  clean(maxHeap);

  if (minHeap.size() === 0) return [0, 0];

  return [maxHeap.peek(), minHeap.peek()];
}
