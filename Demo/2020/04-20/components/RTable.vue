<!--
 * @Description: 表格组件
 * @Author: LuckRain7
 * @Date: 2020-04-20 16:53:08
 -->
<template>
  <div class="table-wrapper">
    <table class="table" :class="{ border, stripe }">
      <!-- 表头 -->
      <thead>
        <tr>
          <th style="width:50px;"><input type="checkbox" /></th>
          <th v-for="column in columns" :key="column.key">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <!-- 表体 -->
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td><input type="checkbox" /></td>
          <td>{{ row.name }}</td>
          <td>{{ row.age }}</td>
          <td>{{ row.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示全边框
    border: {
      type: Boolean,
      default: false,
    },
    // 是否显示斑马纹
    stripe: {
      type: Boolean,
      default: false,
    },

    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.table-wrapper {
  width: 80%;
  margin: 0 auto;

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    &.border {
      border: 1px solid #ccc;
      th,
      td {
        border: 1px solid #ccc;
      }
    }

    &.stripe {
      tbody {
        tr:nth-child(even) {
          background: #eee;
        }
      }
    }
    th {
      background-color: #eee;
    }
    th,
    td {
      border-bottom: 1px solid #ccc;
      padding: 5px;
      text-align: left;
    }
  }
}
</style>
