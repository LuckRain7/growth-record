/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-19
 * @Description  : 实现静态文件服务器，提供文件支持
 * @ Love and Peace
 */ 


const koaStatic = require('koa-static')
    , path = require('path')

function serveStaticPlugin({ app, root }) {

    app.use(koaStatic(root)) // vite 在哪里运行 启动什么目录
    app.use(koaStatic(path.join(root, 'public'))) // 以 public 作为静态服务  

}

module.exports = {serveStaticPlugin}