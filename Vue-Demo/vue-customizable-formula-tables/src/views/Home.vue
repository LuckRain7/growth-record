<template>
  <div class="home">
    <my-table></my-table>
    <my-tabs></my-tabs>
    <Basic></Basic>
  </div>
</template>

<script>
// @ is an alias to /src
import MyTable from './MyTable.vue'

import MyTabs from './MyTabs.vue'

import Basic from './basic.vue'

export default {
  name: 'Home',
  components: {
    MyTable,
    MyTabs,
    Basic
  }
}
</script>
