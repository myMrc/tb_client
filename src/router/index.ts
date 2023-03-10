import { createRouter,createWebHashHistory } from "vue-router";
import { useStorage } from '@vueuse/core'
import { Router } from "../model/index";

//定义路由
const clientRouters = [
  {
    path: '/',
    redirect: '/MyMain'
  },
  {
    path: '/MyMain',
    name: '首页',
    component: () => import(/* webpackChunkName: "introduce" */ '../views/MyMain.vue')
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
export const resetRouter = () =>{
  for (const r of clientRouters) {
    router.addRoute(r)
  }
}

//添加路由
export const addRouter = (saveRouterValue:Router[]) => {
  for (const r of saveRouterValue) {
    for (const t of r.chileth) {
        router.addRoute({
          name:t.name,
          path:t.path,
          component: () => import(t.component)
        })
    }
  }
}

//存储路由
export const saveRouter = useStorage<Router[]>('saveRouter',[])

addRouter(saveRouter.value)

export default router