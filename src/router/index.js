import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // component: () => import('../components/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HelloWorld.vue')
    }
  ]
})

export default router
