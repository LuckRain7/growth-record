#  一道关于JavaScript 代码执行顺序的面试题解析



![javascript](https://luckrain7.github.io/Knowledge-Sharing/resource/2020/0420/javascript.png)



## 0.  引言：

最近写了一些异步递归的代码，着实有点头疼，索性重新研究一下JavaScript 代码执行顺序，并附上一道面试题的解析。

## 1.  JavaScript 代码执行顺序

> 首先我们了解几个概念

### 1.1  微任务/宏任务

异步队列中包括：微任务（micro-task） 和 宏任务（macro-task） 

微任务包括： `process.nextTick` ，`Promise` （ `process.nextTick` 为 Node 独有）

宏任务包括： `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

Tips：

- 微任务优先级高于宏任务的前提是：同步代码已经执行完成。因为 `script`  属于宏任务，程序开始后会首先执行同步脚本，也就是`script` 。
- `Promise` 里边的代码属于同步代码，`.then()` 中执行的代码才属于异步代码。

### 1.2  Event Loop（事件轮询）

Event Loop 是一个程序结构，用于等待和发送消息和事件。

Event Loop 执行顺序如下所示：

- 首先执行同步代码（宏任务）
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 `setTimeout` 中的回调函数

Tips：简化讲：先执行一个宏任务（script同步代码），然后执行并清空微任务，再执行一个宏任务，然后执行并清空微任务，再执行一个宏任务，再然后执行并清空微任务......如此循环往复（一个宏任务 -> 清空微任务 -> 一个宏任务 -> 清空微任务）

![javascript代码执行顺序](https://luckrain7.github.io/Knowledge-Sharing/resource/2020/0420/javascript代码执行顺序.png)



## 2.  面试题详解

### 2.1  题目

```js
setTimeout(function () {
  console.log(" set1");
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2 ");
  });
});

new Promise(function (resolve) {
  console.log("pr1");
  resolve();
}).then(function () {
  console.log("then1");
});

setTimeout(function () {
  console.log("set2");
});

console.log(2);

new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log("then3");
});
```

### 2.2  执行过程解析

执行所有同步代码（第一次宏任务）：

```javascript
setTimeout(function () { // setTimeout 内 function 放入宏任务
  console.log(" set1");
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2 ");
  });
});

new Promise(function (resolve) {
  console.log("pr1"); // Promise里边的代码直接执行  打印 pr1
  resolve();
}).then(function () {
  console.log("then1"); // Promise.then 放入微任务
});

setTimeout(function () {
  console.log("set2"); // setTimeout内function 放入宏任务
});

console.log(2); // 打印 2

new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log("then3"); //Promise.then 放入微任务
});


// 此时控制台打印 ： pr1  >  2
// 异步任务队列：[微任务数:2][宏任务数：2]
// 执行并清空微任务
```

执行并清空微任务

```javascript
function () {
  console.log("then1");  // 输出 then1
}

function () {
  console.log("then3"); // 输出 then3
}

// 此时控制台打印 ： then1  >  then3
// 异步任务：[微任务数:0][宏任务数：2]
// 执行一个宏任务
```

执行一个宏任务

```javascript
function () {
  console.log(" set1");   //打印 set1
  new Promise(function (resolve) {
    resolve();
  }).then(function () {     // Promise.then 放入微任务
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2 ");
  });
}

// 此时控制台打印 ： set1
// 异步任务：[微任务数:1][宏任务数：1]
// 执行并清空微任务
```

执行并清空微任务

```javascript
function () {     
    new Promise(function (resolve) {
      resolve();      
    }).then(function () {
      console.log("then4");   // Promise.then 放入微任务
    });
    console.log("then2 ");    // 打印 then2
}

// 此时控制台打印 ： then2
// 异步任务：[微任务数:1][宏任务数：1]
// 此时微任务列表增加并未清空，继续执行微任务
```

此时微任务列表增加并未清空，继续执行微任务

```javascript
function () {
      console.log("then4");   // 打印 then4
}

// 此时控制台打印 ： then4
// 异步任务：[微任务数:0][宏任务数：1]
// 执行宏任务
```
执行宏任务

```javascript
function () {
  console.log("set2"); // 打印 set2
}
// 此时控制台打印 ： set2
// 异步任务：[微任务数:0][宏任务数：0]
// 程序结束
```

完整输入顺序

```javascript
pr1
2
then1
then3
set1
then2 
then4
set2
```



### 推荐阅读

-  [一道“简单”的 This 题解析](https://mp.weixin.qq.com/s/QLabNBOChsKmrpvEXJrpNg) 

-  [如何在Vue中优雅的使用防抖、节流](https://rain7.top/article/如何在Vue中优雅的使用防抖节流.html) 

- [如何在 Array.forEach 中正确使用 Async](https://rain7.top/article/如何在Javascript中对Array.forEach使用异步函数.html)

- [如何在 Array.filter 中正确使用 Async](https://rain7.top/article/如何在Array.filter中正确使用Async.html)

- [如何在 Array.reduce 中正确使用 async](https://mp.weixin.qq.com/s/9wl8-SYspr3s358Tf0CmSg)

#### 如果对你有一点点帮助，可以 start

![您的关注是莫大的鼓励❥(^_-)](https://luckrain7.github.io/Knowledge-Sharing/resource/images/wx.png)