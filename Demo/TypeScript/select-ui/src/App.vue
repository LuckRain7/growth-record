<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-12 19:16:09
 -->
<template>
  <div id="app">
    <Select :data="options" :val="val" @changeValue="changeParValue"></Select>
  </div>
</template>

<script lang="ts">
// Component 装饰器
import { Vue, Component } from "vue-property-decorator";
import Select from "./components/Select.vue";
interface Data {
  id: number;
  text: string;
}

// 装饰器
@Component({
  components: {
    Select
  }
})
export default class App extends Vue {
  private val = "tom";
  private options: Data[] = [
    {
      id: 0,
      text: "tom"
    },
    {
      id: 1,
      text: "jerry"
    },
    {
      id: 2,
      text: "rain"
    }
  ];

  private changeParValue(value: string): void {
    console.log(1);

    this.val = value;
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
