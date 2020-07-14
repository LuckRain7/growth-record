<template>
  <div class="hello">
    <table border="1">
      <tr>
        <td>招聘职位</td>
        <td>招聘人数</td>
        <td>状态</td>
      </tr>
      <tr v-for="(item, index) in renderData" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.num }}</td>
        <td :class="item.status | setRenderData | setRenderDataStyle">
          {{ item.status | setRenderData }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import myData from './Data.js'
import order from './order.js'
export default {
  name: 'HelloWorld',
  filters: order,
  data() {
    return {
      renderData: myData,
    }
  },
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 300px;
  margin: 50px auto;
  border-collapse: collapse;
  text-align: center;
}
.status-red {
  color: red;
}
.status-blue {
  color: blue;
}
.status-yellow {
  color: yellow;
}
</style>
