class MinHeap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
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
      if (this.compare(this.heap[p], this.heap[i])) break;
      this.swap(i, p);
      i = p;
    }
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();

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

      if (l < this.size() && !this.compare(this.heap[target], this.heap[l])) {
        target = l;
      }

      if (r < this.size() && !this.compare(this.heap[target], this.heap[r])) {
        target = r;
      }

      if (target === i) break;

      this.swap(target, i);
      i = target;
    }
  }
}

function solution(jobs) {
  let answer = 0;

  const heap = new MinHeap((a, b) => {
    if (a[1] === b[1]) return a[0] < b[0];
    return a[1] < b[1];
  });

  let cur = 0;
  let target = 0;

  jobs.sort((a, b) => a[0] - b[0]);

  while (target < jobs.length || heap.size()) {
    while (target < jobs.length && jobs[target][0] <= cur) {
      heap.push(jobs[target]);
      target++;
    }

    if (heap.size() === 0) {
      cur = jobs[target][0];
      continue;
    }

    const top = heap.pop();
    cur += top[1];
    answer += cur - top[0];
  }

  return Math.trunc(answer / jobs.length);
}
