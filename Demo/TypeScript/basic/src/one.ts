// namespace a{
    
// }
let num:number = 10;

let str:string = 'Ts,得劲儿';

// let bool:boolean = true;
// str = 0;

// bool = '';

// let u:null = null;

// let u: undefined | number = undefined;

// u = 12;

// let ary:Array<number> = [1,3,4];

// let ary2:number[] = [5,6,7];

// let ary3:string[] = ['1','2'];

// let ary:[string,number] = ['呵呵哒',1];


// let ary2:any = [1,true,[[[[[]]]]]];

// let obj = {
//     success:0,
//     fail:1,
//     upload:2
// }

// enum obj {
//     success = 1,
//     fail = 3,
//     upload
// }

// console.log(obj.upload);

// function getState(code:number){
//     if(code === obj.success){
//         return 'success';
//     }else if(code === obj.fail){
//         return 'fail';
//     }else if(code === obj.upload){
//         return 'upload';
//     }
// }

// console.log(getState(0));


// function fn():void{
//     console.log(5);
//     return undefined
// }

// console.log(fn());

// function func(x:number):never{
//     while(true){}
//     console.log(x);
// }
// func(1);

// function func(x:number):never{
//     throw Error('是兄弟就来砍我');
// }
// func(1);

let obj:any = {

};
function setObj(x:any){
    if(typeof x === 'number'){
        obj.age = x;
    }else if(typeof x === 'string'){
        obj.name = x;
    }else{
        console.log(x);
    }
}

// setObj('苍狼');
// setObj(10);
setObj(true);

console.log(obj);
















export {}
