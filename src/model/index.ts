// 用户
export interface User{
  username:string,
  password:string
}
// 路由
export interface Router{
  index:string,
  icon :string,
  title:string,
  chileth: Routers[]
}
// 子路由
export interface Routers{
  path:string,
  name:string,
  icon:string,
  component:string
}
//图标
export interface Icon{
  [p:string]:any
}
