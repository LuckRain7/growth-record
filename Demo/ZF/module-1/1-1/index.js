/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-25 15:46:35
 */

 // new 运算符
function newCreate(fn, ...args) {
  // let obj = {};

  let obj = Object.create(fn.prototype);

  let result = fn.call(obj, ...args);

  if (
    (result !== null && typeof result === "object") ||
    typeof result === "function"
  ) {
    return result;
  }

  return obj;
}
