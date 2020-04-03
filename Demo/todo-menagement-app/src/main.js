/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-03 11:44:15
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/basic.less'
import storage from './libs/storage'

Vue.config.productionTip = false
Vue.prototype.$storage = storage

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
