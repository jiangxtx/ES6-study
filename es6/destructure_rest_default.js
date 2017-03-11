/**
 * Created by Jiangxtx on 2016/10/31.
 * 解构 & Rest & 默认值，三者常常结合使用，威力更加显现！！！
 *
 *      Now, it's your time to overcome it!
 *          Time To Show Your Wisdom!
 *              ——jiangxtx 16.11.01
 */

/**
 * rest语法：
 *      1. 只能将函数的最后一个函数作为 Rest 参数;
 *      2. 在函数被调用时，Rest 参数之前的参数都将被正常填充，之外的参数将被放入一个数组中，并将该数组作为 Rest 参数的值;
 *      3. 如果没有更多的参数，那么 Rest 参数的值为一个空数组 [];
 *      4. Rest 参数的值永远都不会是 undefined。
 */
var speakOut = (...types) => console.log(`instanceof: ${types instanceof Array};
                                            content of types: ${types}`);

speakOut('cat', 'mydog', 'bux');
speakOut({
    cat: 'catty',
    dog: 'wangcai'
});



/**
 * -----------------------------------------------------------------------------------------
 * destructuring
 *    ES6的解构赋值给JavaScript的语法带来了更多的现代化。它在减少了代码量的同时，增加了代码的可读性和表现力。
 */
let cat = 'ken';
let dog = 'lili';
let zoo = { cat, dog };
let arr = [123, 234, 3456];
const [num1, , num3] = arr;
console.log(`destructure example: cat-${zoo.cat}; dog-${zoo.dog}`);
console.log((`数组的解构赋值示例：num1:${num1}; num3:${num3}`));

let mydog = {
    type: 'animal_dog',
    call: 'wangwang~~',
    age: 34
};
// 对象的解构赋值
let { call, age } = mydog;
console.log(`destructure from mydog: type-${call}`);

//
/**
 * 函数参数的解构赋值:
 *      function findUser(userId, options) {
            if (options.includeProfile) {}
            if (options.includeHistory) {}
        }
 */
function findUser(userId, { sex, counry, hobby=[] }) {
    let polite = 'beauty';
    if (sex === 'man') {
        polite = 'gentleman';
    }
    console.log(`You Id is ${userId}, and from ${counry}! Welcome home, ${polite}!`);
    if (hobby.length) {
        console.log(`Wa oh, you have thus hobbies:" ${hobby.join(' & ')} "!`);
        let [favor, ...rest] = hobby;
        console.log(`>>>Rest instance: My favor hobby is: ${favor}, 
                    the rest is: ${rest.join(' @@ ')}`);
    } else {
        console.log(`En En, how could you have not even a hobby!`);
    }
}

const userInfo = {
    sex: 'man',
    counry: 'China',
    // hobby: ['football', 'eating', 'jogging']
};
findUser('AS0109', userInfo);