import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/11',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/LocalSearch:data?',
      name: 'LocalSearch',
      component: () => import('../components/HelloWorld.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/Home.vue')
    }
  ]
})

export default router
