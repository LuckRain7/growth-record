<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-09 10:25:30
 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="go" />
    <image-cropper :isVisible.sync="isVisible"></image-cropper>
  </div>
</template>

<script>
import ImageCropper from "./lib/vue-image-cropper/vue-image-cropper.vue";
export default {
  name: "App",
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    go() {
      this.isVisible = !this.isVisible;
    },
  },
  components: { ImageCropper },
};
</script>

<style lang="less"></style>
