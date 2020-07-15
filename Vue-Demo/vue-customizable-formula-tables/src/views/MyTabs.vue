<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane :key="index" :tab="item.c" v-for="(item, index) in tabs">
        Content of Tab Pane 1
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
// 映射表
const tabsMap = {}
console.log(tabsMap)

export default {
  data() {
    return {
      tabs: [],
    }
  },
  methods: {
    callback(key) {
      const trueKey = key
      console.log(this.tabs[key].c)
    },
  },
  mounted() {
    const tabs = [
      { a: 1, b: 2, c: '北海道' },
      { a: 3, b: 4, c: '横滨' },
      { a: 3, b: 4, c: '东京' },
      { a: 3, b: 4, c: '名古屋' },
    ]
    this.tabs = tabs
  },
}
</script>
