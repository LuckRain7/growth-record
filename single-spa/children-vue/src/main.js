

import Vue from 'vue'
import App from './App.vue'
import router from './router'


// 引入single-spa-vue
import singleSpaVue from 'single-spa-vue';

Vue.config.productionTip = false


const appOptions = {
  el: '#vue', // 挂在到父应用中的id为vue的标签中
  router,
  render: h => h(App)
}

const vueLifeCycle = singleSpaVue({
  Vue, appOptions
})

// 添加设置
// 如果是父应用引用的我，需要在前面拼接路径
if (window.singleSpaNavigate) {
  /* global __webpack_public_path__:writable */
  __webpack_public_path__ = 'http://localhost:10000/'
}

if (!window.singleSpaNavigate) {
  delete appOptions.el;
  new Vue(appOptions).$mount('#app')
}

// 协议接入，我定好了协议，父应用会调用这些方法
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;

// 我们需要父应用加载子应用,将子应用打包成一个一个的lib去给父应用使用

// 我们需要父应用加载子应用

//  bootstrap mount unmount 
//  single-spa  / single-spa-vue

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
