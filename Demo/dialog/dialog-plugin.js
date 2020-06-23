/*
 *  Description: 模态框插件
 *  Author: LuckRain7
 *  Date: 2020-06-20 19:36:30
 *  进行动态构建
 */

// 利用闭包进行
// 类的好处就是私有化实例
window.alert = (function () {
  // dialog:模态框类(每一个模态框都是创建这个类的实例)
  class Dialog {
    constructor(content, options) {
      // 把手续在各个方法中用到的内容全部挂在到实例上
      this.content = content
      this.options = options

      this.init()
    }

    // 创建元素
    createElement(type, cssText) {
      let element = document.createElement(type)
      element.style.cssText = cssText
      return element
    }

    createDIV(cssText = '', type = 'div') {
      let div = document.createElement(type)
      div.style.cssText = cssText
      return div
    }

    create() {
      this.$DIALOG = this.createDIV(`
      display:'none';
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9998;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .8);
      user-select: none;
      opacity: 0;
      transition: opacity .3s;`)

      this.$MAIN = this.createDIV(`
      position: absolute;
      top: 100px;
      left: 50%;
      margin-left: -200px;
      z-index: 9999;
      width: 400px;
      background: #FFF;
      border-radius: 5px;
      overflow: hidden;
      transform: translateY(-1000px);
      transition: transform .3s;
      `)

      this.$HEADER = this.createDIV(`
      position: relative;
      box-sizing: border-box;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      background: #2299EE;
      `)

      this.$TITLE = this.createDIV(
        `
      font-size: 18px;
      color: #FFF;
      font-weight: normal;
      margin: 0;
      `,
        'h3'
      )

      this.$CLOSE = this.createDIV(
        `
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      font-style: normal;
      color: #FFF;
      font-family: 'Courier New';
      cursor: pointer;
      `,
        'i'
      )

      this.$BODY = this.createDIV(`
      padding: 30px 10px;
      line-height: 30px;
      font-size: 16px;
       `)

      this.$FOOTER = this.createDIV(`
      text-align: right;
      padding: 10px 10px;
      border-top: 1px solid #EEE;
       `)

      this.$CONFIRM = this.createDIV(
        `
      margin: 0 5px;
      padding: 0 15px;
      height: 28px;
      line-height: 28px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      color: #FFF;
      background: #2299EE;
      border-radius: 5px;
       `,
        'button'
      )

      this.$CANCEL = this.createDIV(
        `
      margin: 0 5px;
      padding: 0 15px;
      height: 28px;
      line-height: 28px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      color: #000;
      background: #DDD;
      border-radius: 5px;
       `,
        'button'
      )

      // 把创建的元素按照层级混合（从里向外）
      let { title, confirm } = this.options
      this.$TITLE.innerHTML = title
      this.$CLOSE.innerHTML = 'X'
      this.$HEADER.appendChild(this.$TITLE)
      this.$HEADER.appendChild(this.$CLOSE)
      this.$BODY.innerHTML = this.content
      this.$MAIN.appendChild(this.$HEADER)
      this.$MAIN.appendChild(this.$BODY)

      if (confirm) {
        // 显示底部确定和取消按钮
        this.$CONFIRM.innerHTML = '确定'
        this.$CANCEL.innerHTML = '取消'
        this.$FOOTER.appendChild(this.$CONFIRM)
        this.$FOOTER.appendChild(this.$CANCEL)
        this.$MAIN.appendChild(this.$FOOTER)
      }

      this.$DIALOG.appendChild(this.$MAIN)
      document.body.appendChild(this.$DIALOG) // 插入到页面当中
    }

    // 显示模态框
    show() {
      this.$DIALOG.style.opacity = 1
      this.$MAIN.style.transform = 'translateY(0)'

      // 如果没有确定和取消按钮，显示3ms后消失
      if (!this.options.confirm) {
        this.$timer = setTimeout(() => {
          this.hide()
          clearTimeout(this.$timer)
        }, 1000)
      }
    }

    // 隐藏模态框
    hide(lx = 'CANCEL') {
      this.$MAIN.style.transform = 'translateY(-1000px)'
      this.$DIALOG.style.opacity = 0
      let fn = () => {
        document.body.removeChild(this.$DIALOG)
        // 触发 handled 函数
        if (typeof this.options.handled === 'function') {
          this.options.handled.call(this, lx)
        }
        // 当前方法只绑定一次
        this.$DIALOG.removeEventListener('transitionend', fn)
      }
      this.$DIALOG.addEventListener('transitionend', fn)
    }

    // 初始化
    init() {
      this.create()
      this.$DIALOG.offsetHeight // 阻断渲染队列，让上述代码立即执行
      this.show()

      // 基于事件委托实现关闭/确定 取消按钮的点击操作
      this.$DIALOG.addEventListener('click', (ev) => {
        let target = ev.target
        if (/^(BUTTON|I)$/i.test(target.tagName)) {
          // 取消自动消失
          clearTimeout(this.$timer)
          this.hide(target.innerHTML === '确定' ? 'CONFIRM' : 'CANCEL')
        }
      })
    }
  }

  // proxy 就是 alert 的执行的函数
  // 插件封装的时候 如果需要传递多个配置项，我们一般都是让其传递一个对象
  return function proxy(content, options) {
    // 传参验证
    if (typeof content === 'undefined') {
      throw new Error('错误：提示内容必须传递')
    }
    if (options === null || typeof options !== 'object') {
      throw new Error('错误：参数配置必须是一个对象！')
    }

    // 参数默认值和替换
    options = Object.assign(
      {
        title: '系统温馨提示',
        confirm: false,
        handled: null,
        // color:'#'
      },
      options
    )

    return new Dialog(content, options)
  }
})()
