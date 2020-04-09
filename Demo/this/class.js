/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-07 13:23:16
 */

var heroName = "rain";
this.heroName = "rain";

class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }
  dialogue() {
    console.log(`I am ${this.heroName}`);
  }
}
const batman = new Hero("Batman");
batman.dialogue();

const say2 = batman.dialogue.bind(batman);
say2();

// 但是如果我们将 dialogue()方法的引用存储起来，并稍后将其作为函数调用，
// 我们会丢失该方法的接收器，此时 this参数指向 undefined 。
const say = batman.dialogue;
say();
