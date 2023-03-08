<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">

      <!-- left导航 -->
      <el-aside class="left" v-show="state.showMenu">
        <h5 class="mb-2" style="margin: 20px 0;" @click="TbMain()">tb_分销管理系统</h5>
        <el-menu
          class="el-menu-vertical-demo"
          :router="true"
          :default-openeds="state.defaultOpen"
           :default-active='state.currentPath'
        >   <!-- menu菜单 -->
        <el-sub-menu v-for="menu in state.supMenu" :index="menu.index" style="border-top: 1px solid #666;">
          <template #title>
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item v-for="menus in menu.chileth" :index="menus.path">{{ menus.text }}</el-menu-item>
        </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- right视图 -->
      <el-container>
        <!-- head头部 -->
        <el-header class="head" v-show="state.showMenu">
            <p>{{ state.name }}</p>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                Dropdown List
                <el-icon class="el-icon--right" style="width: 10px;">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="Account">Account</el-dropdown-item>
                  <el-dropdown-item command="Password">Password</el-dropdown-item>
                  <el-dropdown-item divided command="Out">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
        </el-header>
        <!-- main页面 -->
        <el-main style="display: flex;justify-content: center;align-items: center;">
          <router-view />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { addRouters, resetRouters } from './router/index'
import { localGet, localRemove, pathMap } from './utils/index'

const noMenu = ['/login']
const router = useRouter()

const state = reactive({
  name: 'title',
  userInfo: null, //用户信息
  supMenu : [
    {
      index: "1",
      title: "基本设置",
      chileth: [
        {
          path: "/SupCard",
          text: "我的名片"
        },
        {
          path: "/SupMsgs",
          text: "我的消息"
        }
      ]
    },
    {
      index: "2",
      title: "产品管理",
      chileth: [
        {
          path: "/SupProductLine",
          text: "我的产品线"
        },
        {
          path: "/SupProduct",
          text: "我的产品"
        }
      ]
    },
    {
      index: "3",
      title: "分销商管理",
      chileth: [
        {
          path: "/SupRecruitmentBook",
          text: "我的招募书"
        },
        {
          path: "/SupDistributor",
          text: "我的分销商"
        }
      ]
    },
    {
      index: "4",
      title: "采购单管理",
      chileth: [
        {
          path: "/SupPurchaseOrder",
          text: "我的采购单"
        }
      ]
    }
  ],
  disMenu : [
    {
      index: "1",
      title: "基本设置",
      chileth: [
        {
          path: "/DisCard",
          text: "我的名片"
        },
        {
          path: "/DisMsgs",
          text: "我的消息"
        }
      ]
    },
    {
      index: "2",
      title: "产品管理",
      chileth: [
        {
          path: "/DisProducts",
          text: "授权产品"
        }
      ]
    },
    {
      index: "3",
      title: "商品管理",
      chileth: [
        {
          path: "/DisGoods",
          text: "分销商品"
        }
      ]
    },
    {
      index: "4",
      title: "供应商管理",
      chileth: [
        {
          path: "/DisApply",
          text: "申请加盟"
        }
      ]
    },
    {
      index: "5",
      title: "采购单管理",
      chileth: [
        {
          path: "/DisPurchaseOrder",
          text: "我的采购单"
        }
      ]
    }
  ],
  supRouter: [
    {
      path: '/SupCard',
      name: 'SupCard',
      component: '../views/SupCard.vue'
    },
    {
      path: '/SupMsgs',
      name: 'SupMsgs',
      component: '../views/SupMsgs.vue'
    },
    {
      path: '/SupProductLine',
      name: 'SupProductLine',
      component:  '../views/SupProductLine.vue'
    },
    {
      path: '/SupProduct',
      name: 'SupProduct',
      component: '../views/SupProduct.vue'
    },
    {
      path: '/SupRecruitmentBook',
      name: 'SupRecruitmentBook',
      component: '../views/SupRecruitmentBook.vue'
    },
    {
      path: '/SupDistributor',
      name: 'SupDistributor',
      component: '../views/SupDistributor.vue'
    },
    {
      path: '/SupPurchaseOrder',
      name: 'SupPurchaseOrder',
      component: '../views/SupPurchaseOrder.vue'
    },
  ],
  disRouter: [
  {
    path: '/DisCard',
    name: 'DisCard',
    component: '../views/DisCard.vue'
  },
  {
    path: '/DisMsgs',
    name: 'DisMsgs',
    component: '../views/DisMsgs.vue'
  },
  {
    path: '/DisProducts',
    name: 'DisProducts',
    component: '../views/DisProducts.vue'
  },
  {
    path: '/DisGoods',
    name: 'DisGoods',
    component: '../views/DisGoods.vue'
  },
  {
    path: '/DisApply',
    name: 'DisApply',
    component: '../views/DisApply.vue'
  },
  {
    path: '/DisPurchaseOrder',
    name: 'DisPurchaseOrder',
    component: '../views/DisPurchaseOrder.vue'
  }],
  
  showMenu: true, //工具栏显示/隐藏
  defaultOpen: ['1', '2', '3', '4'],
  currentPath: '/',
})

onMounted(()=>{
  resetRouters()
  addRouters(state.supRouter)
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // state.showMenu=false
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 token
    // if (!localGet('token')) {
      // 如果没有，则跳至登录页面
      // next({ path: '/login' })
    // } else {
    //   // 否则继续执行
      next()
    // }
  }
  state.showMenu = !noMenu.includes(to.path)
  state.currentPath = to.path
  document.title = pathMap[to.name as keyof typeof pathMap]
  state.name = pathMap[to.name as keyof typeof pathMap]
})

//退出登录
const handleCommand = (command: string | number | object) => {
  if(command == "Out"){
    // localRemove('token')
    router.push("/login")
  }else{
    ElMessage(`click on item ${command}`)
  }
}

//主页面
function TbMain(){
  router.push("/")
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.left{
  max-width: 11%;
  border-right:1px solid #666;
}
.head{
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #666;
}
</style>