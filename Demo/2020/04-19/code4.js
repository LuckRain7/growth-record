/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-19 23:00:32
 */

var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };



// 对象是引用类型  所有的对象复制其实是给了他这个对象的引用地址

// var a = { n: 1 };
//  假设 { n: 1 } 的内存地址是 1000
//  a 指向 1000

// var b = a;
//  b 指向 1000


// a.x = a = { n: 2 };
// a.x 优先级最高 内存地址1000内容变为 { n: 1, x: undefined }
// 然后从右向左执行
// a = { n: 2 };  { n: 2 }内存地址为1001  a 指向 1001
// a.x 指向1001 及 1000地址中的x 指向1001



console.log(a);   // { n: 2 }
console.log(a.x); // undefined
console.log(b);   // { n: 1, x: { n: 2 } }

// 一个不错的解析
// https://juejin.im/post/5b605473e51d45191a0d81d8