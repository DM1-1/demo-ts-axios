import Login from '../views/Login.vue'

import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/Welcome.vue')
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // check身份在执行操作前
  if(to.path === '/login') {
    next()
  } else {
    const token = window.localStorage.getItem('token')
    if(token === null || token !== 'Token') {
      alert('请登录')
      next('/login')
    } else {
      next()
    }
  }
})
 
export default router