/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-19 20:22:56
 */

setTimeout(() => {
  console.log("set1");
});

new Promise((resolve,reject) => {
    console.log("p1");
    resolve()
}).then(() => {
  console.log("then1");
});

console.log(2);

// p1 2 then1 set1 