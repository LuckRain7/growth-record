<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />、
    <h2>Vue 自定义指令</h2>
    <button type="text" v-debounce="hello">Hello</button>
    <br>
    <input type="text" v-bank-card-num v-model="cardNum" style="width:300px"/>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      cardNum: "",
    };
  },

  methods: {
    hello() {
      console.log("hello wolrd", this.cardNum);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
