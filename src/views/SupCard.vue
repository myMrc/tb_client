<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>username</span>
        <el-radio-group v-model="size">
          <el-radio label="large">Large</el-radio>
          <el-radio>Default</el-radio>
          <el-radio label="small">Small</el-radio>
        </el-radio-group>
<!--        <el-button class="button" text>Operation button</el-button>-->
      </div>
    </template>

    <el-descriptions
        title="Vertical list with border"
        direction="vertical"
        :column="2"
        :size="size"
        border
    >
      <el-descriptions-item label="企业名称">阿里巴巴网络科技有限公司</el-descriptions-item>
      <el-descriptions-item label="企业介绍">欢迎加入阿里巴巴集团</el-descriptions-item>
      <el-descriptions-item label="联系人">小马</el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="邮箱">18100000000@qq.com</el-descriptions-item>
      <el-descriptions-item label="旺旺">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="主营类目"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
      <el-descriptions-item label="主营品牌"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const size = ref('')
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
}
</style>