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
  debounce,
} = require("./utils.js");
const { readdir, writeFile } = require("fs");
const path = require("path");

// 配置文件
const config = {
  root: "./root",
  out: "./catalog.js",
};
const ROOTPATH = path.resolve(__dirname, config.root); // 获取根目录地址

// 读取目录下所有文件
function func_readdir(_path) {
  return new Promise((resolve, reject) => {
    readdir(_path, (err, files) => {
      if (err) return err;
      resolve(files);
    });
  });
}
// 接受生成
let tree = [];

// 递归
const traverse = async (parentPath) => {
  const rootOne = await func_readdir(parentPath);

  await Promise.all(
    rootOne.map(async (item) => {
      // -^_^- //
      const itemPath = path.resolve(parentPath, item);
      const is = await isDirectoryFunc(itemPath); // 是否是文件夹
      const thisPath = parentPath.replace(ROOTPATH, "");

      //是文件夹
      function yes() {
        thisPath.length === 0
          ? add_directory(tree, item) //  true  一级目录
          : depth_find_add_directory(tree, item, thisPath); //  false 进行判断

        traverse(itemPath); // 继续递归
      }

      // 不是文件夹
      function no() {
        depth_find_add_file(tree, item, thisPath);
      }

      is ? yes() : no();
    })
  ); //Promise.all
  waitRender();
}; // function traverse

async function init() {
  await traverse(ROOTPATH);
}

function render() {
  console.log();
  const data = `module.exports=${JSON.stringify(tree)}`;
  writeFile(config.out, data, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`读取目录成功，以为你生成文件${config.out}`);
    }
  });
}

const waitRender = debounce(render, 500);

init();
