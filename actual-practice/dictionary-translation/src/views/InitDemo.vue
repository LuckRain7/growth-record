<!--
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-11-17 16:49:31
 * @LastEditTime : 2020-11-19 21:49:42
 * @Description  : 过滤器组件
 * @ 0 Error 0 Warning 0 Bug | Love and Peace
-->
<template>
  <div>
    <a-table :columns="columns" :data-source="renderData">
      <a slot="type" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="action" slot-scope="text, record">
        <a @click="openEditModal(record)"> 编辑</a>
        <a-divider type="vertical" />
        <a>Delete</a>
      </span>
    </a-table>

    <a-modal
      title="编辑"
      :visible="visible"
      @ok="editMoadlOk"
      @cancel="editMoadlCancel"
    >
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="菌棒规格">
          <a-select @change="handleSelectChange" v-model="editData.type_txt">
            <template v-for="item in dictionaryType.select">
              <a-select-option :value="item.text" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item label="菌棒时期">
          <a-select @change="handleSelectChange" v-model="editData.stage_txt">
            <template v-for="item in dictionaryStage.select">
              <a-select-option :value="item.text" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item label="菌棒数量">
          <a-input v-model="editData.num" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from 'axios'
const columns = [
  {
    title: '菌棒规格',
    dataIndex: 'type_txt',
    key: 'type_txt',
    scopedSlots: { customRender: 'type_txt' },
  },
  {
    title: '菌棒时期',
    dataIndex: 'stage_txt',
    key: 'stage_txt',
    scopedSlots: { customRender: 'stage_txt' },
  },
  {
    title: '菌棒数量',
    dataIndex: 'num',
    key: 'num',
  },

  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
]

export default {
  data() {
    return {
      renderData: [],
      columns,
      visible: false,
      editData: {},
      dictionaryType: {},
      dictionaryStage: {},
    }
  },

  mounted() {
    this.getDictionaryStage()
    this.getDictionaryType()
    this.getRenderData()
  },

  methods: {
    // 菌棒规格
    TypeTranslation(_val) {
      return this.dictionaryType.bidirectionalDictionary[_val]
    },

    StageTranslation: function (_val) {
      return this.dictionaryStage.bidirectionalDictionary[_val]
    },

    // 获取菌棒规格字典
    getDictionaryType() {
      axios.get('/DictionaryType.json').then((res) => {
        const data = res.data
        // console.log(' --- data --- ', data)
        // {type_name: "大棒", type_id: "0"}
        // 1: {type_name: "中棒", type_id: "1"}
        // 2: {type_name: "小棒", type_id: "2"}

        // 第一个需要制作的就是  select下拉选择框
        // 第二需要制作的是  制作一个双向字典

        let dictionaryType = {}
        let bidirectionalDictionary = {}

        dictionaryType.select = data.map((item) => {
          // 2、双向的字典
          bidirectionalDictionary[item.type_id] = item.type_name
          bidirectionalDictionary[item.type_name] = item.type_id
          // 1、select下拉选择框
          return {
            id: item.type_id,
            text: item.type_name,
            value: item.type_name,
          }
        })

        dictionaryType.bidirectionalDictionary = bidirectionalDictionary

        this.dictionaryType = dictionaryType

        // console.log(' ---  dictionaryType --- ', dictionaryType)
      })
    },

    // 获取 菌棒时期 字典表
    getDictionaryStage() {
      axios.get('/DictionaryStage.json').then((res) => {
        const data = res.data
        let dictionaryStage = {}

        dictionaryStage.select = []
        dictionaryStage.bidirectionalDictionary = []

        // 进行 字段 和 点选 数据处理
        data.forEach((item) => {
          dictionaryStage.select.push({
            value: item.stage_name,
            text: item.stage_name,
          })
          dictionaryStage.bidirectionalDictionary[item.stage_id] =
            item.stage_name
          dictionaryStage.bidirectionalDictionary[item.stage_name] =
            item.stage_id
        })

        this.dictionaryStage = dictionaryStage

        // console.log(' --- getDictionaryType res --- ', data)
        // console.log(' --- dictionaryStage --- ', dictionaryStage)
      })
    },

    openEditModal(record) {
      this.visible = true
      // 因为 对象存在指针， this.editData  record 指向的是同一个内存地址
      // 解决方案就是  对象的深拷贝

      this.editData = JSON.parse(JSON.stringify(record))
    },

    getRenderData() {
      axios.get('/data.json').then((res) => {
        let data = res.data
        for (let i = 4; i < 50; i++) {
          data.push({
            key: i,
            type_id: 1,
            type_txt: '中棒  '+i,
            stage_id: 1,
            stage_txt: '二潮',
            num: 200,
          })
        }

        //  pageNo控制页数
        //  pageSize 是控制每次请求的数据数量

        //  pageSize=1000

        // 100

        // 2 5  6
        // 2 10  11

         this.renderData = data
      })
    },

    editMoadlOk() {
      // console.log(' --- this.editData --- ', this.editData)

      const editData = this.editData

      let options = {
        id: editData.key,
        stage: this.StageTranslation(editData.stage_txt),
        type: this.TypeTranslation(editData.type_txt),
        num: editData.num,
      }

      this.$message.success(JSON.stringify(options))
    },

    editMoadlCancel() {
      this.visible = false
    },

    handleSelectChange() {},
  },
}
</script>
