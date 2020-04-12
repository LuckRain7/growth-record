"use strict";
/*
 * @Description:
 * @Author: LuckRain7
 * @Date: 2020-04-11 12:23:56
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.say = function () {
        console.log(this.name);
    };
    return Person;
}());
var Coder = /** @class */ (function (_super) {
    __extends(Coder, _super);
    function Coder(name) {
        return _super.call(this, name) || this;
    }
    Coder.prototype.say = function () {
        console.log('我说码农');
    };
    return Coder;
}(Person));
var c = new Coder('hello world');
c.say();
