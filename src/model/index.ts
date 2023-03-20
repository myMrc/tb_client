// 路由
export interface Menu{
  index:string,
  icon :string,
  title:string,
  path?:string,
  chileth?: Menus[]
}
// 子菜单
export interface Menus{
  icon:string,
  name:string,
  path?:string
}
// 路由
export interface Router{
  path:string,
  name:string,
  component:string
}
//图标
export interface Icon{
  [p:string]:any
}
