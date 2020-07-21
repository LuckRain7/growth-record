/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-20
 * @Description  : 工具类
 * @ Love and Peace
 */

/**
 * @description: 获取流中的数据 
 * @param {type} 
 * @return: 
 */

// const Stream = require('stream')
const { Readable } = require('stream')

async function readBody(stream) {   

    if (stream instanceof Readable) {

        // koa 中要求所有的异步方法必须要包装成 Promise
        return new Promise((resolve, reject) => {
            let res = ''

            stream.on('data', (data) => {
                res += data
            })

            stream.on('end', () => {
                resolve(res) // 将内容解析完成抛出去
            })
        })

    } else {
        return stream.toString()
    }

}

module.exports = {
    readBody
}