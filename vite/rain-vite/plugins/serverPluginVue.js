/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-21
 * @Description  : 针对 .vue 文件进行解析（路径解析、代码解析）
 * @ Love and Peace
 */ 



const path = require('path')
    , fs = require('fs').promises
    , defaultExportRE = /((?:^|\n|;)\s*)export default/

function resolveVue(root) {
    // vue3由几部分组成  runtime-dom runtime-core reactivity shared  , 在后端中解析.vue文件 compiler-sfc


    // 编译是在后端实现的，所以我需要拿到的文件是commonjs规范的
    const compilerPkgPath = path.join(root, 'node_modules', '@vue/compiler-sfc/package.json');

    const compilerPkg = require(compilerPkgPath); // 获取的是json中的内容
    // node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js
    const compilerPath = path.join(path.dirname(compilerPkgPath), compilerPkg.main)
    const resolvePath = (name) => path.resolve(root, 'node_modules', `@vue/${name}/dist/${name}.esm-bundler.js`);
    const runtimeDomPath = resolvePath('runtime-dom');
    const runtimeCorePath = resolvePath('runtime-core');
    const reactivityPath = resolvePath('reactivity');
    const sharedPath = resolvePath('shared');

    // esmModule 模块
    return {
        compiler: compilerPath,// 用于稍后后端进行编译的文件路径
        '@vue/runtime-dom': runtimeDomPath,
        '@vue/runtime-core': runtimeCorePath,
        '@vue/reactivity': reactivityPath,
        '@vue/shared': sharedPath,
        vue: runtimeDomPath
    }
}

function vuePlugin({ app, root }) { // ast 语法树 模板的编译原理
    
    app.use(async (ctx, next) => {
        if (!ctx.path.endsWith('.vue')) { //  当前文件是不是以.vue文件结尾
            return next();
        }
        // vue文件处理
        const filePath = path.join(root, ctx.path);
        const content = await fs.readFile(filePath, 'utf8'); // App.vue中的内容
        // 获取文件内容

        // 拿到模板编译的模块 进行编译
        let { parse, compileTemplate } = require(resolveVue(root).compiler);
        let { descriptor } = parse(content); // 解析文件内容
        if (!ctx.query.type) { // App.vue
            let code = ``;
            if (descriptor.script) {
                let content = descriptor.script.content;
                let replaced = content.replace(defaultExportRE, '$1const __script =');
                code += replaced;
            }
            if (descriptor.template) { // /App.vue?type=template
                const templateRequest = ctx.path + `?type=template`
                code += `\nimport { render as __render } from ${JSON.stringify(
                    templateRequest
                )}`;
                code += `\n__script.render = __render`
            }
            ctx.type = 'js'
            code += `\nexport default __script`;
            ctx.body = code;
        }
        if (ctx.query.type == 'template') {
            ctx.type = 'js';
            let content = descriptor.template.content;
            const { code } = compileTemplate({ source: content });
            ctx.body = code;
        }
    })
}

exports.vuePlugin = vuePlugin;