<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-12 19:30:51
 -->
<template>
  <div class="Select">
    <input type="text" :value="val" />
    <ul>
      <li
        v-for="(item, index) in data"
        :class="[
          {
            active: activeNum === index ? true : false
          }
        ]"
        @mouseover="changeActive(index)"
        @click="changeValueEmit(item.text)"
        :key="index"
      >
        <span>{{ item.text }}</span>
      </li>
    </ul>
    {{ watchActiveNum() }}
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit, Watch } from "vue-property-decorator";

interface Data {
  id: number;
  text: string;
}

@Component
export default class Select extends Vue {
  @Prop(Array) public data!: Data[];
  @Prop(String) public val!: string;

  private activeNum = 0;

  private changeActive(num: number): void {
    this.activeNum = num;
  }

  @Emit("changeValue")
  private changeValueEmit(val: string): void {
    /*
    this.$emit('changeValue',value)
     */
  }

  @Watch("activeNum", { deep: true, immediate: true })
  watchActiveNum(): string {
    return this.activeNum < 10 ? "0" + this.activeNum : "" + this.activeNum;
  }

  mounted() {
    console.log(this.data);
  }
}
</script>

<style scoped>
ul,
li {
  list-style: none;
}
.active {
  color: aquamarine;
}
</style>
