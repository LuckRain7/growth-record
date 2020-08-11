<template>
  <div id="app">
    <el-menu :router="true" mode="horizontal">
      <!-- 基座中刻意放自己的路由， -->
      <el-menu-item index="/">Home</el-menu-item>
      <!-- 引用其他子应用 -->
      <el-menu-item index="/vue">Vue App</el-menu-item>
      <el-menu-item index="/react">React App</el-menu-item>
    </el-menu>

    <router-view></router-view>

    <!-- 创建div 用于挂载子应用 -->
    <div id="vue"></div>
    <div id="react"></div>
  </div>
</template>
