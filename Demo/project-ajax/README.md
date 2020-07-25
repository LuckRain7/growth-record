# 项目 ajax 请求规范

1、设置请求路径

文件路径：src/services/config.js

```javascript
//  1、设置环境变量
const ENV = process.env.NODE_ENV

//  2、定义  ajax 请求ip + host
const BASE_URL_01 =
  ENV === 'development'
    ? 'http://192.168.31.230:8001/'
    : 'http://192.168.31.230:8001/'

const BASE_URL_02 =
  ENV === 'development'
    ? 'http://192.168.31.230:8002/'
    : 'http://192.168.31.230:8002/'

// 3、拼接请求路径
const AJAX_PATH = {
  // http://192.168.31.230:8001/login
  login: BASE_URL_01 + 'login', // 登录 请求路径
  getNavMenu: BASE_URL_01 + 'getNavMenu', // 获取菜单 请求路径
}

// 4、将配置的地址导出
export { BASE_URL_01, BASE_URL_02, AJAX_PATH }
```

2、封装对应 ajax 请求模块

文件路径： src/services/modules/login.js

> modules 文件夹下保存 不同模块的请求

```javascript
// 1、引入 http 请求路径
import { AJAX_PATH } from './config.js'

// 2、导入封装好的 带权限和无权限请求类
// HTTP_UNLIMITED  无权限请求类  不携带 token
// HTTP_LIMITED    有权限请求类  携带token
import { HTTP_UNLIMITED, HTTP_LIMITED } from '../utils/axios.js'

// 3、利用类的继承 封装对应的请求
class LoginHttpUl extends HTTP_UNLIMITED {
  Login(options) {
    return this._post(AJAX_PATH.login, options)
  }
}

class LoginHttpL extends HTTP_LIMITED {
  // 获取导航菜单权限
  GetNavMenuHttp() {
    return this._get(AJAX_PATH.getNavMenu, {})
  }
}

// 4、将对应的请求类导出
export { LoginHttpUl, LoginHttpL }
```

3、在组件中使用

文件路径： src/views/login/Login.vue

```javascript
// 1、导入对应的类
import { LoginHttpUl, LoginHttpL } from "@/services/modules/login.js";

// 2、将请求类 进行实例化
const $loginHttpUl = new LoginHttpUl();
const $LoginHttpL = new LoginHttpL();
<script>

default export{
    methods:{
        onSubmit(){
            // 3、发送请求，并接收服务器传递回来的数据
            // 通过 .then 形式进行接收（Promise形式）
            $loginHttpUl
                .login({
                    username: "admin",
                    password: "888888"
                })
                .then(res => {
                    console.log(res);
                });
        }
    }
}
</script>
```
