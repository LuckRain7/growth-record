# 图片懒加载及其底层原理

## 1、从浏览器底层渲染机制分析懒加载的意义

**浏览器渲染页面的过程**

1. 构建 DOM 树
2. 构建 CSS 树
3. 生成 RENDER TREE
4. 布局
5. 分层
6. 栅格化
7. 绘制

**为啥要做图片的延迟加载**

构建 DOM 树中如果遇见 img

- 老版本：阻碍 DOM 渲染
- 新版本：不会阻碍 每一个图片请求都会占用一个 HTTP（浏览器同时发送的 HTTP 6 个）

拿回来资源后会和 RENDER TREE 一起渲染

.....

开始加载图片，一定会让也没按第一次渲染速度变慢（白屏）

图片延迟加载：第一次不请求异步加载图片，等页面加载完，其他资源都渲染好了，再去请求加载图片

## 2、最初基于 JS 盒模型实现的懒加载方案

显示图片的部分拿一个盒子占位，盒子有一个默认的背景图：loading 图

开始图片不加载

我们把真是图片的地址赋值给 img 的自定义属性 data-src/data-image...

延迟加载：在页面滚动的时候，把出现在视口中的图片做延迟加载

## 3、基于 getBoundingClientRect 的进阶方案

```javascript
// 加载条件：「盒子底边距离body距离 < 浏览器底边距离 body的距离」

// let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight,
//     A = winH + document.documentElement.scrollTop;
// if (B <= A) {
//     lazyImg(lazyImageBox)
// }

let { bottom } = lazyImageBox.getBoundingClientRect()
// 盒子的底距离页面最上的距离 小于页面整体高度
if (bottom < winH) {
  lazyImg(lazyImageBox)
}
```

## 4、手撕 Lodash 源码中的 debounce（函数防抖）

```javascript
/*
 * debounce：实现函数的防抖（目的是频繁触发中只执行一次）
 *  @params
 *     func:需要执行的函数
 *     wait:检测防抖的间隔频率
 *     immediate:是否是立即执行（如果为TRUE是控制第一次触发的时候就执行函数，默认FALSE是以最后一次触发为准）
 *  @return
 *     可被调用执行的函数
 */
function debounce(func, wait = 500, immediate = false) {
  let timer = null
  return function anonymous(...params) {
    let now = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      // 执行函数:注意保持THIS和参数的完整度
      !immediate ? func.call(this, ...params) : null
    }, wait)
    now ? func.call(this, ...params) : null
  }
}
```

## 5、手撕 Lodash 源码中的 throttle（函数节流）

```javascript
/*
 * throttle：实现函数的节流（目的是频繁触发中缩减频率）
 *   @params
 *      func:需要执行的函数
 *      wait:自己设定的间隔时间(频率)
 *   @return
 *      可被调用执行的函数
 */
function throttle(func, wait = 500) {
  let timer = null,
    previous = 0 //记录上一次操作时间
  return function anonymous(...params) {
    let now = new Date(), //当前操作的时间
      remaining = wait - (now - previous)
    if (remaining <= 0) {
      // 两次间隔时间超过频率：把方法执行即可
      clearTimeout(timer)
      timer = null
      previous = now
      func.call(this, ...params)
    } else if (!timer) {
      // 两次间隔时间没有超过频率，说明还没有达到触发标准呢，设置定时器等待即可（还差多久等多久）
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        previous = new Date()
        func.call(this, ...params)
      }, remaining)
    }
  }
}
```

## 6、终极方案:IntersectionObserver

实现延迟加载，这种方案的性能很好（现在会有兼容性的问题）

IntersectionObserver 用来监听一个 DOM 对象，当 DOM 对象，出现和离开视口的时候 触发回调函数

```javascript
observer = new IntersectionObserver((changes) => {
  // 判断符合条件的才进行加载
  changes.forEach((item) => {
    let { isIntersecting, target } = item
    if (isIntersecting) {
      lazyImg(target)
      observer.unobserve(target) // 移除监听(节约性能)
    }
  })
})

// 使用
observer.observe(lazyImageBox)
```

## 7、未来设想:img.loading=lazy

chrome 特性，版本兼容有问题。

```html
<img src="${pic}" alt="" loading="lazy" />
```
