/**
 * Created by 仲夏 on 2018/7/22.
 *
 * mixin 给组件开发带来抽象的好处，但是坏处更多：
 *  1. 反模式化编程
 *  2. 破坏了原有的组件封装
 *  3. 命名冲突，因为mixin是平面结构。
 *  4. 增加了组件的复杂性。
 *
 */


/**
 * 尝试封装一个 mixin 方法.
 *
 * @param obj
 * @param mixins
 */
function mixin(obj, mixins) {
  const newObj = obj
  newObj.prototype = Object.create(obj.prototype)

  for (let prop in mixins) {
    if (mixins.hasOwnProperty(prop)) {
      newObj.prototype[prop] = mixins[prop]
    }
  }

  return newObj
}


/////////////////////test

const BigMixin = {
  fly: () => console.log('I can fly')
}

const Big = function () {
  console.log('I am a Big func.')
}

const FlyBig = mixin(Big, BigMixin)

const flyInst = new FlyBig()
flyInst.fly()      // I can fly