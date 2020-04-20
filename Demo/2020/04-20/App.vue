<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-20 16:41:10
 -->
<template>
  <div>
    <r-table :columns="columns1" :data="data1" stripe></r-table>
  </div>
</template>

<script>
import RTable from "./components/RTable.vue";
export default {
  components: {
    RTable,
  },
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Address",
          key: "address",
        },
      ],
      data1: [
        {
          id: 1,
          name: "john brown",
          age: 14,
          address: "new york no.1",
          data: "2016-10-03",
        },

        {
          id: 1,
          name: "john brown",
          age: 14,
          address: "new york no.1",
          data: "2016-10-03",
        },
        {
          id: 2,
          name: "john brown",
          age: 14,
          address: "new york no.1",
          data: "2016-10-03",
        },
        {
          id: 3,
          name: "john brown",
          age: 14,
          address: "new york no.1",
          data: "2016-10-03",
        },
        {
          id: 4,
          name: "john brown",
          age: 14,
          address: "new york no.1",
          data: "2016-10-03",
        },
        {
          id: 5,
          name: "john brown",
          age: 14,
          address: "new york no.1",
          data: "2016-10-03",
        },
      ],
    };
  },
};
</script>

<style></style>
