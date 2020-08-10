// 将项目打包成一个类库    
// 进行打包配置 lib


module.exports = {
    configureWebpack: {
        output: {
            library: 'singleVue',
            libraryTarget: 'umd'
        },
        devServer: {
            port: 10000
        }
    }
}


