# Alpine.js

> [GitHub](https://github.com/alpinejs/alpine)

## Install

1. HTML中直接引用

```HTML
<!-- HTML -->
<script defer src="https://unpkg.com/alpinejs@3.2.1/dist/cdn.min.js"></script>
```

2. 在工程中应用

```shell
npm install alpinejs
```

```JavaScript
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()
```

## API

* 15个属性
  + x-data  组件声明、给DOM添加数据
  + x-bind  语法糖：
  + x-on  语法糖@
  + x-text
  + x-html
  + x-model
  + x-show
  + x-transition  对应元素添加动画
  + x-for
  + x-if
  + x-init  有点像Vue生命周期的中的create、mounted，ajax请求在这里进行
  + x-effect  数据监听
  + x-ref  DOM元素访问
  + x-cloak  解决刷新或者加载出现闪烁
  + x-ignore  忽略DOM，不收Alpine的影响
* 6个特性
  + $store  获取全局的状态属性
  + $el  获取当前元素上的DOM属性
  + $dispatch  组件间事件调用
  + $watch  数据监听
  + $refs  获取组件内标记为x-ref的DOM元素
  + $nextTick  DOM更新后回调事件
* 2个方法
  + Alpine.data  Alpine组件注册方法，Alpine.data('', ()=>({}))
  + Alpine.store  全局状态管理

## Other

DOM 外层必须要添加 x-data 属性

alpine 加载监听事件

```JavaScript
// 初始化完成后钩子
document.addEventListener('alpine:init', () => {
  Alpine.data(...)
})

// 初始化之前钩子
document.addEventListener('alpine:initialized', () => {
  //
})
```

## Menu

```text
alpinejs
├── builds
│   ├── cdn.js
│   └── module.js
├── package.json
└── src
    ├── alpine.js
    ├── clone.js
    ├── datas.js
    ├── directives
    │   ├── index.js
    │   ├── x-bind.js
    │   ├── x-cloak.js
    │   ├── x-data.js
    │   ├── x-effect.js
    │   ├── x-for.js
    │   ├── x-html.js
    │   ├── x-if.js
    │   ├── x-ignore.js
    │   ├── x-init.js
    │   ├── x-model.js
    │   ├── x-on.js
    │   ├── x-ref.js
    │   ├── x-show.js
    │   ├── x-text.js
    │   └── x-transition.js
    ├── directives.js
    ├── evaluator.js
    ├── index.js
    ├── interceptor.js
    ├── lifecycle.js
    ├── magics
    │   ├── $dispatch.js
    │   ├── $el.js
    │   ├── $nextTick.js
    │   ├── $refs.js
    │   ├── $store.js
    │   ├── $watch.js
    │   └── index.js
    ├── magics.js
    ├── mutation.js
    ├── nextTick.js
    ├── plugin.js
    ├── reactivity.js
    ├── scheduler.js
    ├── scope.js
    ├── store.js
    └── utils
        ├── bind.js
        ├── classes.js
        ├── dispatch.js
        ├── on.js
        ├── once.js
        ├── styles.js
        ├── walk.js
        └── warn.js
```
