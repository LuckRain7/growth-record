/* minimist
   对命令行进行解析
 */

var argv = require("minimist")(process.argv.slice(2), {
  // 设置默认参数
  default: {
    dir: process.cwd(),
  },
});

console.log(`当前工作目录是: ${process.cwd()}`);
console.log(argv);
