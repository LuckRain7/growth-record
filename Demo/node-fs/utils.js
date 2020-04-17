/*
 *  Description: 工具函数
 *  Author: LuckRain7
 *  Date: 2020-04-17 16:40:30
 */

const { stat } = require("fs");
const Path = require("path");

/*
 *  description: 判断是否为文件夹(异步)
 *  param {string} path 文件地址
 *  return:  promise(boolean)
 */
const isDirectoryFunc = function (path) {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) throw err;
      resolve(stats.isDirectory());
    });
  });
};

/*
 *  description: 添加目录信息
 *  param {Array} _tree  接受添加数组
 *  param {string} _path 目录名称
 *  return:
 */
function add_directory(_tree, _path) {
  // -^_^- //
  _tree.push({
    path: _path,
    type: "directory",
    children: [],
  });
}

/*
 *  description: 深度寻找并添加
 *  param {Array} _tree           接受添加数组
 *  param {string} directoryName  目录名称
 *  param {string} _thisPath      文件所在相对root的路径
 *  return:
 */
function depth_find_add_directory(_tree, directoryName, _thisPath) {
  // 定义变量
  let _thisTreeArray = _thisPath.split("\\"); // 进行目录梳理分级 ['','1','1-1']
  const level = _thisTreeArray.length; //目录级别

  // 2 级目录
  if (level === 2) {
    _tree.forEach((item1) => {
      if (item1.path === _thisTreeArray[level - 1]) {
        add_directory(item1.children, directoryName);
      }
    });
  }

  // 3 级目录
  else if (level === 3) {
    _tree.forEach((item1) => {
      if (item1.path === _thisTreeArray[level - 2]) {
        item1.children.forEach((item22) => {
          if (item22.path === _thisTreeArray[level - 1]) {
            add_directory(item22.children, directoryName);
          }
        });
      }
    });
  } else {
  }
}

function add_file(_tree, filename) {
  const name = filename.split(".");
  _tree.push({
    name: name[0], // 文件名
    extname: name[1], // 扩展名
    type: "file",
  });
}

/*
 *  description: 深度寻找文件并添加
 *  param {Array} _tree           接受添加数组
 *  param {string} filename       文件名称
 *  param {string} _thisPath      文件所在相对root的路径
 *  return:
 */
function depth_find_add_file(_tree, filename, _thisPath) {
  // 定义变量
  let _thisTreeArray = _thisPath.split("\\"); // 进行目录梳理分级 ['','1','1-1']
  const level = _thisTreeArray.length; //目录级别

  // 2 级目录
  if (level === 2) {
    _tree.forEach((item1) => {
      if (item1.path === _thisTreeArray[level - 1]) {
        add_file(item1.children, filename);
      }
    });
  }

  // 3 级目录
  else if (level === 3) {
    _tree.forEach((item1) => {
      if (item1.path === _thisTreeArray[level - 2]) {
        item1.children.forEach((item2) => {
          if (item2.path === _thisTreeArray[level - 1]) {
            add_file(item2.children, filename);
          }
        });
      }
    });
  } else {
  }
}

/*
 *  description:  防抖
 *  param {type}
 *  return:
 */
function debounce(fn, time) {
  let timeout = null;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn();
    }, time);
  };
}

module.exports = {
  isDirectoryFunc,
  add_directory,
  depth_find_add_directory,
  depth_find_add_file,
  debounce,
};
