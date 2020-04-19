new Promise 里边的代码是正常执行的

![image-20200419202803102](C:\Users\ZHCZ\Desktop\growth-record\Demo\2020-04-19\img\image-20200419202803102.png)

微任务包括 `process.nextTick` ，`promise` ，`MutationObserver`，其中 `process.nextTick` 为 Node 独有。

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`。

这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 `script` ，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。 



#### (5) Event Loop（事件轮询）

Event Loop 是一个程序结构，用于等待和发送消息和事件。

Event Loop 执行顺序如下所示：

- 首先执行同步代码，这属于宏任务
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 `setTimeout` 中的回调函数

微任务 》 宏任务



例子1：

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

执行过程解析：

执行同步代码：

```javascript
// setTimeout内function 放入宏任务
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
// 异步任务：[微任务数:2][宏任务数：2]
// 先执行微任务
```

执行微任务

```javascript
function () {
  console.log("then1");  // 输出 then1
}

function () {
  console.log("then3"); // 输出 then3
}

// 此时控制台打印 ： then1  >  then3
// 异步任务：[微任务数:0][宏任务数：2]
// 执行宏任务
```

执行宏任务

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
// 执行微任务
```

再次执行微任务

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
// 执行微任务
```

再次执行微任务

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





## 内存回收

内存快接近满

![image-20200419220129076](C:\Users\ZHCZ\Desktop\growth-record\Demo\2020-04-19\img\image-20200419220129076.png)



内存查看

浏览器 - window.performance

Node - process.memoryUsage()

```js
// node 
{
  rss: 21213184,     
  heapTotal: 5656576,
  heapUsed: 3143216, 
  external: 1401023   // 可拓展内存
}
```



容易引发内存使用不当的情景

- 滥用全局变量
- 缓存不限制
- 操作大文件