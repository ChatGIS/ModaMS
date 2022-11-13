import router from "./index";
import store from "../store";

const whiteList = ['/login']  // 白名单列表
router.beforeEach((to, from, next) => {
    if(store.getters.token){
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})