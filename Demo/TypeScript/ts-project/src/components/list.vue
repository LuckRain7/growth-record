<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-13 17:20:52
 -->
<template>
  <div class="List">
    <div>我是列表</div>

    <!-- <section v-for="(item, index) in datasource" :key="index">
      {{ item.title }}
    </section> -->
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

<script lang="ts">
import { getAllComponents } from "./items/index";
import { Vue, Component, Prop } from "vue-property-decorator";
// import { scrollFy } from "../utils/decorators";

@Component({
  components: { ...getAllComponents() }
})
// @scrollFy
export default class List extends Vue {
  @Prop(Array) public datasource;

  onReachBottom() {
    console.log("END");
  }
}

// props: ["datasource"],
// components: {
//   ...getAllComponents()
// }
</script>

<style></style>
