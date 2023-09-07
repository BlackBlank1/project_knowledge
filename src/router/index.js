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
      path: '/DocPreview',
      name: 'DocPreview',
      component: () => import('../views/Preview/DocPreview.vue')
    },
    {
      path: '/FilePreview',
      name: 'FilePreview',
      component: () => import('../views/Preview/FilePreview.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../components/MainPage/MainPage_Preview/Doc_MainPage_Preview.vue')
    },
    {
      path: '/Doc_MainPage',
      name: 'Doc_MainPage',
      component: () => import('../views/MainPage/Doc_MainPage.vue'),
      redirect:'/MainPage_Default',
      children:[
        {
          path: '/Main_Search',
          name: 'Main_Search',
          component: () => import('../components/MainPage/MainPage_Search/Doc_MainPage_Search.vue')
        },
        {
          path: '/MainPage_Default',
          name: 'MainPage_Default',
          component: () => import('../components/MainPage/Default/Doc_MainPage_Default.vue')
        },
        {
          path: '/Doc_MainPage_Preview',
          name: 'Doc_MainPage_Preview',
          component: () => import('../components/MainPage/MainPage_Preview/Doc_MainPage_Preview.vue')
        },
      ]
    },
    {
      path: '/File_MainPage',
      name: 'File_MainPage',
      component: () => import('../views/MainPage/File_MainPage.vue'),
      redirect:'/FileMainPage_Default',
      children:[
        {
          path: '/File_MainPage_Search',
          name: 'File_MainPage_Search',
          component: () => import('../components/MainPage/MainPage_Search/File_MainPage_Search.vue')
        },
        {
          path: '/FileMainPage_Default',
          name: 'FileMainPage_Default',
          component: () => import('../components/MainPage/Default/FileMainPage_Default.vue')
        },
        {
          path: '/File_MainPage_Preview',
          name: 'File_MainPage_Preview',
          component: () => import('../components/MainPage/MainPage_Preview/File_MainPage_Preview.vue')
        },
      ]
    }
  ]
})

export default router
