#!/usr/bin/env node
/*
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-19
 * @Description  : 可运行的脚本
 * #!/usr/bin/env node 必须进行设置
 * @ Love and Peace
 */ 

//  需要通过 http 启动一个模块，内部是基于 koa
 const createServe  = require('../index')

 const www = createServe()

 www.listen(4000,function(){
     console.log('runing in http://localhost:4000/');
 })

 console.log('rain-vite');