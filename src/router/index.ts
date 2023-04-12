import { createRouter,createWebHashHistory } from "vue-router";
import { useStorage } from '@vueuse/core'
import { Menu, Router} from "../model/index";

//定义路由
const clientRouters = [
  {
    path: '/',
    redirect: '/MyMain'
  },
  {
    path: '/Login',
    name: '登录',
    component: () => import(/* webpackChunkName: "introduce" */ '../views/Login.vue')
  }
]

//创建路由
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: clientRouters
})

//移除路由
export const removeRouter = () =>{
  for (const r of clientRouters) {
    router.addRoute(r)
  }
}

//添加路由
export const insertRouter = (saveRouterValue:Router[]) => {
  for (const r of saveRouterValue) {
      router.addRoute({
        name:r.name,
        path:r.path,
        component: () => import(r.component)
      })
  }
}

export const saveMenu = useStorage<Menu[]>('saveMenu',[])
export const saveRouter = useStorage<Router[]>('saveRouter',[])
export const saveUser = useStorage<object>('saveUser',{})

insertRouter(saveRouter.value)

export default router