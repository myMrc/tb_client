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
    <el-row style="margin-bottom: 10px">
      <el-col :span="4" style="text-align: left">
        <el-input v-model="seachTex" placeholder="搜索产品" />
      </el-col>
      <el-col :span="20" style="text-align: right">
        <el-button :icon="Plus" text type="primary" size="large" @click="dialog = true"><b>添加新产品</b></el-button>
      </el-col>
    </el-row>
    <el-table :size="size" :cell-style="{ textAlign: 'center' }" :data="tableData"
              :header-cell-style="{ 'text-align': 'center','background': 'none' }">
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="ProductTitle" label="产品" />
      <el-table-column prop="ProductLineID" label="产品线" />
      <el-table-column prop="ProductInventory" label="产品库存" />
      <el-table-column prop="ProductPrice" label="标准价" />
      <el-table-column prop="PurchasePrice" label="采购价" />
      <el-table-column prop="scopes" label="零售价区间" width="220" />
      <el-table-column prop="ProductStatus" label="发布状态" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="onDialog(scope.row.productLineId)">Edit</el-button>
          <el-popconfirm
              title="确定删除吗？"
              confirmButtonText='确定'
              cancelButtonText='取消'
              @confirm="handleDeleteOne(scope.row.productLineId)">
            <template #reference>
              <el-button link type="primary" size="small">Remove</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="example-pagination-block page">
      <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="changePage"
      />
    </div>
  </el-card>

  <el-dialog v-model="dialog" title="Shipping address" width="30%">
    <el-form  :inline="true"
              :model="userForm"
              label-width="100px"
    >
      <input v-model="userForm.SupplierInfoID" hidden />

      <el-form-item label="产品线名称:" :label-width="formLabelWidth">
        <el-input v-model="userForm.companyName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="采购价:" :label-width="formLabelWidth">
        <el-input v-model="userForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="零售价范围:" :label-width="formLabelWidth">
        <el-input v-model="userForm.companyInfo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="---" :label-width="formLabelWidth">
        <el-input v-model="userForm.contacts" autocomplete="off" />
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
import { Plus } from '@element-plus/icons-vue'
import { useTitle } from '../store/index'
import {
  selectProduct,
  addProductline,
  updateProductline,
  deleteProductline,
  selectProductlineById,
  selectProductByPl
} from '../axios/index'

const size = ref('')        //尺寸
const seachTex = ref('')    //搜索框
const tableData = ref()           //表格数据
const userForm = ref()            //表单信息
const dialog = ref(false)   //对话框
const dialogTitle = ref('') //框标题
const total = ref(0)        //总条数
const current = ref(1)      //当前页
const pageSize = ref(10)    //页大小

const changePage = (val:number) => {
  current.value = val
  seachProLine()
}

//打开对话框
const onDialog = async (id:number) => {
  // if(id >0){
  //   dialogTitle.value = '修改产品线信息'
  //   userForm.value = await selectProductlineById(id)
  // } else {
  //   dialogTitle.value = '添加产品线信息'
  //   userForm.value = {}
  // }
  dialog.value = true
}
//提交表单
const onSubmit = async () => {
  // userForm.value.productLineId > 0? await updateProductline(userForm.value) : await addProductline(userForm.value)
  // dialog.value = false
  // seachProLine()
}
//模糊搜索
const select = async () => {
  const res = await selectProduct(seachTex.value,current.value,pageSize.value)
  tableData.value = res.records
  total.value = res.total
  current.value = res.current
  pageSize.value = res.size
  // for (let i = 0; i < tableData.value.length; i++) {
  //   tableData.value[i].scopes = '标准价 '+tableData.value[i].scopeBegin +'% --- 标准价 '+ tableData.value[i].scopeEnd +'%'
  //   tableData.value[i].purPrice = '标准价 '+tableData.value[i].scopeBegin +'%'
  // }
}
//删除
const handleDeleteOne = async (id:number) => {
  // let count:any = await selectProductByPl(id)
  // if ( count > 0){
  //   ElMessage.warning("产品线包含产品不可删除！")
  //   return
  // }
  // await deleteProductline(id)
  // await seachProLine()
}
//页面加载
onMounted(() => {
  select()
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
}

.page{
  display: inline-block;
  margin-top: 10px;
}

.el-select {
  width: 200px;
}
.el-input {
  width: 200px;
}
</style>