<template>
  <div class="common-layout">
    <el-container style="height: 100vh;">

      <!-- head头部 -->
      <el-header class="head" v-show="state.showMenu">
        <div style="display: flex;justify-content: center">
          <img src="./assets/vue.svg" width="30" />
          <h5 style="margin: 20px 5px;" @click="myMain"><i>HELLO WORLD</i></h5>
        </div>
        <h3 style="font-family: 小米兰亭">企业网络分销平台</h3>
        <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                  <Avatar width="30"/>
                   myAccount
              </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="state.userInfo.usersID">userId：{{state.userInfo.usersID}}</el-dropdown-item>
              <el-dropdown-item :command="state.userInfo.account">name：{{state.userInfo.account}}</el-dropdown-item>
              <el-dropdown-item divided command="Out">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <!-- right视图 -->
      <el-container>
        <!-- left导航 -->
        <el-aside class="left" v-show="state.showMenu">
          <el-menu
              class="el-menu-vertical-demo"
              :router="true"
              default-openeds=''
              unique-opened="true"
              :default-openeds="state.defaultOpen"
          >   <!-- menu菜单 -->
            <el-sub-menu v-for="menu in saveRouter" :index="menu.index">
              <template #title>
                <Index class="icon" :icon="menu.icon"></Index>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item v-for="menus in menu.chileth" :index="menus.path">
                <Index class="icon" :icon="menus.icon"></Index>{{ menus.name }}
              </el-menu-item>
            </el-sub-menu>
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
import { onMounted, reactive} from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { saveRouter } from './router/index'
import { localGet, localRemove } from './utils/index'
import { selectUser } from "./axios";
import { Index } from './components/index'
import { useTitle } from './store/index'

const noMenu = ['/login']
const router = useRouter()
const state = reactive({
  userInfo: {},
  showMenu: true,
  defaultOpen: ['1', '2', '3', '4']
})

onMounted(()=>{
  if(saveRouter.value.length >0 ){
    selectUser().then(res => {
      state.userInfo = res.data
    })
  }
})

//路由守卫
router.beforeEach((to, from, next) => {
  to.path == '/login'? next() : !localGet('token')? next(to.path ='/login' ) : next()
  state.showMenu = !noMenu.includes(to.path)
  document.title = to.name as keyof typeof state
  useTitle().text = to.name as keyof typeof state
  // document.title = to.name as keyof typeof state
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