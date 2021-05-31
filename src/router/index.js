import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home/welcome',
  },
  {
    path: '/home',
    component: Home,
    meta: { title: 'welcome' },
    children: [
      {
        path: 'welcome',
        component: () => import('/@/components/welcome.vue'),
        meta: { title: 'welcome' }
      },
      {
        path: 'helloWorld',
        component: () => import('../views/HelloWorld/HelloWorld.vue'),
        meta: { title: 'helloWorld' }
      }
    ]
  },
  {
    path: '/401',
    name: '401',
    component: () => import('../views/ErrorPage/401.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/ErrorPage/404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
