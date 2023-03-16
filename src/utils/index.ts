import {Router} from "../model/index"

export const localGet = (key:string) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value||"")
  } catch (error) {
    return value
  }
}

export const localSet = (key:string, value:string) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const localRemove = (key:string) => {
  window.localStorage.removeItem(key)
}

export const supRouter:Router[] = [
  {
    index: "1",
    icon: "ScaleToOriginal",
    title: "基本设置",
    chileth: [
      {
        path: "/SupCard",
        name: "我的名片",
        icon: "Postcard",
        component: '../views/SupCard.vue',
      },
      {
        path: "/SupMsgs",
        name: "我的消息",
        icon: "Comment",
        component: '../views/SupMsgs.vue'
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
        component:  '../views/SupProductLine.vue'
      },
      {
        path: "/SupProduct",
        name: "我的产品",
        icon: "TrendCharts",
        component: '../views/SupProduct.vue'
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
        component: '../views/SupRecruitmentBook.vue'
      },
      {
        path: "/SupDistributor",
        name: "我的分销商",
        icon: "Coin",
        component: '../views/SupDistributor.vue'
      }
    ]
  },
  {
    index: "4",
    icon: "DocumentCopy",
    title: "采购单管理",
    chileth: [
      {
        path: "/SupPurchaseOrder",
        name: "我的采购单",
        icon: "CreditCard",
        component: '../views/SupPurchaseOrder.vue'
      }
    ]
  }
]

export const disRouter:Router[] = [
  {
    index: "1",
    icon: "ScaleToOriginal",
    title: "基本设置",
    chileth: [
      {
        path: "/DisCard",
        name: "我的名片",
        icon: "Postcard",
        component: '../views/DisCard.vue',
      },
      {
        path: "/DisMsgs",
        name: "我的消息",
        icon: "Comment",
        component: '../views/DisMsgs.vue'
      }
    ]
  },
  {
    index: "2",
    icon: "Memo",
    title: "产品管理",
    chileth: [
      {
        path: "/DisProducts",
        name: "授权产品",
        icon: "DataLine",
        component:  '../views/DisProducts.vue'
      }
    ]
  },
  {
    index: "3",
    icon: "SupDistributor",
    title: "商品管理",
    chileth: [
      {
        path: "/DisGoods",
        name: "分销商品",
        icon: "TrendCharts",
        component: '../views/DisGoods.vue'
      }
    ]
  },
  {
    index: "4",
    icon: "Avatar",
    title: "供应商管理",
    chileth: [
      {
        path: "/DisApply",
        name: "申请加盟",
        icon: "SupDistributor",
        component: '../views/DisApply.vue'
      }
    ]
  },
  {
    index: "5",
    icon: "DocumentCopy",
    title: "采购单管理",
    chileth: [
      {
        path: "/DisPurchaseOrder",
        name: "我的采购单",
        icon: "CreditCard",
        component: '../views/DisPurchaseOrder.vue'
      }
    ]
  }
]