import { Router, Menu} from "../model/index"
import {AxiosResponse} from "axios";

export const localGet = (key:string) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value||"")
  } catch (error) {
    return value
  }
}

export const localSet = (key: string, value: AxiosResponse<any>) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const localRemove = (key:string) => {
  window.localStorage.removeItem(key)
}

export const supRouter:Router[] = [
  {
    path: "/MyMain",
    name: "首页",
    component: "../views/SupMain.vue"
  },
  {
    path: "/SupCard",
    name: "我的名片",
    component: '../views/SupCard.vue',
  },
  {
    path: "/SupMsgs",
    name: "我的消息",
    component: '../views/SupMsgs.vue'
  },
  {
    path: "/SupProductLine",
    name: "我的产品线",
    component:  '../views/SupProductLine.vue'
  },
  {
    path: "/SupProduct",
    name: "我的产品",
    component: '../views/SupProduct.vue'
  },
  {
    path: "/SupRecruitmentBook",
    name: "我的招募书",
    component: '../views/SupRecruitmentBook.vue'
  },
  {
    path: "/SupDistributor",
    name: "我的分销商",
    component: '../views/SupDistributor.vue'
  },
  {
    path: "/SupPurchaseOrder",
    name: "我的采购单",
    component: '../views/SupPurchaseOrder.vue'
  }
]

export const supMenu:Menu[] = [
  {
    index: "/MyMain",
    title: "首页",
    icon: "ScaleToOriginal",
  },
  {
    index: "1",
    icon: "ScaleToOriginal",
    title: "基本设置",
    chileth: [
      {
        path: "/SupCard",
        name: "我的名片",
        icon: "Postcard",
      },
      {
        path: "/SupMsgs",
        name: "我的消息",
        icon: "Comment",
      }
    ]
  },
  {
    index: "2",
    icon: "Memo",
    title: "产品管理",
    chileth: [
      {
        path: "/SupProductLine",
        name: "我的产品线",
        icon: "DataLine",
      },
      {
        path: "/SupProduct",
        name: "我的产品",
        icon: "TrendCharts",
      }
    ]
  },
  {
    index: "3",
    icon: "Ticket",
    title: "分销商管理",
    chileth: [
      {
        path: "/SupRecruitmentBook",
        name: "我的招募书",
        icon: "Notebook",
      },
      {
        path: "/SupDistributor",
        name: "我的分销商",
        icon: "Coin",
      }
    ]
  },
  {
    index: "5",
    icon: "DocumentCopy",
    title: "采购单管理",
    chileth: [
      {
        path: "/SupPurchaseOrder",
        name: "我的采购单",
        icon: "CreditCard",
      }
    ]
  }
]

export const resRouter:Router[] = [
  {
    path: "/MyMain",
    name: "首页",
    component: "../views/DisMain.vue",
  },
  {
    path: "/DisCard",
    name: "我的名片",
    component: '../views/DisCard.vue',
  },
  {
    path: "/DisMsgs",
    name: "我的消息",
    component: '../views/DisMsgs.vue'
  },
  {
    path: "/DisProducts",
    name: "授权产品",
    component:  '../views/DisProducts.vue'
  },
  {
    path: "/DisGoods",
    name: "分销商品",
    component: '../views/DisGoods.vue'
  },
  {
    path: "/DisApply",
    name: "申请加盟",
    component: '../views/DisApply.vue'
  },
  {
    path: "/DisPurchaseOrder",
    name: "我的采购单",
    component: '../views/DisPurchaseOrder.vue'
  }
]

export const resMenu:Menu[] = [
  {
    index: "/MyMain",
    title: "首页",
    icon: "ScaleToOriginal",
  },
  {
    index: "1",
    title: "基本设置",
    icon: "ScaleToOriginal",
    chileth: [
      {
        name: "我的名片",
        path: "/DisCard",
        icon: "Postcard",
      },
      {
        name: "我的消息",
        path: "/DisMsgs",
        icon: "Comment",
      }
    ]
  },
  {
    index: "2",
    title: "产品管理",
    icon: "Memo",
    chileth: [
      {
        name: "授权产品",
        path: "/DisProducts",
        icon: "DataLine",
      }
    ]
  },
  {
    index: "3",
    title: "商品管理",
    icon: "Memo",
    chileth: [
      {
        name: "分销商品",
        path: "/DisGoods",
        icon: "TrendCharts",
      }
    ]
  },
  {
    index: "4",
    title: "供应商管理",
    icon: "Avatar",
    chileth: [
      {
        name: "申请加盟",
        path: "/DisApply",
        icon: "SupDistributor",
      }
    ]
  },
  {
    index: "5",
    title: "采购单管理",
    icon: "DocumentCopy",
    chileth: [
      {
        name: "我的采购单",
        path: "/DisPurchaseOrder",
        icon: "CreditCard",
      }
    ]
  }
]

export const allRouter:Router[] = [
  {
    path: "/MyMain",
    name: "首页",
    component: "../views/MyMain.vue",
  }
]