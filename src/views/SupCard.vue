<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{useTitle().text}}</span>
        <el-radio-group v-model="size">
          <el-radio label="large">Large</el-radio>
          <el-radio>Default</el-radio>
          <el-radio label="small">Small</el-radio>
        </el-radio-group>
<!--        <el-button class="button" text>Operation button</el-button>-->
      </div>
    </template>
    <el-row>
      <el-col :span="12" style="text-align: left">
        <span >Vertical list with border</span>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button :icon="Edit" >修改信息</el-button>
      </el-col>
    </el-row>
    <el-descriptions
        direction="vertical"
        :column="2"
        :size="size"
        border
    >
      <!--        title="Vertical list with border"-->
      <el-descriptions-item label="企业名称">{{state.userInfo.companyName}}</el-descriptions-item>
      <el-descriptions-item label="企业介绍">{{state.userInfo.companyInfo}}</el-descriptions-item>
      <el-descriptions-item label="联系人">{{state.userInfo.contacts}}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{state.userInfo.phone}}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{state.userInfo.email}}</el-descriptions-item>
      <el-descriptions-item label="旺旺">
        <el-tag size="small">{{state.userInfo.wang}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="主营类目"
      >No.1188：{{state.userInfo.mainClass}}
      </el-descriptions-item>
      <el-descriptions-item label="主营品牌"
      >No.1188：{{state.userInfo.mainBrand}}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { supCard } from '../axios/index';
import { useTitle } from '../store/index'

const size = ref('')
const state = reactive({
  userInfo: {}
})

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

onMounted(()=>{
  supCard().then(res => {
      state.userInfo = res.data
  })
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}

.card-header {
  display: flex;
  height: 24px;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  background: none;
  padding-bottom: 10px;
}
</style>