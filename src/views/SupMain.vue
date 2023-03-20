<template>
  <div class="box">
        <el-card :body-style="{ padding: '30px',background:'#18222c',border: '1px solid #213d5b' }">
          <img src="../assets/vue.svg" class="image"/>
          <div style="padding: 14px">
            <span>Welcome to ONY-DRP</span>
            <div style="margin-top: 5px">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>
<style>
.box{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family:'Times New Roman', Times, serif;
}
.box>p{
  margin-top: 0;
  font-size: 36px;
}
.time {
  font-size: 12px;
  color: #999;
}
.image {
  width: 100%;
  display: block;
}
</style>