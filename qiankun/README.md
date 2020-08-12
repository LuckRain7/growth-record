# qiankun-test

## 创建基座应用

> /qiankun-base

对项目 main.js 进行改造

- 使用 registerMicroApps 注册子应用

- 使用 start 进行启动

```javascript
// main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { registerMicroApps, start } from 'qiankun'

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

registerMicroApps(apps) // 注册
start({
  prefetch: false, // 取消预加载
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

## 创建 Vue 子应用

> /qiankun-vue

对项目 main.js 进行改造

- 导出约定好的 bootstrap mount unmount 等方法

- 注入一个运行时的 publicPath 变量

- 进行判断，设置项目独立运行

> ps: 子应用挂在的 DOM id 要是唯一的，不能与其余应用或者基座应用重复

```javascript
// main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router'

let instance = null
function render() {
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#vueapp') // 这里是挂在到自己的html中，基座会拿到这个挂在后的html，将其插入进去
}

// 进行判断，是否微前端运行 动态添加 publicPath
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 如果没有微前端，则自己独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('vue app bootstraped')
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
  instance.$destroy()
}
```

对 Vue 打包配置进行改造

- 设置端口号和跨域（开发环境一定要设置跨域！）

- 将项目打包成一个 umd 规范的类库

```javascript
// vue.config.js

module.exports = {
  devServer: {
    port: 10000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: 'vueApp', // library
      libraryTarget: 'umd', //
    },
  },
}
```

对子应用路由进行改造

- 设置 base 路径，改为在基座中注册的路径

```javascript
const router = new VueRouter({
  mode: 'history',
  base: '/vue',
  routes,
})
```

## 创建 React 子应用

> /qiankun-react

对项目启动配置进行修改

- 修改端口号

- 开启跨域

- 修改打包配置

```text
// .env
PORT=20000
WDS_SOCKET_PORT=20000
```

```javascript
// 下载 react-app-rewired 包 重写启动项
// config-overrides.js

module.exports = {
  webpack: (config) => {
    config.output.library = 'reactApp'
    config.output.libraryTarget = 'umd'
    return config
  },
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      }
      return config
    }
  },
}
```

在 index.js 中进行相关配置导出

```javascript
// index.js

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// 进行判断，是否微前端运行 动态添加 publicPath
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

// 如果没有微前端，则自己独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {}

export async function mount() {
  render()
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}
```

## 注意

需进行相关函数的导出

子应用需修改 渲染 id 与父应用的渲染 id 要进行区分

react-app-rewired 重写 react 配置的包

启动脚本需要进行修改 "dev": "react-app-rewired start",

通过.env 文件可以修改一些配置项
