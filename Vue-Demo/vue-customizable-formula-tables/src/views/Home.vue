<template>
  <div class="home">
    <my-table></my-table>
  </div>
</template>

<script>
// @ is an alias to /src
import MyTable from './MyTable.vue'

export default {
  name: 'Home',
  components: {
    MyTable
  }
}
</script>
