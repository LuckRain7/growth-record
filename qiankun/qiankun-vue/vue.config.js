module.exports = {
    devServer: {
        port: 10000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        output: {
            library: 'vueApp',
            libraryTarget: 'umd'
        }
    }
}