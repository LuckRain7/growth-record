<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-09 10:25:30
 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" @click="go" />
    <image-cropper
      :isVisible.sync="isVisible"
      model="fromData"
      @transmitImageData="transmitImageData"
    ></image-cropper>
  </div>
</template>

<script>
import ImageCropper from "vue-image-cropper-simple";
export default {
  name: "App",
  data() {
    return {
      isVisible: true
    };
  },
  methods: {
    go() {
      this.isVisible = !this.isVisible;
    },
    transmitImageData(e) {
      console.log(e);
    }
  },
  components: { ImageCropper }
};
</script>

<style lang="less"></style>
