import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('@/views/Demo.vue') },
  { path: '/hello', component: () => import('@/components/HelloWorld.vue') },
  { path: '/:path(.*)', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory('/cherry-ui/'),
  routes,
})

export default router
