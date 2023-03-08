<template>
    <div
        v-for="(shadow, i) in shadowGroup"
        style="padding: 30px 50px; "
        :style="{
            boxShadow: `var(${getCssVarName(shadow.type)})`,
        }">
        <div style="display: flex; flex-direction:column;">
            <div >
                <img src="../assets/vue.svg" />
                <h2>tb分销管理系统</h2>
            </div>
            <div>
                <el-input v-model="state.user.account" placeholder="Please input account"/>
                <el-input v-model="state.user.password" type="password" placeholder="Please input password" show-password  style="margin: 20px 0;"/>
            </div>
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

const router = useRouter()

const state = reactive({
  user:{
    account:"",
    password:""
  }
})

const shadowGroup = reactive([
  {
    name: 'Basic Shadow',
    type: '',
  }
])

const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}

const loginFun = ()=>{
  const resData = login(state.user)
  console.log(resData)
}
</script>