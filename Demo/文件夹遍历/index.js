const Path = require('path')
const fs = require('fs')

// 设置检索目录
const rootPath = Path.resolve(__dirname, 'Demo')

// 存储文件目录
let filesNameArr = {
    path: rootPath,
    name: 'Demo',
    type: 'directory',
    children: [],
    deepIndex: 0,
}

let deepIndex = 0
const getDirMap = function (dir, curArray, _deepIndex) {
    // 同步拿到文件目录下的所有文件名
    const filesName = fs.readdirSync(dir)

    filesName.map(function (fileNameItem, index) {
        const curPath = Path.join(dir, fileNameItem), // 拼接为绝对路径
            stats = fs.statSync(curPath) // 文件状态

        // 设置过滤文件
        if (fileNameItem != '.git' && fileNameItem != 'node_modules') {
            // 判断是否为文件夹类型
            if (stats.isDirectory()) {
                curArray[index] = {
                    path: curPath,
                    name: fileNameItem,
                    type: 'directory',
                    children: [],
                    deepIndex: _deepIndex + 1,
                }

                return getDirMap(
                    curPath,
                    curArray[index].children,
                    curArray[index].deepIndex
                ) // 递归读取文件夹
            } else {
                // 文件
                curArray[index] = {
                    path: curPath,
                    name: fileNameItem,
                    type: 'file',
                    deepIndex: _deepIndex + 1,
                }
            }
        }
    })
}

let printContent = ''
const charSet = {
    dir: '📁 ',
    enter: '\n',
    space: '|—— ',
    file: '📃 ',
    first: '# ',
}
let first = true
const print = function (_Map) {
    if (first) {
        printContent += charSet.first
        printContent += charSet.dir + _Map.name + charSet.enter
        first = false
    }

    _Map.children.forEach(function (item) {
        if (item.type == 'directory') {
            printContent += charSet.first // 添加头部
            // 根据层级进行缩进
            for (let i = 0; i <= _Map.deepIndex; i++) {
                printContent += charSet.space
            }
            printContent += charSet.dir + item.name + charSet.enter
            print(item) // 递归打印
        } else {
            printContent += charSet.first
            for (let i = 0; i <= _Map.deepIndex; i++) {
                printContent += charSet.space
            }
            printContent += charSet.file + item.name + charSet.enter
        }
    })
}

getDirMap(rootPath, filesNameArr.children, deepIndex) // 获取文件 Map

print(filesNameArr) // 打印

fs.writeFileSync('menu.txt', printContent) // 打印
