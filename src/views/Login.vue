<template>
  <div style="display: flex;justify-content: center;align-items: center;height: 100%">
    <div
        v-for="(shadow, i) in shadowGroup"
        style="padding: 30px 50px; "
        :style="{
            boxShadow: `var(${getCssVarName(shadow.type)})`,
        }">
        <div style="display: flex; flex-direction:column; width: 300px;">
            <div >
                <img src="../assets/vue.svg" />
                <h2><i>HELLO WORLD</i></h2>
            </div>
            <el-form :rules="rules" :model="state.user" ref="loginForm">
              <el-form-item prop="account">
                <el-input v-model="state.user.username" placeholder="Please input account"/>
              </el-form-item>
              <el-form-item prop="password">
              <el-input v-model="state.user.password" type="password" placeholder="Please input password"/>
              </el-form-item>
            </el-form>
            <div>
                <el-button @click="loginFun">Login</el-button>
                <el-button>Register</el-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { login } from '../axios/index'
  import { supRouter, disRouter } from '../utils/index'
  import { saveRouter, resetRouter, addRouter } from '../router/index'

  const router = useRouter()
  const state = reactive({
    user: {
      username:"",
      password:""
    }
  })
  const rules = reactive({
    account: [
      { required: true, message: '账户不能为空', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
  })
  //模态框
  const shadowGroup = reactive([{
      name: 'Basic Shadow',
      type: '',
  }])
  const getCssVarName = (type: string) => {
    return `--el-box-shadow${type ? '-' : ''}${type}`
  }
  //登录
  const loginFun = ()=>{
    login(state.user).then(res => {
      res.data == "1"? saveRouter.value=supRouter : saveRouter.value=disRouter
      // JSON.parse(atob(token.split(".")[1])).sub=="admin"? saveRouter.value=supRouter : saveRouter.value=disRouter
      resetRouter()
      addRouter(saveRouter.value)
      window.location.href = "/"
    })
  }
</script>