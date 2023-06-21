import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        //默认进入组件
        redirect: '/NewVisitorRecord',
        children: [
            {
                path: '/NewVisitorRecord',
                name: 'NewVisitorRecord',
                component: () => import('../views/HomeList/NewVisitorRecord.vue'),
            },
            {
                path: '/WaitingCustomer',
                name: 'WaitingCustomer',
                component: () => import('../views/HomeList/WaitingCustomer.vue'),
            },
            {
                path: '/ReceivedCustomers',
                name: 'ReceivedCustomers',
                component: () => import('../views/HomeList/ReceivedCustomers.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router