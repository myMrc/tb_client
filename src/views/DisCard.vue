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
      <!--        title="Vertical list with border"-->
      <el-descriptions-item label="店铺名称：">{{userInfo.distributorName}}</el-descriptions-item>
      <el-descriptions-item label="开店日期：">{{userInfo.openingDate}}</el-descriptions-item>
      <el-descriptions-item label="联系人：">{{userInfo.contacts}}</el-descriptions-item>
      <el-descriptions-item label="手机号：">{{userInfo.phone}}</el-descriptions-item>
      <el-descriptions-item label="主营类目：">No.1188：{{userInfo.mainClass}}</el-descriptions-item>
      <el-descriptions-item label="主营品牌：">No.1188：{{userInfo.mainBrand}}</el-descriptions-item>
      <el-descriptions-item label="&nbsp; &nbsp; 邮箱：">{{userInfo.email}}</el-descriptions-item>
      <el-descriptions-item label="&nbsp; &nbsp; 旺旺："><el-tag size="small">{{userInfo.wang}}</el-tag></el-descriptions-item>
    </el-descriptions>
  </el-card>

  <el-dialog v-model="dialog" title="Shipping address" width="50%">
    <el-form  :inline="true"
              :model="userForm"
             label-width="80px"
    >
      <input v-model="userForm.distributorInfoID" hidden />

      <el-form-item label="店铺名称:" :label-width="formLabelWidth">
        <el-input v-model="userForm.distributorName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="开店日期:" :label-width="formLabelWidth">
        <el-input type="date" v-model="userForm.openingDate" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系人:" :label-width="formLabelWidth">
        <el-input v-model="userForm.contacts" autocomplete="off" />
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
import {onMounted, ref} from 'vue'
import { selectDis, updateDis } from '../axios/index';
import { Edit } from '@element-plus/icons-vue'
import { useTitle } from '../store/index'

const size = ref('')
const dialog = ref(false)
const userInfo = ref({})
const userForm = ref({})
const onDialog = () => {
  // selectDis().then(res => {
  //   userForm.value = res.data
  // })
  dialog.value = true
}
const onSubmit = () => {
  updateDis(userForm.value).then(res => {
    userInfo.value = res.data
  })
  dialog.value = false
}
onMounted( () => {
  selectDis().then(res => {
    userInfo.value = res.data
    userForm.value = res.data
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