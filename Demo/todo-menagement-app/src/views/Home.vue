<!--
 * @Description:  日志首页
 * @Author: LuckRain7
 * @Date: 2020-04-03 11:44:15
 -->
<template>
  <div class="homeBox">
    <div ref="calendar">
      <calendar
        :markDate="mark"
        @changeMonth="changeMonth"
        @choseDay="choseDay"
      >
      </calendar>
    </div>

    <!-- 日志列表 -->
    <div class="recordBox" ref="record" style="height: 527px;">
      <div class="tip" v-if="list.length === 0"></div>
      <div class="infoBox" v-else>
        <ul class="list">
          <li class="item" v-for="item in list" :key="item.id">
            <router-link
              :to="{ path: '/handle', query: { thime: mark[0], id: item.id } }"
            >
              <i></i>
              <span>{{ item.time }}</span>
              <div class="con">
                <h3>{{ item.title }}</h3>
                <p>{{ item.content }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 新增按钮 -->
    <router-link
      class="addBtn"
      :to="{ path: '/handle', query: { time: mark[0] } }"
    >
    </router-link>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component'
export default {
  name: 'Home',
  data() {
    return {
      mark: [],
      list: [],
    }
  },
  components: {
    Calendar,
  },

  methods: {
    // 计算 record 的高度
    computedRecordHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer)
        this.$refs.record.style.height =
          document.documentElement.clientHeight -
          this.$refs.calendar.offsetHeight +
          'px'
      }, 10)
    },
    // 日期切换
    changeMonth() {
      this.computedRecordHeight()
    },
    // 选择日期
    choseDay(time) {
      this.mark = [this.$storage.formatTime(time)]
      this.initData()
    },
    // 获取数据
    initData() {
      let time = this.mark[0]

      this.list = this.$storage.get(time) || []
    },
  },
  created() {
    // 获取当前时间传入
    this.mark = [this.$storage.formatData(new Date())]

    let time = this.$route.query.time

    if (time) {
      //解码 将转义后的字段转义回来
      this.mark = [decodeURIComponent(time)]
    }

    this.initData()
  },
}
</script>

// 01 28 01
