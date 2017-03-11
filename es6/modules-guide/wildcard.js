/**
 * Created by Jiangxtx on 2016/10/29.
 * 通配符示例
 */

export let wildName = 'wildcard_name_is_Bonbby';

let wild_voiceMyName = (name=wildName) => {
    console.log(`Hi everybody, voice your name, and voice your feelings, my name is ${name}`)
};

var wild_arrow_add = (a, b) => {
    if (typeof a == 'number' && typeof b == 'number') {
        return a + b
    } else {
        return 'Input Type Error!'
    }
};
export { wild_voiceMyName, wild_arrow_add };
console.log(`Invoke wild_arrow_add function to caculate: 56+81=${wild_arrow_add(56,81)}`);