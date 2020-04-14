<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-13 16:48:15
 -->
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
