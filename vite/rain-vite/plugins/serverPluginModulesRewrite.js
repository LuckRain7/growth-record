/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-20
 * @Description  : 重写路径插件 './app.vue' => 详细的请求地址
 * 
 * @ Love and Peace
 */

const { readBody } = require('./utils')
    , { parse } = require('es-module-lexer') // 解析 import 
    , MagicString = require('magic-string')

function rewriteImports(source) {
    let imports = parse(source)[0],
        magicString = new MagicString(source)

    if (imports.length) {
        // 说明有多条 import 语法

        for (let i = 0; i < imports.length; i++) {
            let { s, e } = imports[i] // vue ./App s:start e:end 启止位置
            let id = source.substring(s, e)
            console.log(id);
            // 当前开头是 \ or . no need to rewrite
            if (/^[^\/\.]/.test(id)) {
                id = `/@modules/${id}` // 标示 这个是第三方模块
                magicString.overwrite(s, e, id)
            }
        }
    }

    return magicString.toString() // 将替换后的美国返回，增加@/module 浏览器会再次发送请求，服务器会拦截，带有@modules前缀的请求，进行处理

}

function moduleRewritePlugin({ app, root }) {

    app.use(async (ctx, next) => {
        // koa 洋葱模型
        await next() // ctx.body = await

        if (ctx.body && ctx.response.is('js')) {
            let content = await readBody(ctx.body);
            const result = rewriteImports(content)
            // 重写内容 经重写的内容返回回去
            ctx.body = result
        }


    })

}

module.exports = { moduleRewritePlugin }