export default class Queue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.store = [];
  }

  push(data) {
    if (this.maxSize < this.store.length + 1) {
      this.pop();
    }
    this.store.push(data);
  }

  pop() {
    return this.store.shift();
  }

  getArray() {
    return [...this.store];
  }

  size() {
    return this.store.length;
  }

  isEmpty() {
    return this.store.length === 0;
  }
}
