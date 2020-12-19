import Vue from "vue";
import App from "./App.vue";
import Directives from "@/Directives/index.js";

// 自定义指令 注册
Object.keys(Directives).forEach((key) => {
  Vue.directive(key, Directives[key]);
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
