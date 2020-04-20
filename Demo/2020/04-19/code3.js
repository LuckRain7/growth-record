/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-19 21:55:09
 */

//  javaScript 内存回收的时候 会中断执行 100MB 3ms
//  javaScript 的设计师为了跑前端脚本 - 不持续 - 执行完就结束了
//

function getme() {
  var mem = process.memoryUsage();
  var format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + "MB";
  };
  console.log(
    " heapTotal: " + format(mem.heapTotal) + "        heapused:" + format(mem.heapUsed)
  );
}

let a = [];
let size = 20 * 1024 * 1024;
function b() {
  let arr1 = new Array(size);
  let arr2 = new Array(size);
  let arr3 = new Array(size);
  let arr4 = new Array(size);
  let arr5 = new Array(size);
  let arr6 = new Array(size);
  let arr7 = new Array(size);
}

b();
getme();
setInterval(() => {
  a.push(new Array(20 * 1024 * 1024));
  getme();
}, 1000);
