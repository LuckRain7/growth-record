const Koa = require('koa')
    , { serveStaticPlugin } = require('./plugins/serverPluginServeStatic')
    , { moduleRewritePlugin } = require('./plugins/serverPluginModulesRewrite')
    , { moduleResolvePlugin } = require('./plugins/serverPluginModulesResolve')
    , { htmlRewritePlugin } = require('./plugins/serverPluginHtmlRewrite')
    , { vuePlugin } = require('./plugins/serverPluginVue')

function createServer() {

    const app = new Koa() // 创建实例
        , root = process.cwd() // 拿到当前运行文件夹地址
        , context = {
            app,
            root
        }

    // 当用户 npm run dev 时，创建一个服务

    // koa 是基于中间件来与运行的 中间价的执行顺序
    const resolvedPlugin = [
        // 插件的集合
        // 4、添加全局变量
        htmlRewritePlugin,

        // 2、解析 import 语法 重写路径
        moduleRewritePlugin,

        // 3、parse @/modules/xxx to find this file and return content
        moduleResolvePlugin,

        // 5、parse .vue file
        vuePlugin,

        // 1、实现静态文件服务
        serveStaticPlugin
    ]

    resolvedPlugin.forEach(plugin => plugin(context))

    return app; // 返回 app 中有listen 方法
}

module.exports = createServer