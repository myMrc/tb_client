import { createRouter,createWebHashHistory } from "vue-router";
import { Routr } from "../model/index";

//设置路由
const clientRouters = [
  {
    path: '/',
    redirect: '/MyMain'
  },
  {
    path: '/MyMain',
    name: 'MyMain',
    component: () => import(/* webpackChunkName: "introduce" */ '../views/MyMain.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "introduce" */ '../views/Login.vue')
  }
]

//创建路由
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: clientRouters
})

//移除路由
export function resetRouters(){
  for (const r of clientRouters) {
    router.addRoute(r)
  }
}

//添加路由
export function addRouters(routerlist : Routr[]){
  for (const r of routerlist) {
    router.addRoute({
      path:r.path,
      name:r.name,
      component: () => import(r.component)
    })
  }
}

export default router