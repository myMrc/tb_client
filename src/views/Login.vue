<template>
    <div
        v-for="(shadow, i) in shadowGroup"
        style="padding: 30px 50px; "
        :style="{
            boxShadow: `var(${getCssVarName(shadow.type)})`,
        }">
        <div style="display: flex; flex-direction:column; width: 300px;">
            <div >
                <img src="../assets/vue.svg" />
                <h2>tb分销管理系统</h2>
            </div>
            <el-form :rules="rules" :model="state.user" ref="loginForm">
              <el-form-item prop="account">
                <el-input v-model="state.user.account" placeholder="Please input account"/>
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
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { login } from '../axios/index'
  import { localSet } from '../utils/index'
  import { supRouter, disRouter } from '../utils/index'
  import { saveRouter, resetRouter, addRouter } from '../router/index'

  const router = useRouter()
  const state = reactive({
    user: {
      account:"",
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
      localSet('token', res.data)
      JSON.parse(atob(res.data.split(".")[1])).userId==1? saveRouter.value=supRouter : saveRouter.value=disRouter
      resetRouter()
      addRouter(saveRouter.value)
      router.push("/")
    })
  }
</script>