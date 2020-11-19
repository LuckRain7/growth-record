import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Demo1',
    name: 'Demo1',
    component: () =>
      import(/* webpackChunkName: "Demo1" */ '@/views/Demo1.vue'),
  },
  {
    path: '/Demo2',
    name: 'Demo2',
    component: () =>
      import(/* webpackChunkName: "Demo2" */ '@/views/Demo2.vue'),
  },
  {
    path: '/InitDemo',
    name: 'InitDemo',
    component: () =>
      import(/* webpackChunkName: "InitDemo" */ '@/views/InitDemo.vue'),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(' --- to --- ', to)
  console.log(' --- from --- ', from)

  if (to.path == '/Demo2') {
    next('/InitDemo')
  } else {
    next()
  }
})

export default router
