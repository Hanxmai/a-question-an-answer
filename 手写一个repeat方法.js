/**
`repeat` 的函数原型:
``` javascript
// 执行 times 次 func, 每次调用之间间隔 wait 秒
function repeat(func, times = 1, opts = { wait: 0, immediate: false}) {
  // TODO
}

// func 原型: (accumulator, time)
```  

参数解析: 
1. `times`: 执行次数, 默认 1
2. `opts`: 选项, 可选, 默认 `{ wait: 0, immediate: false }`
   1. `opts.wait`: 每次 func 调用之间间隔时间
      * 单位 `毫秒`, 默认 `0`  
      * 如果 `wait` 大于 0, 则异步执行, 首次取决于 `opts.immediate`; 否则, 同步执行
   2. `opts.immediate`: 首次是否立即执行, 默认 false
   3. `opts.initialValue`: 初次执行 func 所接受到的初始值, 默认空
4. `func` 原型为: `(accumulator, time) => any`

用例:  
```
const func = (accumulator = 0, time) => {
   console.log(`第 ${time} 次执行, last result: ${accumulator}`);
   return accumulator + 1;
},
repeat(func, 3, { initialValue: 100 });
/* 执行结果
第 0 次执行, last result: 100
第 1 次执行, last result: 101
第 2 次执行, last result: 102
*/
// repeat(func, 3);
/* 执行结果
第 0 次执行, last result: 0
第 1 次执行, last result: 1
第 2 次执行, last result: 2
*/
// repeat(func, 3, { wait: 1e3 });
/* 执行结果 
第 0 次执行, last result: 0 // 1s 后
第 1 次执行, last result: 1 // 2s 后
第 2 次执行, last result: 2 // 3s 后
*/
// repeat(func, 3, { wait: 1e3, immediate: true });
/* 执行结果 
第 0 次执行, last result: 0 // 立即执行
第 1 次执行, last result: 1 // 1s 后
第 2 次执行, last result: 2 // 2s 后
*/ 

// 执行 times 次 func, 每次调用之间间隔 wait 秒
async function repeat(func, times = 1, opts = { wait: 0, immediate: false }) {
  const { wait = 0, immediate = false, initialValue } = opts;
  let time = 0;
  let accumulator = initialValue;
  
  if (immediate) {
    accumulator = func(accumulator, time++);
  }

  if (wait > 0) {
    const originFunc = func;
    func = (accumulator, time) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          accumulator =originFunc(accumulator, time)
          resolve(accumulator);
        }, wait)
      })
    }
  }

  while (time < times) {
    accumulator = await func(accumulator, time++);
  }
  return accumulator;
}


const func = (accumulator = 0, time) => {
  const current = Date.now()
  const tens = 2* 1000;
  while(current+tens > Date.now()) {
    
  }
  console.log(`第 ${time} 次执行, last result: ${accumulator}`);
  return accumulator + 1;
}
repeat(func, 3, { initialValue: 100 });
// repeat(func, 3);
// repeat(func, 3, { wait: 1000 });
// repeat(func, 3, { wait: 1e3, immediate: true });
// func 原型: (accumulator, time)
