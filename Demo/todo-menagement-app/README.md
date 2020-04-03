# 日志管理 app

> 基于localStorage存储的日志管理系统
>
> 知识点：日期格式化、localStorage使用、`vue-calendar-component`插件使用、vue-router 编程式导航

## 0.  目录文件

```
--src            
   |--assets               
   |    |--images # 存放svg图片              
   |--libs                
   |    |--storage.js  # localstorage封装文件
   |--router  
   |    |--index.js  # 路由模块
   |--styles  # 存放样式
   |    |--basic.less  # 样式文件
   |--views
   |    |--Handle.vue  # 新增页面
   |    |--Home.vue  # 日历首页
--App.vue  # 入口组件               
--main.js  # 项目入口文件               
```



## 1. 根据设计稿进行 rem 与 ps 之间的换算

```js
~(function() {
  function computed() {
    let HTML = document.documentElement,
      deviceW = HTML.clientWidth, //页面宽度
      designW = 750, //设计稿宽度
      ratio = (deviceW / designW) * 100 //1个rem是多少px

    if (deviceW >= 410) {
      ratio = (410 / designW) * 100
    }

    HTML.style.fontSize = ratio + 'px'
  }
  computed()
  window.addEventListener('resize', computed)
})()
```



## 2.  日期 Date()

统一将时间格式化成为  2020/04/03 样式

```js
function formatData(time) {
  let year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate()

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day

  return `${year}/${month}/${day}`
}

function getMinutes() {
  let time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes()

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes

  return `${hours}:${minutes}`
}
```



## 3. localStorage

设置存储信息

```js
function setInfo(time, title = '', content = '') {
  let DATA = JSON.parse(localStorage.getItem(FLAG) || '{}'),
    DATA_KEYS = Object.keys(DATA)
  if (!DATA_KEYS.includes(time)) {
    DATA[time] = []
  }
  let ARR = DATA[time]
  ARR.push({
    id: ARR.length === 0 ? 1 : parseInt(ARR[ARR.length - 1].id) + 1,
    title,
    content,
    time: getMinutes(),
  })

  localStorage.setItem(FLAG, JSON.stringify(DATA))
  return true
}
```

获取数据

```js
function getInfo(time, id) {
  let DATA = JSON.parse(localStorage.getItem(FLAG) || '{}'),
    DATA_KEYS = Object.keys(DATA)

  if (!DATA_KEYS.includes(time)) return null

  DATA = DATA[time]
  if (typeof id !== 'undefined') {
    DATA = DATA.find(item => {
      return parseInt(item.id) === parseInt(id)
    })
  }
  return DATA
}
```

 删除信息

```js
function deleteInfo(time, id) {
  let DATA = JSON.parse(localStorage.getItem(FLAG) || '{}'),
    DATA_KEYS = Object.keys(DATA)

  if (!DATA_KEYS.includes(time)) return false

  let ARR = DATA[time]

  ARR = ARR.filter(item => {
    return parseInt(item.id !== parseInt(id))
  })

  DATA[time] = ARR
  localStorage.setItem(FLAG, JSON.stringify(DATA))

  return true
}
```

## 4.  `vue-calendar-component`插件使用

> 日历组件
>
> 具体参考官方文档： https://www.npmjs.com/package/vue-calendar-component 

## 5. vue-router 跳转

编程式路由（传入参数进行路由与页面联动）

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

