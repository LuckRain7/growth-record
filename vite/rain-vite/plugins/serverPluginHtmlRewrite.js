/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-20
 * @Description  : 重写模版 添加全局变量
 * @ Love and Peace
 */
const { readBody } = require('./utils');

function htmlRewritePlugin({ app, root }) {

    const script = `
     <script>
         window.process = {}
         process.env = {NODE_ENV:"development"}
     </script>
     `

    // 这里也可以注入热更新脚本 
    app.use(async (ctx, next) => {
        await next()
        if (ctx.response.is('html')) {
            const html = await readBody(ctx.body)
            ctx.body = html.replace(/<head>/, `$&${script}`)
        }
    })
}


exports.htmlRewritePlugin = htmlRewritePlugin