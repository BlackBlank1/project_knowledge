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
      path: '/',
      name: 'Manager',
      component: () => import('../views/Manager.vue'),
      redirect:"/UserManager",
      children:[
        {
          path: '/UserManager',
          name: 'UserManager',
          component: () => import('../components/Manager/UserManager.vue')
        },
        {
          path: '/FileManager',
          name: 'FileManager',
          component: () => import('../components/Manager/FileManager.vue')
        },
        {
          path: '/DocManager',
          name: 'DocManager',
          component: () => import('../components/Manager/DocManager.vue')
        },
      ]
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/DocQ&A',
      name: 'DocQ&A',
      component: () => import('../views/Q&A/DocQ&A.vue')
    },
    {
      path: '/FileQ&A',
      name: 'FileQ&A',
      component: () => import('../views/Q&A/FileQ&A.vue')
    },
    {
      path: '/Preview',
      name: 'Preview',
      component: () => import('../views/Preview.vue')
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: () => import('../views/MainPage.vue'),
      redirect:'/MainPage_Default',
      children:[
        {
          path: '/Main_Search',
          name: 'Main_Search',
          component: () => import('../components/MainPage/Main_Search.vue')
        },
        {
          path: '/MainPage_Default',
          name: 'MainPage_Default',
          component: () => import('../components/MainPage/MainPage_Default.vue')
        },
      ]
    }
  ]
})

export default router
