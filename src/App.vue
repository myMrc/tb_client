<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">

      <!-- head头部 -->
      <el-header class="head" v-show="showHead">
        <div style="display: flex;justify-content: center">
          <img src="./assets/vue.svg" width="30" />
          <h5 style="margin: 20px 5px;"><i>HELLO WORLD</i></h5>
        </div>
        <p style="font-family: 华文新魏;font-size: 30px;margin: 10px">企业网络分销平台</p>
        <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link" style="font-size: 16px !important;">
                  <Avatar width="35" style="margin-right: 5px"/>
                   <i>myAccount</i>
              </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item >user：{{userInfo.userName}}</el-dropdown-item>
              <el-dropdown-item v-if="userInfo.reloId == 1">relo ：供应商</el-dropdown-item>
              <el-dropdown-item v-else>relo ：新用户</el-dropdown-item>
              <el-dropdown-item v-if="userInfo.reloId == 2">relo ：分销商</el-dropdown-item>
              <div style="display: flex">
                <el-dropdown-item divided command="Out">退出</el-dropdown-item>
                <el-dropdown-item divided command="Del">注销</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- right视图 -->
      <el-container>
        <!-- left导航 -->
        <el-aside class="left" v-show="showMenu">
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
        <!-- main页面 -->
        <el-main style="padding: 25px">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addRouter, resetRouter, saveMenu, saveRouter} from './router/index'
import { allRouter, localGet, localRemove, resMenu, resRouter, supMenu, supRouter} from './utils/index'
import { selectUser, deleteUser } from "./axios/index";
import { useTitle } from './store/index'
import { ElMessage } from 'element-plus'
import { Index } from './components/index'

const noMenu = ['/login']
const router = useRouter()
const userInfo = ref({})
const showMenu = ref(true)
const showHead = ref(true)

onMounted(()=>{
    if(localGet('token'))
    selectUser().then(res => {
      userInfo.value = res.data
    })
})

//路由守卫
router.beforeEach((to, from, next) => {
  to.path == '/login'? next() : !localGet('token')? next(to.path ='/login' ) : next()
  useTitle().text = to.name as string
  document.title = to.name as string
  showMenu.value = !noMenu.includes(to.path)
  showHead.value = !noMenu.includes(to.path)
  if(saveMenu.value.length == 0){
    showMenu.value = false
  }
})

//退出-注销
const handleCommand = (command: string | number | object) => {
  if(command == "Out"){
    localRemove('token')
  }
  if (command == "Del"){
    deleteUser()
    localRemove('token')
  }
  window.location.href = "/"
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
  max-width: 13%;
  box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.72);;
}
.head{
  display: flex;
  justify-content: space-between;
  box-shadow: var(--el-box-shadow-light);
}
.icon{
  width: 20px;
  margin-right: 5px;
}
</style>