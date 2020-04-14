# Vue + TypeScript

## 1.  环境配置

package.json文件

```json
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "./node_modules/.bin/webpack --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.2",
    "vue": "^2.6.11",
    "vue-class-component": "^7.2.3",
    "vue-property-decorator": "^8.4.1"
  },
  "devDependencies": {
    "css-loader": "^3.4.2",
    "ts-loader": "^6.2.1",
    "typescript": "^3.7.4",
    "vue-loader": "^15.8.3",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.11",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10"
  }
}
```

webpack.config.js

```js
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    index: "./src/index.ts",
  },

  output: {
    path: __dirname + "/dist",
    filename: "index.js",
  },

  resolve: {
    extensions: [".js", ".json", ".ts"],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },

  plugins: [new VueLoaderPlugin()],
};
```

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",                
    "module": "commonjs",             
    "allowJs": true,                 
    "experimentalDecorators": true,          
  }
}
```

## 2.  基础写法

```vue

<template>
  <div>
    <div>
      今日头条
    </div>
    <list :datasource="listData" />
  </div>
</template>

<script lang="ts">
import { getList } from "../actions/index";
import List from "../components/list.vue";
import { scrollFy } from "../utils/decorators";

import { Vue, Component } from "vue-property-decorator";
import { VueConstructor } from "vue"; //获取 vue 类型 泛型


// 装饰器
@Component({
  components: {
    List
  }
})
@scrollFy<VueConstructor>()
export default class App extends Vue {
  private listData: [] = [];

  created() {
    getList().then(listData => {
      console.log(listData);
      this.listData = listData;
    });
  }

  onReachBottom() {
    console.log("END");
  }
}

// export default {
//   components: {
//     List
//   },
//   data() {
//     return {
//       listData: []
//     };
//   },

//   created() {
//     getList().then(listData => {
//       console.log(listData);
//       this.listData = listData;
//     });
//   }
// };
</script>

<style scoped></style>
```



## 3.  知识点

### 3.1  按类型加载组件

```vue

<template>
  <div class="List">
    <div>我是列表</div>

    <!-- 进行组件判断 选取对应的组件进行加载 -->
    <component
      v-for="(item, index) in datasource"
      :is="item.type"
      :item="item"
      :key="index"
    >
    </component>
  </div>
</template>

<script lang='ts'>
import { getAllComponents } from "./items/index";
console.log(getAllComponents());

export default {
  props: ["datasource"],
  components: {
    ...getAllComponents()
  }
};
</script>

<style></style>

```

### 3.2  触底判断

```javascript
detectScroll() {
  window.addEventListener("scroll", () => {
    const computeDistance = () => {
      return (
        document.body.clientHeight - window.scrollY - window.screen.height
      );
    };
    const THERTHHOLD = 100;
    if (computeDistance() < THERTHHOLD) {
      console.log("加载");
    }
  });
}
```

