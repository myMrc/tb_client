<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">

      <!-- left导航 -->
      <el-aside class="left" v-show="state.showMenu">
        <h5 class="mb-2" style="margin: 20px 0;" @click="myMain">tb_分销管理系统</h5>
        <el-menu
          class="el-menu-vertical-demo"
          :router="true"
          :default-openeds="state.defaultOpen"
        >   <!-- menu菜单 -->
          <el-sub-menu v-for="menu in saveRouter" :index="menu.index" style="border-top: 1px solid #666;">
            <template #title>
              <span>{{ menu.title }}</span>
            </template>
            <el-menu-item v-for="menus in menu.chileth" :index="menus.path">{{ menus.name }}</el-menu-item>
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
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { saveRouter } from './router/index'
  import { localGet, localRemove } from './utils/index'

  const noMenu = ['/login']
  const router = useRouter()
  const state = reactive({
    name: 'title',
    userInfo: null,
    showMenu: true,
    defaultOpen: ['1', '2', '3', '4']
  })

  //路由守卫
  router.beforeEach((to, from, next) => {
    to.path == '/login'? next() : !localGet('token')? next(to.path ='/login' ) : next()
    state.showMenu = !noMenu.includes(to.path)
    state.name = to.name as keyof typeof state
    document.title = to.name as keyof typeof state
  })

  //退出登录
  const handleCommand = (command: string | number | object) => {
    if(command == "Out"){
      localRemove('token')
      saveRouter.value = []
      router.push("/login")
    }else{
      ElMessage(`click on item ${command}`)
    }
  }

  //首页跳转
  const myMain = () => {
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
  max-width: 12%;
  border-right:1px solid #666;
}
.head{
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #666;
}
</style>