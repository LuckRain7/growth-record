import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { registerMicroApps, start } from 'qiankun';

const apps = [
  {
    name: 'vue app', // 应用的名字
    entry: '//localhost:10000', // 默认会加载这个html 解析里边的js 动态的执行（子应用必须支持跨域）
    container: '#vue', // 容器名
    activeRule: '/vue', // 激活的路径
  },
  {
    name: 'react app', // app name registered
    entry: '//localhost:20000',
    container: '#react',
    activeRule: '/react',
  },
]

registerMicroApps(apps); // 注册
start({
  prefetch: false // 取消预加载
});


Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



