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
  import { reactive, ref } from 'vue'
  import { login, register } from '../axios/index'
  import router, { resetRouter, addRouter, saveRouter, saveMenu} from '../router/index'
  import { localSet, supRouter, resRouter, supMenu, resMenu, allRouter } from '../utils/index'
  import { useUserInfo } from '../store/index'

  const user = ref({})
  //模态框
  const shadowGroup = reactive([{
      name: 'Basic Shadow',
      type: '',
  }])
  const getCssVarName = (type: string) => {
    return `--el-box-shadow${type ? '-' : ''}${type}`
  }
  //登录
  const loginFun = async () =>{
    await login(user.value).then(res => {
      localSet('token', res.data) //保存token令牌
      resetRouter() //移除路由
      let user = JSON.parse(atob(res.data.split(".")[1])).user; //从token获取用户信息
      if(user.reloId == 1){
        saveRouter.value = supRouter
        saveMenu.value = supMenu
      }else if(user.reloId == 2){
        saveRouter.value = resRouter
        saveMenu.value = resMenu
      }else {
        saveRouter.value = allRouter
        saveMenu.value = []
      }
      useUserInfo().user = user.userName  //用户名称
      useUserInfo().relo = user.reloId   //用户角色
      addRouter(saveRouter.value)       //添加路由
      router.push("/")                 //跳转页面
    })
  }
  //注册
  const registerFun = ()=>{
    register(user.value)
  }
</script>