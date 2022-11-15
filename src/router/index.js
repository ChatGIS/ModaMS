import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: layout,
    redirect: '/website',
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'website',
        name: 'website',
        component: () => import('@/views/website/index.vue')
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/article/index.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/index.vue')
      },
      {
        path: 'params',
        name: 'params',
        component: () => import('@/views/params/index.vue')
      },
      {
        path: 'dashbord',
        name: 'dashbord',
        component: () => import('@/views/dashbord/index.vue')
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/rights/index.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
