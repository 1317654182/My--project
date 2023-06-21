import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'DailyOffice',
        name: 'DailyOffice',
        component: () => import('../views/HomeList/DailyOffice.vue')
      },
      {
        path: 'AssetCenter',
        name: 'AssetCenter',
        component: () => import('../views/HomeList/AssetCenter.vue'),
        children: [
          {
            path: '/dialog',
            name: 'dialog',
            component: () => import('../views/dialog/dialog.vue')
          }
        ]
      },
      {
        path: 'Reception',
        name: 'Reception',
        component: () => import('../views/HomeList/Reception.vue')
      },
      {
        path: 'Management',
        name: 'Management',
        component: () => import('../views/HomeList/Management.vue')
      },
    ]
  },
  {
    path: '/ViewApplication',
    name: 'ViewApplication',
    component: () => import('../components/ViewApplication/ViewApplication.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router