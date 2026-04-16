class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare; // a - b 방식
  }

  size() {
    return this.heap.length;
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
    this._up();
  }

  _up() {
    let i = this.size() - 1;

    while (i > 0) {
      const p = this.getParent(i);
      if (this.compare(this.heap[p], this.heap[i]) <= 0) break;
      this.swap(i, p);
      i = p;
    }
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._down();
    return top;
  }

  _down() {
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

      this.swap(i, target);
      i = target;
    }
  }
}
