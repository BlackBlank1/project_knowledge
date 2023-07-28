import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/BackStage',
      name: 'BackStage',
      component: () => import('../components/BackStage.vue')
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../components/Home.vue')
    }
  ]
})

export default router
