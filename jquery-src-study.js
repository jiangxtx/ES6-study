/**
 * Created by 仲夏 on 2017/11/10.
 */

(function () {
    var __prototype__ = {
        each: function (action) {
            for (var i=0; i<this.length; i++) {
                action(this[i]);
            }
            return this;
        },

        css: function (style, value) {
            return this.each(function (dom) {
                dom.style[style] = value
            })
        },
        attr: function (attr, value) {
            return this.each(function (dom) {
                dom.setAttribute(attr, value)
            })
        },
        size: function () {
            return this.length;
        }
    }

    // arg0 可能是函数、字符串等
    var $ = function (arg0) {
        if (typeof arg0 === 'function') {
            window.onload = arg0;
        }
        if (typeof arg0 === 'string') {
            // return new Proxy(arg0);
            return getArray(arg0);
        }
    }

    /**
     * 把目标对象中的所有属性追加到源对象中，该方法挂载在Object的原型上。
     * @param source 源对象
     * @param target 目标对象
     * @returns {*} 源对象
     */
    Object.prototype.extend = function (source, target) {
        for (var prop in target) {
            source[prop] = target[prop];
        }
        return source;
    }

    // 用于继承
    $.fn = Object.extend(NodeList.prototype, __prototype__);

    function getArray(selector) {
        return document.querySelectorAll(selector);
    }

    $.fn.muPlugin = function () {
        console.log('This is my plugin...')
    }

    window.$ = window.jQuery = $;
    return $;
})(window)
