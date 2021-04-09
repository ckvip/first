import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NameList from '@/views/names/NameList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/names',
    name: 'Names',
    component: NameList
  },
  {
    path: '/',
    name: 'Names',
    component: NameList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    redirect: '/homes'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
