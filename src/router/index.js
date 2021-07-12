import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes = [{
        path: '/',
        redirect: '/home/dashboard',
    },
    {
        path: '/401',
        name: '401',
        component: () =>
            import ('../views/ErrorPage/401.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () =>
            import ('../views/ErrorPage/404.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { title: '仪表盘' },
        children: [{
            path: 'dashboard',
            component: () =>
                import ('../views/DashBoard/DashBoard.vue'),
            meta: { title: '仪表盘', index: 'dashboard' }
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router