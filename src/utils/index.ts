export function localGet(key:string){
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value||"")
  } catch (error) {
    return value
  }
}

export function localSet (key:string, value:string) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove (key:string) {
  window.localStorage.removeItem(key)
}

//  export interface RouteRecordName{
//   Login: string,
//   MyMain: string,
//   SupCard: string,
//   SupMsgs: string,
//   SupProductLine: string,
//   SupProduct: string,
//   SupRecruitmentBook: string,
//   SupDistributor: string,
//   SupPurchaseOrder: string,
//   DisCard: string,
//   DisMsgs: string,
//   DisProducts: string,
//   DisGoods: string,
//   DisApply: string,
//   DisPurchaseOrder: string
// }

export const pathMap = {
    Login: '登录',
    MyMain: '系统介绍',
    SupCard: '我的名片',
    SupMsgs: '我的消息',
    SupProductLine: '我的产品线',
    SupProduct: '我的产品',
    SupRecruitmentBook: '我的招募书',
    SupDistributor: '我的供应商',
    SupPurchaseOrder: '我的采购单',
    DisCard: '我的名片',
    DisMsgs: '我的消息',
    DisProducts: '授权产品',
    DisGoods: '分销商品',
    DisApply: '申请加盟',
    DisPurchaseOrder: '我的采购单'
  }