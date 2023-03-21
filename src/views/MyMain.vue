<template>
  <div class="box">
    <p>Welcome to ONY-DRP</p>
    <el-row style="justify-content: center">
      <el-col :span="9">
        <el-card :body-style="{ padding: '30px',background:'#18222c',border: '1px solid #213d5b'}">
          <img src="../assets/vite.svg" class="image" style="width: 98%"/>
          <div style="padding: 14px">
            <el-button @click="supDialog = true">供应商入驻</el-button>
            <div style="margin-top: 5px">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="9">
        <el-card :body-style="{ padding: '30px',background:'#18222c',border: '1px solid #213d5b' }">
          <img src="../assets/vue.svg" class="image"/>
          <div style="padding: 14px">
            <el-button @click="resDialog = true">分销商入驻</el-button>
            <div style="margin-top: 5px">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <el-dialog v-model="supDialog" title="供应商信息" width="50%">
    <el-form  :inline="true"
              :model="supForm"
              label-width="80px"
    >
      <el-form-item label="企业名称 :" :label-width="formLabelWidth">
        <el-input v-model="supForm.companyName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="企业介绍 :" :label-width="formLabelWidth">
        <el-input v-model="supForm.companyInfo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系人 :" :label-width="formLabelWidth">
        <el-input v-model="supForm.supplierName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号 :" :label-width="formLabelWidth">
        <el-input v-model="supForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱 :" :label-width="formLabelWidth">
        <el-input v-model="supForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="旺旺 :" :label-width="formLabelWidth">
        <el-input v-model="supForm.wang" autocomplete="off" />
      </el-form-item>

      <el-form-item label="主营品牌 :" :label-width="formLabelWidth">
        <el-select  placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item label="主营类目 :" :label-width="formLabelWidth">
        <el-select placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="supDialog = false">Cancel</el-button>
        <el-button type="primary" @click="supSubmit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="resDialog" title="分销商信息" width="50%">
    <el-form  :inline="true"
              :model="resForm"
              label-width="80px"
    >
      <el-form-item label="店铺名称 :" :label-width="formLabelWidth">
        <el-input v-model="resForm.companyName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="店铺介绍 :" :label-width="formLabelWidth">
        <el-input v-model="resForm.companyInfo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系人 :" :label-width="formLabelWidth">
        <el-input v-model="resForm.resellerName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号 :" :label-width="formLabelWidth">
        <el-input v-model="resForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱 :" :label-width="formLabelWidth">
        <el-input v-model="resForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="旺旺 :" :label-width="formLabelWidth">
        <el-input v-model="resForm.wang" autocomplete="off" />
      </el-form-item>

      <el-form-item label="主营品牌 :" :label-width="formLabelWidth">
        <el-select  placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item label="主营类目 :" :label-width="formLabelWidth">
        <el-select placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resDialog = false">Cancel</el-button>
        <el-button type="primary" @click="resSubmit">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { updataUser, addSup, addRes } from '../axios/index'
import { resetRouter, addRouter, saveRouter, saveMenu} from '../router/index'
import { supRouter, resRouter, supMenu, resMenu } from '../utils/index'
import router from "../router";

const supForm = ref({})
const resForm = ref({})
const supDialog = ref(false)
const resDialog = ref(false)
const currentDate = ref(new Date())

const supSubmit = async () => {
  await addSup(supForm.value)
  await updataUser(1)
  resetRouter()
  saveRouter.value = supRouter
  saveMenu.value = supMenu
  addRouter(saveRouter.value)
  router.push("/")
  supDialog.value = false
}
const resSubmit = async () => {
  await addRes(resForm.value)
  await updataUser(2)
  resetRouter()
  saveRouter.value = resRouter
  saveMenu.value = resMenu
  addRouter(saveRouter.value)
  router.push("/")
  resDialog.value = false
}
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
.el-select {
  width: 200px;
}
.el-input {
  width: 200px;
}
</style>