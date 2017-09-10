/*
* “作为合格程序员这五个问题在1小时内必须解出”一篇帖子中，给出如下 5 个问题！
*   作为考验一个程序员的基本功力。
*   小生我斗胆一试！
*  @author jiangxtx 2017-9-11 00:05
*/

/*
* 问题1：使用for循环、while循环和递归写出3个函数来计算给定数列的总和。
*    ex. var arr = [12, 25, 6, 467, 25, 76];
 */
function sum_for(arr) {
    var sum = 0;
    for (var i=0; i<arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function sum_while(arr) {
    var sum = 0;
    var flag = 0;
    while (flag < arr.length) {
        sum += arr[flag];
        flag++;
    }
    return sum;
}

function sum_recurision(arr) {
    if (arr.length < 2) {
        return arr[0];
    }
    return arr[0] + sum_recurision(arr.slice(1));
}


/*
* 问题2：编写一个交错合并列表元素的函数。
*   例如：给定的两个列表为[a，B，C]和[1，2，3]，函数返回[a，1，B，2，C，3]。
 */
function combineArr(arr1, arr2) {
    var len1 = arr1.length;
    var len2 = arr2.length;

    var destArr = [];
    for (var i=0; i < len1; i++) {
        if (arr2[i] != null) {
            destArr.push(arr1[i], arr2[i]);
        } else {
            destArr.push(arr1[i]);
        }
    }
    if (len1 >= len2) {
        return destArr;
    }
    return destArr.concat(arr2.slice(len1));
}



/*
* 问题3：编写一个计算前100位斐波那契数的函数。
* 根据定义，斐波那契序列的前两位数字是0和1，随后的每个数字是前两个数字的和。
*    例如，前10位斐波那契数为：0，1，1，2，3，5，8，13，21，34。
*/

// 简单粗暴型，实际运用中，切不可取！在控制台中运行fibonacci(100) 直接崩溃了！性能太差！
function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 优化版本，缓存计算的值.
var fib_optimize = (function () {
    var cacheArr = [0, 1]; // 存放着n对应的fib函数和.

    return function (n) {
        if (cacheArr[n] != null) {
            return cacheArr[n];
        }

        return cacheArr[n] = fib_optimize(n-1) + fib_optimize(n-2);
    }
})()

// 极致优化版本，缓存3个计算的值.
var fib_super = (function () {
    var cacheArr = [0, 1]; // 存放着n对应的fib函数和.

    return function (n) {
        if (cacheArr[n] != null) {
            return cacheArr[n];
        }
        if (cacheArr[n-1] == null) {
            cacheArr[n-1] = fib_super(n-1);
        }
        if (cacheArr[n-2] == null) {
            cacheArr[n-2] = fib_super(n-2);
        }

        return cacheArr[n] = cacheArr[n-1] + cacheArr[n-2];
    }
})()


/*
* 问题4

 编写一个能将给定非负整数列表中的数字排列成最大数字的函数。例如，给定[50，2，1, 9]，最大数字为95021。


 * [ 59，38，91，6，378，14，2 ] —— 9165938378214.
 *
 * 思路分析：
 *    其实就是对数组中的每个正数进行一种逆向的排序，即最左边数字大的数值排位在前，最左位数字相同的比较左二位数字大小，以此类推，
 *    直至最终排序完成。
 *    例如：[50，2，1, 9] --> [9, 50，2，1] --> 95021.
 *      来个复杂点的：
 *      [ 59，38，91，6，378，14，2 ] --> [ 91, 6, 59, 38, 378, 2, 14 ] --> 9165938378214.
 *    换言之，其实质上，不是在比较数字的大小，而是比较 string 的大小，例如：'59' < '9'等。做如此考虑后，代码就变得容易多了。
*/

/**
 * 版本一：按照上面的设计思路，设计并运行下来，发现有漏洞。
 *      maxCombinationNumber(['50', '2', '21', '1', '9', '23']) 的结果为："950232121"，
 *      而实际上，最大结果应该为："950232211".
 * 漏洞原因，就是比较过于粗暴：
 *      这里比较 2,21,23 的顺序不应该是：23-21-2，而应该是：23-2-21.
 *
 * @param arr
 */
function maxCombinationNumber(arr) {
    var strArr = arr.map(item => item + '');

    function sortArrByStr(sortArr) {
        function inner_sort(a, b) {
            return a < b;
        }
        return sortArr.sort(inner_sort);
    }

    return sortArrByStr(strArr).join('');
}


/**
 * 版本一遗留下来的问题，解决思路在于：
 *      要注重区分inner_sort 排序时，不是严格的完全按照string大小排序。
 *
 * 可以说，这个算法充分的体现了“局部最优不等于整体最优”的思想！！！
 *
 *       ——jiangxtx 2017-9-9 00:30
 */
function maxCombinationNumber(arr) {
    var strArr = arr.map(item => item + '');

    function sortArrByStr(sortArr) {
        function inner_sort(a, b) {
            return (a + b) < (b + a);
        }
        return sortArr.sort(inner_sort);
    }

    return sortArrByStr(strArr).join('');
}

/*
* 无论如何，都必须承认一点：
*   function inner_sort(a, b) {
        return (a + b) < (b + a);
    }
  这个函数看山去比较邪门，尽管功能上看，是满足我们的需求的。但是一时半会儿，理不出个所以然。
  所以，下面将给出一个一般意义上的逻辑代码。
*/

/**
 * 比较 a、b 的大小，注意规则！
 *      例如：'2' > '21', '2' < '23'
 * @param a string
 * @param b string
 * @returns 0: equal, 1: a > b, -1: a < b.
 */
function compare(a, b) {
    if (a === b) {
        return true;
    }

    var aLen = a.length,
        bLen = b.length;

    if (aLen === bLen) {
        return a < b;
    }

    var shortLen = (aLen < bLen) ? aLen : bLen;
    var flag = false;

    for (var i=0; i < shortLen; i++) {
        if (a.charAt(i) < b.charAt(i)) {
            flag = true;
            return flag;
        }
    }

    // 未完，待续。。。2017-9-9 20:50.
}

/*
* 问题5：

 编写一个在1，2，…，9（顺序不能变）数字之间插入+或-或什么都不插入，使得计算结果总是100的程序，并输出所有的可能性。例如：1 + 2 + 34�C5 + 67�C8 + 9 = 100。

 思路如下：
 9个数字，要插入的位置有8个，每个位置有3种情况（‘+’、‘-’、‘’）；
 这样我就可以用8位的3进制数表示，最大值是‘22222222’，转换成十进制就是6560，这样就说明共有6561种组合情况；
 然后分别计算每种组合的结果，等于100就是我需要的。

 * */
var str = "123456789";
var ways = [];

function exec(str, pre) {
    var a = str.split("");

    if( str.length === 2 ){
        ways.push( pre + a.join("+") );
        ways.push( pre + a.join("-") );
        ways.push( pre + str );
    }else{
        var c = str.charAt(0),
            s = str.substring(1);

        exec( s, pre + c + "+" );
        exec( s, pre + c + "-" );
        exec( s, pre + c );
    }
}

exec( str, "" );

for (var i = 0; i < ways.length; i++) {

    if( eval( ways[i] ) === 100 ){

        console.log( ways[i] + " = 100" );

    }
};
