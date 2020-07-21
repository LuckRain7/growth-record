/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-20
 * @Description  : 解析 @/modules/xx  文件
 * @ Love and Peace
 */
// not include @/modules
const moduleREG = /^\/@modules\//
    , fs = require('fs').promises
    , path = require('path')

function resolveVue(root) {
    // Vue3 有几部门解决 runtime-dom runtime-core complier 在后端中解析.vue文件 complier-sfc

    // 编译是在后端实现，所以需要拿到的文件是 commonjs 规范的
    const compilerPkgPath = path.join(root, 'node_modules', '@vue/compiler-sfc/package.json')

    const compilerPkg = require(compilerPkgPath) // get the package,json
        , compilerPath = path.join(path.dirname(compilerPkgPath), compilerPkg.main)
        , resolvePath = (name) => path.resolve(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`)
        , runtimeDomPath = resolvePath('runtime-dom')
        , runtimeCorePath = resolvePath('runtime-core')
        , reactivityPath = resolvePath('reactivity')
        , sharedPath = resolvePath('shared')


    // esModules  设置对应的映射关系
    return {
        compiler: compilerPath,
        '@vue/runtime-dom': runtimeDomPath,
        '@vue/runtime-core': runtimeCorePath,
        '@vue/reactivity': reactivityPath,
        '@vue/shared': sharedPath,
        vue: runtimeDomPath
    }

}

function moduleResolvePlugin({ app, root }) {

    // 根据当前运行的 vite 的目录解析出一个文件表来，包括着 vue 里边的所有模块
    const vueResolved = resolveVue(root)

    app.use(async (ctx, next) => {
        // Process the current request path ，Does it start with @modules
        if (!moduleREG.test(ctx.path)) {
            return next()
        }
        // make the /@modules replace
        const id = ctx.path.replace(moduleREG, '') //vue

        ctx.type = 'js'
        //  should to find the true vue file in this project's menu
        const content = await fs.readFile(vueResolved[id], 'utf8')
        ctx.body = content
    })
}

exports.moduleResolvePlugin = moduleResolvePlugin;