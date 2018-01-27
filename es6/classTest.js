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
    // 子类必须在constructor方法中调用super方法，否则新建实例时会报错(this is not defined)。
    // 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
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


class Dog extends Animal {
    constructor(name, color, live, age) {
        super(name, color, live);
        this.age  = age;
        this.dogSymbol = 'I am a dog!';
        this.play = (val) => console.log('play dog: ' + this.name + ' -- ' + val)
    }
}

const dog = new Dog('wangcai', 'black', true, 6)
console.log(dog.play('playing'))  // play dog: wangcai -- playing.
console.log(dog.hasOwnProperty('longLiving')) // true
console.log(dog.hasOwnProperty('play')) // true

// 类的类型就是一个函数，是一个“特殊函数”，指向的是构造函数。
console.log(Dog === Dog.prototype.constructor) // true
console.log(typeof Dog) // "function"

const PI = Math.PI;
console.log(`PI: ${PI}`);