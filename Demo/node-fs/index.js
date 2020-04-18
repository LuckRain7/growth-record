/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-17 16:37:43
 */

const {
  isDirectoryFunc,
  add_directory,
  depth_find_add_directory,
  depth_find_add_file,
  debounce
} = require('./utils.js')
const { readdir, writeFile } = require('fs')
const path = require('path')

// 配置文件
const config = {
  root: '../docs', //根目录
  out: './catalog.js', //输出文件及位置
  ignore: ['.vuepress'] //忽略文件（可以使文件夹或文件）
}
const ROOTPATH = path.resolve(__dirname, config.root) // 获取根目录地址

// 读取目录下所有文件
function func_readdir(_path) {
  return new Promise((resolve, reject) => {
    readdir(_path, (err, files) => {
      if (err) return err
      resolve(files)
    })
  })
}

function ignoreFunc(nameArray, ignoreArray = []) {
  return nameArray.filter(e => {
    if (ignoreArray.some(a => a == e)) {
      return
    }
    return e
  })
}
// 接受生成
let tree = []

// 递归
const traverse = async parentPath => {
  let rootDownFile = await func_readdir(parentPath)
  rootDownFile = ignoreFunc(rootDownFile, config.ignore)

  await Promise.all(
    rootDownFile.map(async item => {
      // -^_^- //
      const itemPath = path.resolve(parentPath, item)
      const is = await isDirectoryFunc(itemPath) // 是否是文件夹
      const thisPath = parentPath.replace(ROOTPATH, '')

      //是文件夹
      function yes() {
        thisPath.length === 0
          ? add_directory(tree, item) //  true  一级目录
          : depth_find_add_directory(tree, item, thisPath) //  false 进行判断

        traverse(itemPath) // 继续递归
      }

      // 不是文件夹
      function no() {
        depth_find_add_file(tree, item, thisPath)
      }

      is ? yes() : no()
    })
  ) //Promise.all
  waitRender()
} // function traverse

async function init() {
  await traverse(ROOTPATH)
}

function render() {
  console.log()
  const data = `module.exports=${JSON.stringify(tree)}`
  writeFile(config.out, data, error => {
    if (error) {
      console.log(error)
    } else {
      console.log(`读取目录成功，以为你生成文件${config.out}`)
    }
  })
}

const waitRender = debounce(render, 500)

init()
