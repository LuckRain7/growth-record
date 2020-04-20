/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-19 21:02:17
 */
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


