# 日志管理 app

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

## 2. localstorage 的使用
