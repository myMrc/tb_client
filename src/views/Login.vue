<template>
  <div style="display: flex;justify-content: center;align-items: center;height: 100%">
    <div
        v-for="(shadow, i) in shadowGroup"
        style="padding: 30px 50px;"
        :style="{
            boxShadow: `var(${getCssVarName(shadow.type)})`,
        }">
        <div style="display: flex; flex-direction:column;">
            <div >
                <img src="../assets/R-C.png" width="100" />
                <h2 style="margin-top: 0"><i>HELLO WORLD</i></h2>
            </div>
            <el-form :rules="rules" :model="user" ref="loginForm">
              <el-form-item prop="account">
                <el-input style="width: 300px" v-model="user.userName" placeholder="Please input account"/>
              </el-form-item>
              <el-form-item prop="password">
              <el-input style="width: 300px" v-model="user.userCode" type="password" placeholder="Please input password"/>
              </el-form-item>
            </el-form>
            <div>
                <el-button @click="loginFun">Login</el-button>
                <el-button @click="registerFun">Register</el-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { login, register } from '../axios/index'
  import router, { resetRouter, addRouter, saveRouter, saveMenu, saveUser} from '../router/index'
  import { localSet, supRouter, resRouter, supMenu, resMenu, allRouter } from '../utils/index'

  const user = ref({})
  //模态框
  const shadowGroup = ref([{
      name: 'Basic Shadow',
      type: '',
  }])
  const getCssVarName = (type: string) => {
    return `--el-box-shadow${type ? '-' : ''}${type}`
  }
  //登录
  const loginFun = async () =>{
    const token:any = await login(user.value)
    const userInfo = JSON.parse(atob(token.split('.')[1])).user
    localSet('token', token)
    resetRouter()
    saveUser.value = userInfo
    if(userInfo.roleId == 1){
      saveMenu.value = supMenu
      saveRouter.value = supRouter
    }else if(userInfo.roleId == 2){
      saveRouter.value = resRouter
      saveMenu.value = resMenu
    }else {
      saveRouter.value = allRouter
      saveMenu.value = []
    }
    addRouter(saveRouter.value)
    router.push("/")
  }
  //注册
  const registerFun = ()=>{
    register(user.value)
  }
</script>