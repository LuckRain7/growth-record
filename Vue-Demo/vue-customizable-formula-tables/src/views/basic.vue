<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template slot="title" slot-scope="currentPageData">
      添加<a-button @click="add">add</a-button>
    </template>

    <template slot="footer" slot-scope="currentPageData">
      定义公式
      <a-input-search
        placeholder="input search text"
        enter-button="添加公式"
        size="large"
        @search="onSearch"
      />

      {{ gongShi }}
    </template>
  </a-table>
</template>
<script>
// 定义表头数组
const columns = [
  {
    title: '苹果单价', // 数据名
    dataIndex: 'appleMoney', // 数据 变量名
  },
  {
    title: '苹果数量',
    dataIndex: 'appleNums',
  },
  {
    title: '香蕉单价', // 数据名
    dataIndex: 'bananaMoney', // 数据 变量名
  },
  {
    title: '香蕉数量',
    dataIndex: 'bananaNums',
  },
  {
    title: '总数',
    dataIndex: 'sum',
  },
]

const data = [
  {
    key: '1',
    appleMoney: 10,
    appleNums: 2,
    bananaMoney: 11,
    bananaNums: 6,
    sum: null,
  },
]

export default {
  data() {
    return {
      data,
      columns,
      gongShi: '总数=苹果单价*苹果数量+香蕉单价*香蕉数量',
    }
  },
  methods: {
    add() {
      // TODO 涉及到一个 dataIndex 的唯一问题
      this.columns.push({
        title: 'new1',
        dataIndex: 'new1',
      })
    },
    onSearch(val) {
      let gongshi = val
      this.gongShi = gongshi

      // 公式替换  中文 => 英文
      // []=>  键值对
      //   const a = {
      //     总数: 'sum',
      //   }
      const columns = this.columns
      let columnsMap = {}

      columns.forEach(item => {
        columnsMap[item.title] = item.dataIndex
      })

      eval('consol.log(1)')
    },
  },
}
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
