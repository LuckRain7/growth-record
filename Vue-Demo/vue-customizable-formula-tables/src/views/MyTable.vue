<!--
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-07-15
 * @Description  : vue-customizable-formula-tables 可自定义计算公式表格
 * @ Love and Peace
-->

/*eslint no-unused-vars: "off"*/

<template>
  <div class="table-div">
    <div style="width: 700px;">
      添加字段
      <a-input
        addon-before="字段名"
        placeholder="Basic usage"
        v-model="addNewField.title"
      />
      <a-input
        addon-before="字段标识"
        placeholder="Basic usage"
        v-model="addNewField.dataIndex"
      />
      <a-button @click="addNewFieldHandle">
        添加字段
      </a-button>
    </div>
    <br /><br />
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
      addNewField: {
        title: '',
        dataIndex: '',
      },
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

    /**
     * @description: 判断是否是全英文
     * @param {String} val
     * @return: Boolean
     */

    isAllEnglish(val) {
      let re = new RegExp('^[a-zA-Z]+$')
      if (re.test(val)) {
        return true
      } else {
        return false
      }
    },

    isOneOfColumns(val) {
      let result = true
      this.columns.forEach(item => {
        if (item.dataIndex == val) {
          result = false
        }
      })
      return result
    },

    // 添加字段
    addNewFieldHandle() {
      // * 进行重复 dataIndex 的检测（全英文检测 ✔️ | 唯一性检测 ✔️ ）
      const addNewField = this.addNewField

      // 1、对 dataIndex 进行 全英文检测
      if (this.isAllEnglish(addNewField.dataIndex)) {
        // ✅
        // 进行对象深拷贝（基于JSON方案）  解决提示重复问题
        const newField = JSON.parse(JSON.stringify(addNewField))
        const length = this.columns.length

        // 2、对唯一性进行检测
        if (this.isOneOfColumns(addNewField.dataIndex)) {
          //  唯一性 ✅
          console.log('唯一标识')

          this.columns.splice(length - 1, 0, newField) // 插入表头数据(总金额前一个位置)

          // 在表内添加字段 及 初始化数据
          this.data.forEach(item => {
            item[newField.dataIndex] = 0
          })
        } else {
          //  唯一性 ：
          this.$message.error('发现字段标识出现重复，请重新填写')
        }
      } else {
        // 不是全英文 提示重新填写
        this.$message.error('字段标识 请输入全英文字符')
      }
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

        // formula.replace('被替换值','替换值')
        // /苹果数量/g// 
        // /苹果单价/g

        formula = formula.replace(re, 'item.' + columnsMap[key])
      }

      console.log(formula)

      // 3、eval 执行拼接好的  item.money=item.appleMoney*item.appleNums+item.bananaMoney*item.bananaNums

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
