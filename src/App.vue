<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">

      <!-- head头部 -->
      <el-header class="head" v-show="showHead">
        <div>
          <img src="./assets/vue.svg" width="30" />
          <h5><i>HELLO WORLD</i></h5>

          <div v-if="saveMenu.length >0" @click="showMenu = showMenu ? false : true"><div></div></div>
        </div>
        <p style="font-family: 华文新魏;font-size: 30px;margin: 10px">hello管理系统</p>
        <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" style="font-size: 16px !important;">
                  <Avatar width="30" style="margin-right: 5px"/>
                   <i>myAccount</i>
              </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item >用户 ： {{saveUser.userName}}</el-dropdown-item>
              <el-dropdown-item v-if="saveUser.roleId == 1">角色 ： 供应商</el-dropdown-item>
              <el-dropdown-item v-else-if="saveUser.roleId == 2">角色 ： 分销商</el-dropdown-item>
              <el-dropdown-item v-else>角色 ： 新用户</el-dropdown-item>
              <div style="display: flex">
                <el-dropdown-item divided command="Out">退出</el-dropdown-item>
                <span style="margin-top: 6px">|</span>
                <el-dropdown-item divided command="Del">注销</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- right视图 -->
      <el-container>
        <!-- left导航 -->
        <template v-if="saveMenu.length >0">
        <el-aside class="left_menu" v-show="showMenu">
          <el-menu router="true">
            <template v-for="menu in saveMenu">
              <el-sub-menu v-if="menu.chileth" :index="menu.index">
                <template #title>
                  <Index class="icon" :icon="menu.icon"></Index>
                  <span>{{ menu.title }}</span>
                </template>
                <el-menu-item v-for="menus in menu.chileth" :index="menus.path">
                  <Index class="icon" :icon="menus.icon"></Index>{{ menus.name }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="menu.index">
                <Index class="icon" :icon="menu.icon"></Index>{{ menu.title }}
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        </template>
        <!-- main页面 -->
        <el-main style="padding: 24px">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router, { saveMenu, saveUser } from './router/index'
import { localGet, localRemove } from './utils/index'
import { deleteUser } from "./axios/index";
import { useTitle } from './store/index'
import { ElMessage } from 'element-plus'
import { Index } from './components/index'

const noMenu = ['/login']
const showMenu = ref(true)
const showHead = ref(true)


//路由-跳转
router.beforeEach((to, from, next) => {
  to.path == '/login'? next() : !localGet('token')? next(to.path ='/login' ) : next()
  useTitle().text = to.name as string //卡片标题
  document.title = to.name as string  //文档标题
  showHead.value = !noMenu.includes(to.path)  //顶部显示
})

//退出-注销
const handleCommand = (command: string | number | object) => {
  if(command == "Out"){
    saveMenu.value = []
    saveUser.value = []
    localRemove('token')
    router.push("/login")
  }
  if (command == "Del"){
    deleteUser()
    saveMenu.value = []
    saveUser.value = []
    localRemove('token')
    router.push("/login")
  }
}
</script>

<style scoped>
.icon{
  width: 20px;
  margin-right: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-dropdown-link:hover {
  outline: -webkit-focus-ring-color auto 1px;
  outline-color: -webkit-focus-ring-color;
  outline-style: auto;
  color: var(--el-color-primary);
}
.el-dropdown-link:focus {
  outline-width: 0px;
}
.left_menu{
  max-width: 15%;
  box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.72);;
}
.left_menu ul{
  padding: 0 10px;
}
.left_menu li:focus{
  background: #18222c;
}
.head{
  display: flex;
  justify-content: space-between;
  box-shadow: var(--el-box-shadow-light);
}
.head>div{
  display: flex;
  align-items: center;
  justify-content: center;
}
.head>div h5{
  margin: 0 20px 0 5px;
}
.head>div>div{
  width: 10px;
  height: 10px;
  border: 1px solid #999999;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head>div>div div{
  width: 5px;
  height: 5px;
  border: 1px solid #999999;
  border-radius: 5px;
}
.head>div>div:hover{
  border: 1px solid green;
}
.head>div>div:hover div{
  border: 1px solid green;
}
</style>