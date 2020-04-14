<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-13 17:33:08
 -->
<template>
  <section>
    <div>[没有图]的模板 {{ item.title }}</div>
    <!-- <div @click="closeAction">x</div> -->
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { itemFy } from "../../utils/decorators";

@Component
@itemFy
export default class noPic extends Vue {
  @Prop(Object) item: object;

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
