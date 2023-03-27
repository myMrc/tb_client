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
      <el-col :span="4" style="text-align: left">
        <el-input v-model="seachTex" @input="seachProLine" placeholder="搜索产品线" />
      </el-col>
      <el-col :span="20" style="text-align: right">
        <el-button :icon="Plus" text type="primary" size="large" @click="onDialog()"><b>添加产品线</b></el-button>
      </el-col>
    </el-row>

    <el-table :size="size" :cell-style="{ textAlign: 'center' }" :data="tableData"
              :header-cell-style="{ 'text-align': 'center','background': '#18222c' }"
    >
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="productLineName" label="产品线" />
      <el-table-column prop="productLineId" label="包含产品数量" />
        <el-table-column prop="scopes" label="零售价范围" width="350" >
        </el-table-column>
      <el-table-column prop="purPrice" label="采购价" width="200" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="onDialog(scope.row.productLineId)">Edit</el-button>
          <el-button link type="primary" size="small" @click.prevent="deleteProLine(scope.row.productLineId)">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="1000" />
  </el-card>

  <el-dialog v-model="dialog" :title="dialogTitle" width="30%">
    <el-form  :inline="true"
              :model="userForm"
              label-width="100px"
    >
      <input v-model="userForm.productLineId" hidden/>

      <el-form-item label="产品线:" :label-width="formLabelWidth">
        <el-input v-model="userForm.productLineName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="采购价:" :label-width="formLabelWidth">
        <el-input type="number" v-model="userForm.purchasePrice" autocomplete="off" />
      </el-form-item>
      <el-form-item label="零售价范围:" :label-width="formLabelWidth">
        <el-input type="number" v-model="userForm.scopeBegin" autocomplete="off" />
      </el-form-item>
      <el-form-item label="---" :label-width="formLabelWidth">
        <el-input type="number" v-model="userForm.scopeEnd" autocomplete="off" />
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
import { selectProductline, addProductline, updateProductline, deleteProductline, selectProductlineById } from '../axios/index'
import { Plus } from '@element-plus/icons-vue'
import { useTitle } from '../store/index'

const size = ref('')      //尺寸
const seachTex = ref('')  //搜索框
const tableData = ref() //表格数据
const userForm = ref()  //表单信息
const dialog = ref(false) //对话框
const dialogTitle = ref('') //对话框标题
//打开对话框
const onDialog = async (id:number) => {
  if(id >0){
    dialogTitle.value = '修改产品线信息'
    userForm.value = await selectProductlineById(id)
  } else {
    dialogTitle.value = '添加产品线信息'
    userForm.value = {}
  }
  dialog.value = true
}
//提交表单
const onSubmit = async () => {
  userForm.value.productLineId > 0? await updateProductline(userForm.value) : await addProductline(userForm.value)
  dialog.value = false
  seachProLine()
}
//模糊搜索
const seachProLine = async () => {
  tableData.value = await selectProductline(seachTex.value)
  for (let i = 0; i < tableData.value.length; i++) {
    tableData.value[i].scopes = '标准价 '+tableData.value[i].scopeBegin +'% --- 标准价 '+ tableData.value[i].scopeEnd +'%'
    tableData.value[i].purPrice = '标准价 '+tableData.value[i].scopeBegin +'%'
  }
}
//删除
const deleteProLine = async (id:number) => {
  await deleteProductline(id)
  await seachProLine()
}
//页面加载
onMounted(() => {
  seachProLine()
})
</script>

<style scoped>
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