/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-03 11:44:15
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Handle from '../views/Handle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/handle',
    name: 'Handle',
    component: Handle,
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  routes,
})

export default router
