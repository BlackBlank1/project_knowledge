import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/BackStage',
      name: 'BackStage',
      component: () => import('../views/BackStage.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/AIQ&A.vue')
    },
    {
      path: '/',
      name: 'Preview',
      component: () => import('../components/Preview.vue')
    }
  ]
})

export default router
