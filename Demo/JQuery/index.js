/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-06-24 15:22:55
 * 
 *  函数有多重角色： 不同函数 | 构造函数（类） | 对象
 */

; (function (global, factory) {
    'use strict' // 代码严格模式
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // 说明是支持CommonJS模块规范的（例如node）
    } else {
        // 浏览器端
        factory(global)
    }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {

    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context)
    }

    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++
        }

        if (typeof target !== 'object' && !isFunction(target)) {
            target = {};
        }
    }

    jQuery.fn.each = function (callback) {
        return jQuery.each(this, callback)
    }
    jQuery.each = function (obj, callback) {
        // obj 可以使数组（类数组） 或者 对象
        // 遍历对象/ 数组/类数组中的每一项的
        if (isArrayLike(obj)) {
            for (var i = 0; i < obj.length; i++) {
                var item = obj[i]
                var result = callback.call(obj[i], i, obj[i])
                if (result === false) {
                    break;
                }
            }
        } else {
            // 对象换成 for in 循环
            for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
    }


    // *********** jQuery 是一个类
    jQuery.fn = jQuery.prototype = {
        // 保证原型对象上的构造器完整
        constructor: jQuery
        // ..... 
    }

    // init也是一个类
    // new jQuery,fn.init() => $()选择器是创建这个类的一个实例
    // 实例本应该指向 init.prototype 但是我们让 init.prototype = jQuery.prototype
    // 所以最终这个init类的实例的 __proto__ 指向的是 jQuery.prototype 
    // 也就类似于创建了一个JQ实例
    // JQ 选择器就是JQ类的与一个实例，此实例可以调用JQ原型上的方法
    var init = jQuery.fn.init = function (selector, context) {
        /* 
         * $([selector])
         *   [selector] 支持三种类型
         *      String 基于 css 选择器获取元素
         *      元素节点 把 DOM 元素转换成 JQ 对象（JQ类的实例）
         *      函数 $(document).ready
         *
         */


    }
    init.prototype = jQuery.fn = jQuery.prototype

    // 具体方法
    jQuery.Callbacks = function () {

    }


    // 冲突处理（一个项目中引入多个类库，其中一个类库用的也是$ 如果再引用JQ，那么$到底代表谁就冲突了）
    // 在最新开始的时候执行
    // 执行：$.noConflict()
    var _jQuery = window.jQuery,
        _$ = window.jQuery

    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery
        }

        return jQuery
    }

    // 如果是浏览器运行，条件成立 !undefined
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery// 把 jQuery 暴露到全局
    }
})

/*
 * typeof window !== 'undefined' ? window : this
 * 却别在浏览器运行还是Node端运行
 * typeof xx :如果xx不存在，也不会报错，而是返回undefined
 */
