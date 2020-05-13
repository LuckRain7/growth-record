# jszip

## 1.  Node

```javascript
/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-04 13:15:14
 */
const ejs = require('ejs')
const Fs = require('fs')
const fs = Fs.promises
const path = require('path')
const ZIP = require('jszip')

// 提供路径读取函数
const readFile = async (filePath) => {
  const r = await fs.readFile(filePath, 'utf8')
  return r
}

// 获得路径
const getFilePath = (filePath) => {
  return path.resolve(__dirname, filePath)
}

// 获取时间
function getNowTime() {
  const myDate = new Date()
  const myYear = myDate.getYear()
  const myMonth = myDate.getMonth()
  const myHour = myDate.getHours()
  const myMinute = myDate.getMinutes()
  const mySecond = myDate.getSeconds()
  return `DEMO${myYear}${myMonth}${myHour}${myMinute}${mySecond}.zip`
}

async function createZIP(data, filename) {
  const zip = new ZIP()

  // 读取文件内容
  const packageJSON = await readFile(getFilePath('./package.ejs'))
  const indexJSTemplate = await readFile(getFilePath('./index.ejs'))

  // index.js 模板渲染
  const renderData = {
    secret: data.secret,
    // cmd: "cd C:\\APP\\MyWorkLoad && git pull",
    cmd: `cd ${data.file} && ${data.cmd}`,
    path: data.url,
    port: data.port
  }
  const indexJS = ejs.render(indexJSTemplate, renderData)

  // 创建文件并解压
  zip.file('package.json', packageJSON)
  zip.file('index.js', indexJS)
  const content = await zip.generateAsync({
    type: 'nodebuffer', // node压缩类型
    compressionOptions: {
      level: 5 // 压缩级别
    }
  })

  // 将压缩文件存储到静态文件中
  await fs.writeFile(getFilePath(`../../static/${filename}`), content)

  return `${filename}`
}

const create = async (renderData) => {
  const filename = getNowTime()
  const result = await createZIP(renderData, filename)
  return result
}

module.exports = create
```

## 2.  浏览器端

```javascript
async funDownload(content, filename) {
  var eleLink = document.createElement("a");
  eleLink.download = filename;
  eleLink.style.display = "none";
  // 字符内容转变成blob地址

  // 创建文件并解压
  const zip = new ZIP();
  zip.file("package.json", content.packagejson);
  zip.file("index.js", content.indexjs);
  const result = await zip.generateAsync({
    type: "blob", // 浏览器压缩类型
    compressionOptions: {
      level: 5, // 压缩级别
    },
  });

  const blob = new Blob([result]);

  eleLink.href = URL.createObjectURL(blob);

  document.body.appendChild(eleLink); // 触发点击
  eleLink.click();

  document.body.removeChild(eleLink); // 然后移除
},
```

