/**
 * Created by Jiangxtx on 2016/10/31.
 * ES6 引入了class（类），让 javascript 的面向对象编程变得更加容易清晰和容易理解。
 * 类只是基于原型的面向对象模式的语法糖。
 */

class Animal {
    // 构造方法，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数
    // constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的。
    constructor(name, color, longLiving) {
        this.name = name;
        this.color = color;
        this.longLiving = longLiving
    }

    // toString 是原型对象上的属性
    toString() {
        console.log(`Animal: name--${this.name}; color--${this.color}`);
    }

}

const animal = new Animal('mydog', 'white');
animal.toString();

console.log(animal.hasOwnProperty('name'));
console.log(animal.hasOwnProperty('toString'));
// 一个实例化对象会有一个 __proto__ 指向构造函数的 prototype 属性
console.log(animal.__proto__.hasOwnProperty('toString'));


/************************************* 华丽的分割线 *******************************************/

class Cat extends Animal {
    // 子类必须要在constructor中指定super 方法，否则在新建实例的时候会报错.
    // 如果没有置顶consructor,默认带super方法的constructor将会被添加
    constructor(action) {
        super('catitkky', 'red');
        // ???-尚不明白此处的action 为何用意？-16.10.31
        this.action = action;
    }

    toString() {
        console.log(super.toString());
    }

    miaomiao() {
        console.log(`Hello everyone, my name is ${this.name}, and I am a Cat, a kitty cat!!`)
    }

}

const cat = new Cat('catch');
cat.toString();
cat.miaomiao();

console.log(cat instanceof Cat);
console.log(cat instanceof Animal);
console.log(cat.hasOwnProperty('toString'));
console.log(cat.hasOwnProperty('miaomiao'));

console.log(`animal.hasOwnProperty('longLiving'): ` + animal.hasOwnProperty('longLiving'));
console.log(`cat.hasOwnProperty('longLiving'): ` + cat.hasOwnProperty('longLiving'));

/**
 *  类的 prototype 属性和 __proto__ 属性
 *      在 class 中。同时具有 __proto__ 和 prototype 两个属性，存在两条继承链。
 *        1. 子类的 __proto__ 属性，表示构造函数的继承，总是指向父类。
 *        2. 子类的 prototype 的 __proto__ 属性表示方法的继承，总是指向父类的 prototype 属性。
 */
console.log(Cat.__proto__ === Animal);
console.log(Cat.prototype.__proto__ === Animal.prototype);

// 函数是一种特殊的对象，所有函数都是 Function 的实例。
class CatNoextends {}
console.log(Cat.__proto__ === Function.prototype); //
console.log(CatNoextends.__proto__ === Function.prototype); // CatNoextends 是一个普通函数，所以继承 Function.prototype
console.log(Cat.prototype.__proto__ === Object.prototype); //
console.log(CatNoextends.prototype.__proto__ === Object.prototype); //true

const PI = Math.PI;
console.log(`PI: ${PI}`);