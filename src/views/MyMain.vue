<template>
    <div style="font-family:'Times New Roman', Times, serif">
        <img style="width: 200px;" src="../assets/vite.svg" alt="#">
        <h1>Welcome to</h1>
        <h1>JONY-DRP</h1>
    </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { userInfo } from '../axios/index'

onMounted(()=>{
    userInfo().then(res => {
      console.log(res)
    })
})
</script>