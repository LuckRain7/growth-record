<!--
 * @Author       : 震雨 LuckRain7
 * @Date         : 2020-11-17 16:49:31
 * @LastEditTime : 2020-11-18 10:17:44
 * @Description  : 多字典 翻译问题
 * @ 0 Error 0 Warning 0 Bug | Love and Peace
-->
<template>
  <div style="width: 700px; margin: auto auto">
    <a-table :columns="columns" :data-source="data">
      <span slot="stage_id" slot-scope="text">{{
        StageTranslation(text)
      }}</span>

      <span slot="type_id" slot-scope="text">{{ TypeTranslation(text) }}</span>

      <span slot="action" slot-scope="text, record">
        <a @click="editRenderDataHandle(record)"> 编辑</a>
        <a-divider type="vertical" />
        <a>Delete</a>
      </span>
    </a-table>
    <!-- 

    -->
    <a-modal
      title="编辑"
      :visible="visible"
      @ok="editMoadlOk"
      @cancel="editMoadlCancel"
    >
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <!--  -->
        <a-form-item label="菌棒规格">
          <a-select
            @change="
              (value) => {
                handleSelectChange(editRenderData, value, 'type_id');
              }
            "
            v-model="editRenderData.type_txt"
          >
            <template v-for="item in dictionaryType.select">
              <a-select-option :value="item.value" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
        <!--  -->
        <a-form-item label="菌棒时期">
          <a-select
            @change="
              (value) => {
                handleSelectChange(editRenderData, value, 'stage_id');
              }
            "
            v-model="editRenderData.stage_txt"
          >
            <template v-for="item in dictionaryStage.select">
              <a-select-option :value="item.value" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
        <!--  -->
        <a-form-item label="菌棒数量">
          <a-input v-model="editRenderData.num" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import axios from "axios";
const columns = [
  {
    title: "菌棒规格",
    dataIndex: "type_id",
    key: "type_id",
    scopedSlots: { customRender: "type_id" },
  },
  {
    title: "菌棒时期",
    dataIndex: "stage_id",
    key: "stage_id",
    scopedSlots: { customRender: "stage_id" },
  },
  {
    title: "菌棒数量",
    dataIndex: "num",
    key: "num",
  },

  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data() {
    return {
      data: [],
      columns,
      visible: false,
      editRenderData: {},
      dictionaryStage: {},
      dictionaryType: {},
    };
  },

  computed: {},

  mounted() {
    this.getDictionaryStage();
    this.getDictionaryType();
    this.$nextTick(() => {
      this.getRenderData();
    });
  },
  methods: {
    TypeTranslation: function (val) {
      console.log(" ---  TypeTranslation--- ");
      return this.dictionaryType.bidirectionalDictionary[val];
    },

    StageTranslation: function (val) {
      return this.dictionaryStage.bidirectionalDictionary[val];
    },
    // 获取 菌棒时期 字典表
    getDictionaryStage() {
      axios.get("/DictionaryStage.json").then((res) => {
        const data = res.data;
        let dictionaryStage = {};

        dictionaryStage.select = [];
        dictionaryStage.bidirectionalDictionary = [];

        // 进行 字段 和 点选 数据处理
        data.forEach((item) => {
          dictionaryStage.select.push({
            value: item.stage_id,
            text: item.stage_name,
          });
          dictionaryStage.bidirectionalDictionary[item.stage_id] =
            item.stage_name;
          dictionaryStage.bidirectionalDictionary[item.stage_name] =
            item.stage_id;
        });

        this.dictionaryStage = dictionaryStage;

        console.log(" --- getDictionaryType res --- ", data);
        console.log(" --- dictionaryStage --- ", dictionaryStage);
      });
    },

    // 获取 菌棒类型 字典表
    getDictionaryType() {
      axios.get("/DictionaryType.json").then((res) => {
        const data = res.data;

        let dictionaryType = {};

        dictionaryType.select = [];
        dictionaryType.bidirectionalDictionary = [];

        // 进行 字段 和 点选 数据处理
        data.forEach((item) => {
          dictionaryType.select.push({
            value: item.type_id,
            text: item.type_name,
          });
          dictionaryType.bidirectionalDictionary[item.type_id] = item.type_name;
          dictionaryType.bidirectionalDictionary[item.type_name] = item.type_id;
        });

        this.dictionaryType = dictionaryType;

        console.log(" --- getDictionaryType res --- ", data);
      });
    },

    // 获取 渲染数据
    getRenderData() {
      axios.get("/data.json").then((res) => {
        const data = res.data;
        this.data = data;
        console.log(" --- getRenderData res --- ", data);
      });
    },

    // 编辑
    editRenderDataHandle(_date) {
      this.visible = true;
      this.editRenderData = _date;
      console.log(" --- this.editRenderData --- ", this.editRenderData);
    },

    editMoadlOk() {
      const _date = this.editRenderData;

      const options = {
        id: _date.key,
        stage: _date.stage_id,
        type: _date.type_id,
        num:_date.num,
      };
      this.$message.success(JSON.stringify(options));
    },

    editMoadlCancel() {
      this.visible = false;
    },

    handleSelectChange(obj, value, key) {
      console.log(" --- obj --- ", obj);
      console.log(" --- value --- ", value);
      obj[key] = value;
    },
  },
};
</script>