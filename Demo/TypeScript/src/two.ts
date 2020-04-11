/*
 * @Description:
 * @Author: LuckRain7
 * @Date: 2020-04-11 12:23:56
 */



/*
 * 联合类型
 * (变量有可能是多个类型)
 */

/*
let bb: string | number;

bb = '123';
bb = 12;
// bb = true //报错
// 应用场景
let obj: Object | null = null;

*/



/*
 * 断言 as 确定及肯定就是这种类型
 * (变量有可能是多个类型)
 */

/*
let num: number | string;
(num as string).length;
(num as number).toFixed();
*/


/*
 * 类
 *
 */
/*
class Person {
    public name: string
    constructor(name: string) {
        this.name = name
    }

    say() {
        console.log(this.name);

    }
}

class Coder extends Person {
    constructor(name: string) {
        super(name)
    }
    say() {
        console.log('我说码农');
    }
}

let c = new Coder('hello world')

c.say()

 */


/*
 * 抽象类
 *
 */

/*
abstract class Animal {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    abstract eat(): void
    abstract say(): void
}

class Dog extends Animal {
    eat(): void {
        console.log('啃骨头');
    }
    say(): void {
        throw new Error("Method not implemented.");
    }
}
*/

//    泛型
/*
 * ts难点：
 * 接口
 *
 */

/*
interface Point {
    x: number
    y: number

}

let obj: Point = {
    x: 0,
    y: 0
}
*/
/*
interface Numbers {
    [propName: string]: number;

}

let obj: Numbers = {
    x: 0,
    t: 0
}

interface ajax {
    (url: string, obj: object): void
}

const axios: ajax = function (url: string, obj: object) {
    console.log(url, obj);
}

// 定义函数接口
axios('/login', {
    age: 10
})

  */



/*
// 定义类接口(行为的抽象)
interface Animal {
  name: string;
  eat(str: string): void;
}

class Dog implements Animal {
  name: string;
  constructor(n: string) {
      this.name = n;
  }
  eat() {
      console.log(123);
  }
}

*/