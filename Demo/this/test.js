/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-07 13:31:10
 */

var number = 2;
var obj = {
  number: 4,

  fn1: (function () {
    var number;
    this.number *= 2;
    number = number * 2;
    number = 3;
    return function () {
      var num = this.number;
      this.number *= 2;
      console.log(num);
      number *= 3;
      console.log(number);
    };
  })(),

  db2: function () {
    this.number *= 2;
  },
};

var fn1 = obj.fn1;
var fn2 = obj.db2;

console.log(number);

fn1();
fn2();

obj.fn1();
obj.db2();

console.log(window.number);

console.log(obj.number);
