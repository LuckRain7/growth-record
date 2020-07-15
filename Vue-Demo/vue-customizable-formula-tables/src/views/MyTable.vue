/*eslint no-unused-vars: "off"*/

<template>
  <div class="table-div">
    <a-table :columns="columns" :data-source="data" bordered class="my-table">
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
      <template slot="title" slot-scope="currentPageData">
        计算公式：
        <a-input-search
          placeholder="input search text"
          refs="formula"
          @search="formulaHandleChange"
        >
          <a-button slot="enterButton">
            添加公式
          </a-button>
        </a-input-search>
        {{ formula }}
      </template>
      <template slot="footer" slot-scope="currentPageData">
        <a-button @click="GOGO">计算</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: '人数',
    dataIndex: 'peopleNums',
  },
  {
    title: '苹果单价',
    className: 'column-money',
    dataIndex: 'appleMoney',
  },
  {
    title: '苹果数量',
    dataIndex: 'appleNums',
  },
  {
    title: '香蕉单价',
    className: 'column-money',
    dataIndex: 'bananaMoney',
  },
  {
    title: '香蕉数量',
    dataIndex: 'bananaNums',
  },
  {
    title: '总钱数',
    dataIndex: 'money',
  },
]

const data = [
  {
    key: '1',
    peopleNums: 8,
    appleMoney: 10,
    appleNums: 2,
    bananaMoney: 11,
    bananaNums: 6,
    money: null,
  },
]

export default {
  data() {
    return {
      data,
      columns,
      formula: '总钱数=苹果单价*苹果数量+香蕉单价*香蕉数量',
    }
  },
  methods: {
    // 实现表格新增字段
    add() {
      this.columns.push({})
    },
    formulaHandleChange(val) {
      console.log('添加公式')
      this.formula = val
    },
    // 实现公式的计算
    GOGO() {
      // 1、拿到公式 字段对应表

      let formula = this.formula,
        columns = this.columns,
        columnsMap = {}

      // 1.1 针对地段表进行格式化 键值对形式

      columns.forEach(item => {
        columnsMap[item.title] = item.dataIndex
      })

      // 2、进行 中文与英文字段之间的转换
      // 总钱数=苹果单价*苹果数量+香蕉单价*香蕉数量
      // =>  item.money=item.appleMoney*item.appleNums+item.bananaMoney*item.bananaNums

      for (let key in columnsMap) {
        let re = null
        eval('re = /' + key + '/g')

        formula = formula.replace(re, 'item.' + columnsMap[key])
      }

      console.log(formula)

      // 3、eval 执行

      data.forEach(item => {
        eval(formula)
      })

    },
  },
}
</script>
<style lang="less">
.table-div {
  width: 1000px;
  margin: 10px auto;
}
.my-table {
  width: 700px;
  th,
  td {
    text-align: center !important;
  }
}
</style>
