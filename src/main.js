import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn.js'
import vuex from 'vuex'
import "@/assets/font/iconfont.css";


const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale });
app.use(vuex);
app.mount('#app');



//页面刷新后重新设置权限页面动态路由，防止出现空白页面
const reSetPermissionList = to => {
    return new Promise((resolve, reject) => {
        if (to.path !== '/login' && store.state.buildMenuData.menuRouteList.length === 0) {
            store.dispatch('actGetBuildMenu').then(() => {
                    resolve('permCode')
                })
                .catch(error => {
                    console.log(error);
                    resolve('permCode')
                })
        } else {
            resolve()
        }
    })
}

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title ? '高速公路日常养护信息系统' : '登录'}`;
    const role = sessionStorage.getItem('token');
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        if (to.path === '/login') {
            next()
        } else {
            reSetPermissionList(to).then(data => {
                data === 'permCode' ? next({ path: to.path, replace: true }) : next()
            })
        }
    }
});