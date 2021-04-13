import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NameList from '@/views/names/NameList.vue'
import NamingRuleList from '@/views/naming-rules/NamingRuleList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/names',
    name: 'Names',
    component: NameList
  },
  {
    path: '/naming-rules',
    name: 'Naming Rules',
    component: NamingRuleList
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
    redirect: '/names'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export const availableRoutes = routes.filter(x => x.name)
export default router
