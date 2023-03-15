// 用户
export interface User{
  username:string,
  password:string
}
// 路由
export interface Router{
  index:string,
  title:string,
  chileth: Routers[]
}
// 子路由
export interface Routers{
  path:string,
  name:string,
  component:string
}