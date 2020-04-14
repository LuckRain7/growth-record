<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-13 17:33:29
 -->
<template>
  <section>
    <div>[1图]的模板 {{ item.title }}</div>
    <img :src="item.imageList[0]" />
    <!-- <div @click="closeAction">x</div> -->
  </section>
</template>

<script lang='ts'>

import { Vue, Prop, Component } from "vue-property-decorator";
import { itemFy } from "../../utils/decorators";

@Component
@itemFy
export default class onePic extends Vue {
  @Prop(Object) item: object;

  // closeAction() {
  //   console.log("closeAction");
  // }
}

// export default {
//   props: ["item"],

//   methods: {
//     closeAction() {
//       console.log("closeAction");
//     }
//   }
// };
</script>

<style></style>
