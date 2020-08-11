import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false


let instance = null
function render() {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#vueapp') // 这里是挂在到自己的html中，基座会拿到这个挂在后的html，将其插入进去
}
// 进行判断，是否微前端运行 动态添加 publicPath
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 如果没有微前端，则自己独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('vue app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */

export async function mount(props) {
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.$destroy();
}

