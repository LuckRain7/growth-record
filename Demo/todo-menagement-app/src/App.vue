<!--
 * @Description:  
 * @Author: LuckRain7
 * @Date: 2020-04-03 11:44:15
 -->
<template>
  <div id="app">
    <transition name="handle">
      <router-view />
    </transition>
  </div>
</template>

<style lang="less">
.handle-enter-active,
.handle-leave-active {
  transition: opacity 0.3s;
}

.handle-enter,
.handle-leave-to {
  opacity: 0;
}
.handle-enter-to,
.handle-leave {
  opacity: 1;
}
</style>
