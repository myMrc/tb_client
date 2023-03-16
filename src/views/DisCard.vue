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
        <el-button :icon="Edit" @click="dialogFormVisible = true">修改信息</el-button>
      </el-col>
    </el-row>
    <el-descriptions
        direction="vertical"
        :column="2"
        :size="size"
        border
    >
      <!--        title="Vertical list with border"-->
      <el-descriptions-item label="店铺名称">{{state.userInfo.distributorName}}</el-descriptions-item>
      <el-descriptions-item label="开店日期">{{state.userInfo.openingDate}}</el-descriptions-item>
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

  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="50%">
    <el-form  :inline="true"
              ref="ruleFormRef"
             :model="ruleForm"
             status-icon
             :rules="rules"
             label-width="80px"
    >
      <el-form-item label="店铺名称:" :label-width="formLabelWidth">
        <el-input v-model="state.tex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="店铺名称:" :label-width="formLabelWidth">
        <el-input v-model="state.tex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="店铺名称:" :label-width="formLabelWidth">
        <el-input v-model="state.tex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="店铺名称:" :label-width="formLabelWidth">
        <el-input v-model="state.tex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="店铺名称:" :label-width="formLabelWidth">
        <el-input v-model="state.tex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="店铺名称:" :label-width="formLabelWidth">
        <el-input v-model="state.tex" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Zones:" :label-width="formLabelWidth">
        <el-select v-model="state.tex" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item label="Zones:" :label-width="formLabelWidth">
        <el-select v-model="state.tex" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from 'vue'
import { Edit } from '@element-plus/icons-vue'
import { disCard } from '../axios/index';
import { useTitle } from '../store/index'

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const size = ref('')
const state = reactive({
  userInfo: {},
  tex: ''
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
  disCard().then(res => {
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

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 200px;
}
.el-input {
  width: 200px;
}
</style>