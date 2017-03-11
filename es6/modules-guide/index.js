/**
 * Created by Jiangxtx on 2016/10/28.
 * 模块的设计:
 *      ES6模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
 *      CommonJS和AMD模块，都只能在运行时确定这些东西。
 */

import { square, diag, mnf, dogObj, wildName, wild_voiceMyName, wild_arrow_add } from './lib';
import isWebpSupported from './isWebpSupported';

import Lib from './lib';

/*

console.info(square(12));
console.info(diag(3, 4));
// console.info(Lib.diag(6,8));

console.info(mnf('jiangxtx'));
console.info(dogObj.call());
console.info(dogObj.call('honghong~~'));

console.log(`Voice my voice, and speak your speech, my FLAG is ${wildName}`);
console.log(wild_voiceMyName());
console.log(wild_voiceMyName('cluture'));
let _localNum = {
    x : 6789,
    y : 3245
};
console.log(`${_localNum.x} + ${_localNum.y} = ${wild_arrow_add(_localNum.x, _localNum.y)}`);
*/

console.info(`>>>--isWebb value1: ${isWebpSupported}`)
console.info(`>>>--isWebb value2: ${isWebpSupported()}`)