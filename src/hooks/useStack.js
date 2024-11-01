export class UniqueStack {
  constructor(data) {
    this.items = data||[];
  }

  // 添加元素到栈顶
  push(element) {
    if (!this.items.includes(element)) {
        this.items.push(element);
      }
  }

  // 移除栈顶元素并返回
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }
// 移除栈底元素并返回
  shift(){
    if (this.isEmpty()) {
        return null;
      }
      return this.items.shift();
  }

  // 返回栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }

  // 判断栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }

  // 返回栈的大小
  size() {
    return this.items.length;
  }

  // 清空栈
  clear() {
    this.items = [];
  }

  show(){
    return this.items
  }
}

// // 使用示例
// const stack = new Stack();

// stack.push(1);
// stack.push(2);
// stack.push(3);

// console.log(stack.peek()); // 输出：3

// console.log(stack.pop()); // 输出：3
// console.log(stack.pop()); // 输出：2

// console.log(stack.isEmpty()); // 输出：false

// stack.clear();
// console.log(stack.isEmpty()); // 输出：true