<!--
 * @Description:  添加日志页
 * @Author: LuckRain7
 * @Date: 2020-04-03 12:01:03
 -->
<template>
  <div class="handleBox">
    <div class="header">
      <router-link
        :to="{
          path: '/home',
          query: { time: $route.query.time },
        }"
        class="return"
      >
      </router-link>
      <h3>日志管理</h3>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="info">
        <span>日志标题：</span>
        <div class="inp">
          <input type="text" v-model="data.title" />
        </div>
      </div>
      <div class="info">
        <span>日志内容:</span>

        <div class="inp">
          <textarea v-model="data.content" />
        </div>
      </div>
      <br />
      <a @click="addData" class="submit">新增</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    }
  },
  methods: {
    addData() {
      const time = this.$route.query.time
      const res = this.$storage.set(time, this.data.title, this.data.content)
      if (res) {
        alert('添加成功')
        this.$router.push({
          path: '/home',
          query: { time: time },
        })
      }
    },
  },
}
</script>

<style></style>
