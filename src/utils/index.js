  // 防抖函数
  export function debounce(func, delay) {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }