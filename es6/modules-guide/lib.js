/**
 * Created by Jiangxtx on 2016/10/28.
 * 主要测试 几种import和export的基本语法
 *      ES6导入的模块都是属于引用.
 *      结论：用ES6的export导出数据接口的时候， 最好统一用函数， 避免在循环依赖的时候， 因为JS会把不同类型的对象静态解析成不同的初始值;
 */


// 导出常量
const sqrt = Math.sqrt;

let count = 0;
console.log('>>lib.js has been loaded! Times: ' + count++);

// 导出函数
function square(x) {
    return x * x;
}

function diag(x, y) {
    return sqrt(square(x) + square(y));
}

// 使用 export{接口} 导出接口， 大括号中的接口名字为上面定义的变量，import和export是对应的；
export { sqrt, square, diag };

let myNameFunction = function (name) {
    console.log('myNameFunction name is ' + name);
}

// 可以使用 XX as YY， 把导出的接口名字改了，以屏蔽接口意义；
export { myNameFunction as mnf };

// 直接在export的地方定义导出的函数，或者变量
export let dogObj = {
    name: 'Kitty',
    call: function(voice='wangwang~~') {
        console.log(`Hello, I am a dog,\n my name is ${this.name}, and my call is ${voice}!!`);
    }
};

/**
 * 如果一个js模块文件就只有一个功能， 那么就可以使用export default导出
 */
// export 'default_export_string';

// 使用通配符*  ,重新导出其他模块的接口 (其实就是转载文章， 然后不注明出处啦)
export * from './wildcard';