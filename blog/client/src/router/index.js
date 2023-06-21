// 路由配置
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/Login',
        component: () => import('../views/Login.vue'),
        meta:{title:'后台登录'} 
    },
    {
        path: '/',
        component: () => import('../views/HomePage.vue'),
        meta:{title:'首页'} 
    },
    {
        path: '/detail',
        component: () => import('../views/Detail.vue'),
        meta:{title:'detail'} 
    },
    {
        path: '/test',
        component: () => import('../views/Test.vue')
    },
    {
        path: '/dashboard',
        component: () => import('../views/dashboard/Dashboard.vue'),
        meta:{title:'管理系统'} ,
        children: [
            {
                path: 'article',
                component: () => import('../views/dashboard/Article.vue'),
                meta:{title:'文章管理'} ,
            },
            {
                path: 'category',
                component: () => import('../views/dashboard/Category.vue'),
                meta:{title:'分类管理'} ,
            }
        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.afterEach((to,form) => {
    document.title = to.meta.title || '登录系统' //切换的title
})
export { router, routes }