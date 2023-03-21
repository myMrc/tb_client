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
      </div>
    </template>
    <el-row>
      <el-col :span="12" style="text-align: left">
        <span >Vertical list with border</span>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-button :icon="Edit" text type="primary" size="large" @click="onDialog">修改信息</el-button>
      </el-col>
    </el-row>

    <el-descriptions
        :column="4"
        :size="size"
        label-align="right"
    >
      <el-descriptions-item label="企业名称 ：">{{userInfo.companyName}}</el-descriptions-item>
      <el-descriptions-item label="企业介绍 ：">{{userInfo.companyInfo}}</el-descriptions-item>
      <el-descriptions-item label="联系人 ：">{{userInfo.supplierName}}</el-descriptions-item>
      <el-descriptions-item label="手机号 ：">{{userInfo.phone}}</el-descriptions-item>
      <el-descriptions-item label="主营类目 ：">{{userInfo.mainClass}}</el-descriptions-item>
      <el-descriptions-item label="主营品牌 ：">{{userInfo.mainBrand}}</el-descriptions-item>
      <el-descriptions-item label="&nbsp; &nbsp;邮箱 ：">{{userInfo.email}}</el-descriptions-item>
      <el-descriptions-item label="&nbsp; &nbsp;旺旺 ："><el-tag size="small">{{userInfo.wang}}</el-tag></el-descriptions-item>
    </el-descriptions>
  </el-card>

  <el-dialog v-model="dialog" title="Shipping address" width="50%">
    <el-form  :inline="true"
              :model="userForm"
              label-width="80px"
    >
<!--      <input v-model="userForm.supplierId" />-->

      <el-form-item label="企业名称:" :label-width="formLabelWidth">
        <el-input v-model="userForm.companyName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="企业介绍:" :label-width="formLabelWidth">
        <el-input v-model="userForm.companyInfo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系人:" :label-width="formLabelWidth">
        <el-input v-model="userForm.supplierName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号:" :label-width="formLabelWidth">
        <el-input v-model="userForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱:" :label-width="formLabelWidth">
        <el-input v-model="userForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="旺旺:" :label-width="formLabelWidth">
        <el-input v-model="userForm.wang" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Zones:" :label-width="formLabelWidth">
        <el-select  placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item label="Zones:" :label-width="formLabelWidth">
        <el-select placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialog = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import { selectSup, updateSup} from '../axios/index';
import { Edit } from '@element-plus/icons-vue'
import { useTitle } from '../store/index'

const size = ref('')      //尺寸
const dialog = ref(false) //对话框
const userInfo = ref({})  //用户信息
const userForm = ref({})  //表单信息
//打开对话框
const onDialog = () => {
  selectSup().then(res => {
    userForm.value = res.data
    dialog.value = true
  })
}
//提交表单
const onSubmit = async () => {
  await updateSup(userForm.value)
  await selectSup().then(res => {
    userInfo.value = res.data
    dialog.value = false
  })
}
//页面加载
onMounted( () => {
  selectSup().then(res => {
    userInfo.value = res.data
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

.el-select {
  width: 200px;
}
.el-input {
  width: 200px;
}
</style>