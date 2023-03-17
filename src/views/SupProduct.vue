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
        <el-input v-model="seachTex" placeholder="搜索产品" />
      </el-col>
      <el-col :span="20" style="text-align: right">
        <el-button :icon="Plus" text type="primary" size="large" @click="dialog = true"><b>添加新产品</b></el-button>
      </el-col>
    </el-row>
    <el-descriptions>
      <el-descriptions-item>
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
              <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">Edit</el-button>
              <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-descriptions-item>
    </el-descriptions>
    <el-row>
      <el-col :span="17"></el-col>
      <el-col :span="7">
        <el-pagination layout="prev, pager, next" :total="1000" />
      </el-col>
    </el-row>
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
import { selectSupPro } from '../axios/index'
import { Plus } from '@element-plus/icons-vue'
import { useTitle } from '../store/index'

const size = ref()
const seachTex = ref()
const tableData = ref()
const userForm = ref({})
const dialog = ref(false)
const onSubmit = () => {
  dialog.value = false
}
onMounted(()=>{
  selectSupPro().then(res => {
    tableData.value = res.data
    for (let i = 0; i < tableData.value.length; i++) {
      for (let j = 0; j < res.data.length; j++) {
        tableData.value[i].scopes = '标准价 '+res.data[i].scopeBegin +'% --- 标准价 '+ res.data[i].scopeEnd +'%'
        tableData.value[i].purchasePrice = '标准价 '+res.data[i].scopeBegin +'%'
      }
    }
  })
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