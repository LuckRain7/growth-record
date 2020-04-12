### 几句话总结学习下TypeScript的好处

- TypeScript快速、简单，最重要的是，容易学习。
- TypeScript 增加了代码的可读性和可维护性
- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
- 扩展大家的技术视野，让大家在前端技术领域立于不败之地
- 新增加了类型系统和完整的面向对象

### 正式开始学习TypeScript

- TS不能直接在浏览器上运行，所以需要我们进行编译，把TS代码转成JS代码。

> 安装（让浏览器或者node支持ts）

```
- 全局安装typescript: npm install -g typescript
- 校验:tsc -v
- 文件名为.ts,写完之后通过工具使ts转成js代码，用tsc + ts文件名
```

修改配置文件为：

```
    npm init -y
        "scripts": {
            "build": "tsc",
            "dev":"tsc --watch"
         },
    输入tsc --init 创建一个配置文件 然后运行npm run dev
    或者VSCode监视tscconfig.json
```

> node中运行

```
- 安装ts-node
- npm install -g ts-node
- 使用
    ts-node + ts文件名
```

------

#### 数据类型:

#### 字符串:(string)

> let str:string = ‘珠峰web高级’;

#### 布尔值:(boolean)

> let bool:boolean = true;

#### 数字:(number)

> let num:number = ‘珠峰web高级’;

#### Null 和 Undefined

> let u: undefined = undefined;
> let n: null = null;
> 要注意的是undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给别的类型
> 可以修改 配置文件中的 “strictNullChecks”: false

#### 数组:

> let arr:number[] = [1,2,3];
> let arr:Array< number> = [1,2,3];
> let arr:any[] = [1,’2’];

#### 元组:就是定义一个具有不同类型的成员的数组。

> let arr:[number,string] = [123,’123’];

#### 枚举（ 为了让某组数据更加有语义化）

> enum Flag {succ:1,error:2}
> let f:Flag = Flag.succ;

#### void:表示没有任何返回值的函数

> function alertName(): void {
> alert(‘My name is Tom’);
> }

#### 任意类型 any :

> ts中的DOM元素
> let ele = document.getElementById(‘red’)
> ele!.style.background = ‘red’;

#### Never:代表不存在的值(不会出现)的类型，一般作为死循环，抛出异常来使用

```
    function alertName(): never {
        while(true)
    }

    function fn(x:number){
        if(typeof x === 'number'){
            console.log(x);
        }else{
            console.log(x);
        }
    }

    function fn(){
        throw Error('是兄弟就来砍我')
    }
```

#### 类型推断(推断类型)

> 在ts文件中声明变量和赋值在同一行，ts会帮我们推断
> 第一次赋值的数据类型，如果第一次和之后赋值的数据不一，就报错

#### 联合类型(变量有可能是多个类型)

> let obj:object|null = null;

#### 断言 as 确定及肯定就是这种类型

> let num:number|string;
> (num as string).length;
> (num as number).toFixed();

#### 函数（函数声明、函数表达式、参数类型、返回值类型、剩余类型、可选参数，默认参数、重载）

```typescript
    函数定义:
    function func(x:string):string{
        return '来，分锅！~'；
    }

    函数表达式:
    type getName = (x:number,y:string)=>string;
    (=>不是箭头函数，只为一个分割符)
    let fn:getName = function(a:number,b:string):string{
        return '真香';
    }
    console.log(fn(5,'a'));

    官网写法:
             let fn:(x:number) => number;
             fn = (a:number) => a + 1;
             fn(1);
             let fn:(x:number) => number = (a:number) => a + 1;
```

#### 可选参

```typescript
在形参位置添加一个?，可传可不传，如果不加又没传就要报错（可选参数要放到形参的后面，比如:name不能加?[因为它是第一个参数]）
  function fn(name:string,age?:number):void{
      console.log(name,age)
  }
  fn('社会,社会');
```

#### 默认参

```typescript
      function fn(name:string,age:number=10):void{
        console.log(name,age)
      }
      fn('社会,社会');
```

#### 剩余参

```typescript
    如果使用了剩余运算符，那么定义类型的时候要要加一个数组
    function fn(...arg:number[]){}
    function fn(...arg:Array<numner>){}
```

#### 重载（同名函数参数个数、类型不一样，返回的结果就不一样）

```typescript
    需要定义同名函数，不同类型的表达式(实现要立即跟在定义的下面)
    function fn(name:string):string;
    function fn(name:string,age?:any):string;
    function fn(name:string,age?:any):string{
        if(age){
            return '年龄是'+ age;
        }else{
            return '名字是'
        }
    };
```

### 类

```typescript
  class Person {
            name : string;  //定义类中的属性类型
       constrcutor(name:string){ //定义参数的类型
            this.name = name;
        }
        run():void { //方法返回值类型
            console.log(this.name)
        }
    }

    new Person().run(); 
```

> 类里面的修饰符 ts提供了三种修饰符

```typescript
  public 公有  在类里面、子类、类外面都可以访问
  protected 保护类型 在类里面、子类里面可以访问，但是在类的外面是不能访问的
  private 私有  只能在类里面访问，子类、类外都不能访问
    class Person {
        private name:string;  //私有
        protected name:string; //保护
        public name:string; //公共
        constructor(name:string){
            this.name = name;
        }
        run() :void {
            console.log(this.name);
        }
    }

    class Web extends Person {
        constructor(name){
            super(name);
        }

        run2(){
            console.log(this.name);
        }
    }

    let p = new Web('张三');
```

> 多态（属于继承，重写）:父类定义一个方法不去实现，让子类去实现具体的方法

```typescript
    class Animal {
            name:string;
            constructor(name:string){
                this.name = name;
            }
            eat(){
                console.log('动物都会吃');
            }
        }

        class Dog extends Animal {
            constructor(name){
                super(name);
            }
            eat(){
                console.log(this.name + '啃骨头');
            }
        }

        class Cat extends Animal {
            constructor(name){
                super(name);
            }
            eat(){
                console.log(this.name + '吃小鱼');
            }
        }
```

> 存取器

```typescript
    class Person{
        myName:string;
        constructor(myName:string){
            this.myName = myName;
        }
        get name(){
            return this.myName;
        }
        set name(newVal){
            this.myName = newVal.toUpperCase();
        }
    }

    let p = new Person('web');
    p.name = 'zhufeng';
    console.log(p)
```

> 抽象类和抽象方法:
> 使用abstract去定义抽象类和抽象方法
> 抽象类可以不实现抽象方法，但是在派生类中必须进行实现。

```
   有抽象方法一定会有抽象类
   抽象类不能直接实例化
   抽象方法必须在派生中实现
   非抽象方法可以不用实现
    abstract class Animal {
        name:string;
        constructor(name:string){
            this.name = name;
        }
        abstract eat():void;
    }

    class Dog extends Animal {
        constructor(name:string){
            super(name);
        }
        eat (){
            console.log(this.name+'啃骨头');
        }
    }

    new Dog('旺财').eat();
```

### 接口interface

> 接口 **对象** 定义(对象的形状)

```
   对象的接口:
        interface 名字 {
            数据名称: 数据类型;
            数据名称2: 数据类型2;
            ....
        }
    let xx:接口名 = {key:val}
    //注意:直接接口定义的属性才能被访问
```

> 接口任意属性:

```
    interface Props {
        // x:number;
        // y:number;
        [propName:string]:number;
    }
    let obj:Props = {
        x:1,
        y:2,
        z:3
    }
    console.log(obj.z);
```

> 定义**函数**接口:

```
    interface ajax{
        (url:string,data:object):void;
    }

    let Ajax:ajax = function(url:string,data:object){
        console.log(url,data);
    }   
    Ajax('/login',{
        user:1
    });
```

> 定义**类**接口(行为的抽象)

```
   interface Animal {
        name:string;
        eat(str:string):void;
    }

    class Dog implements Animal {
        name:string;
        constructor(n:string){
            this.name = n;
        }
        eat(){
            console.log(123);
        }
    } 
```

> 接口扩展，也就是接口继承

```
   //接口扩展

   interface Animal {
       eat():void;
   }

   interface Person extends Animal {
       say():void;
   }

   class Coder implements Person {
       eat(){

       }
       say(){

       }
   }
```

### 泛型

> 软件工程中，我们不仅要创建一致的定义良好的API,同时也要考虑可复用性。组件不仅能支持当前的数据类型，同时也能支持未来的数据类型。

简单理解：泛型就是解决，类、接口、方法复用性以及对不特定数据类型的支持

```
//找到数组中最小的值
   class Min{
      list:number[] = [];
      add(val:number){
          this.list.push(val);
      }
      getMin():number{
       let num = this.list[0];
       this.list.forEach(item=>{
           if(num > item){
               num = item; 
           }
       });
       return num;
      }
   } 

   let m = new Min();
   m.add(2);
   m.add(3);
   m.getMin();

   可以改写为:
   class Min<T>{
      list:T[] = [];
      add(val:T){
          this.list.push(val);
      }
      getMin():T{
       let num = this.list[0];
       this.list.forEach(item=>{
           if(num > item){
               num = item; 
           }
       });
       return num;
      }
   } 

   let m = new Min<number>();
   m.add(2);
   m.add(3);


    function createArray <T>(len:number,val:T):T[]{
        let ary:T[] = [];
        for(let i=0;i<len;i++){
            ary.push(val);
        }
        return ary;
    }

    console.log(createArray<string>(3,'abc'));
```

> 可以使用默认，或者多个
>
> 扩展泛型

```
interface withLen {
   length:number;
}

function logger<T extends withLen>(val:T){
    console.log(val.length);
}

logger<string>('zhufeng');
```

> 接口泛型:

```
    interface List <T> {
        list:T [];
    }

    let l:List<number> = {
        list:[1,2,3,4]
    }

    console.log(l.list);
```