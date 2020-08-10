import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerApplication, start } from 'single-spa';


Vue.config.productionTip = false


// 实现 js 的加载
async function loadScript(url) {

  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })

}

// 注册应用
registerApplication('myVueApp', async () => {
  console.log('加载模块 myVueApp');
  // systemJS
  await loadScript(`http://localhost:10000/js/chunk-vendors.js`);
  await loadScript(`http://localhost:10000/js/app.js`);
  return window.singleVue // bootstrap mount unmount
},
  // 用户切换到 /vue 的路径下，我们需要加载刚才自定义的子应用
  location => location.pathname.startsWith('/vue'),

)

start();





new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
