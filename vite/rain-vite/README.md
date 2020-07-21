# rain-vite

使用 npm link 链接到全局上

下载依赖

es-module-lexer     解析 module 模块

koa http            服务器

koa-static          静态文件服务

magic-string        对字符串进行操作

## 读 stream 中的数据

```javascript
async function readBody(stream) {
  // koa 中要求所有的异步方法必须要包装成 Promise
  return new Promise((resolve, reject) => {

    let res = "";

    stream.on("data", (data) => {
      res += data;
    });

    stream.on("end", () => {
      resolve(res); // 将内容解析完成抛出去
    });
    
  });
}
```
