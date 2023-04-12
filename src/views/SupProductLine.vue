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

    <el-row style="margin-bottom: 17px">
      <el-col :span="4" style="text-align: left">
        <el-input v-model="seachTex" @input="search" placeholder="搜索产品线" />
      </el-col>
      <el-col :span="20" style="text-align: right">
        <el-button :icon="Plus" text type="primary" @click="onDialog()"><b>添加产品线</b></el-button>
      </el-col>
    </el-row>

    <el-table :size="size" :cell-style="{ textAlign: 'center' }" :data="tableData"
              :header-cell-style="{ 'text-align': 'center','background': '#18222c' }"
    >
      <el-table-column label="序号" type="index" width="80" />
      <el-table-column prop="productLineName" label="产品线" />
      <el-table-column label="包含产品数量" >
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default v-if="proList.length > 0">
              <div style="text-align: center">
                <p style="color: #409eff">产品目录</p>
                <p v-for="pro in proList">{{pro.productName}}</p>
              </div>
            </template>
            <template #reference>
              <el-tag v-if="scope.row.productCount > 0"
                      type="success"
                      @mouseover="selectPro(scope.row.productLineId)">{{scope.row.productCount}}
              </el-tag>
              <el-tag v-eles @mouseover="selectPro(scope.row.productLineId)">{{scope.row.productCount}}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="scopes" label="零售价范围" width="350" />
      <el-table-column prop="purPrice" label="采购价" width="200" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="onDialog(scope.row.productLineId)">Edit</el-button>
          <el-popconfirm
              title="确定删除吗？"
              confirmButtonText='确定'
              cancelButtonText='取消'
              @confirm="remove(scope.row.productLineId)">
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
        <el-button type="primary" @click="onSubmit(userForm.productLineId)">
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
import { ElMessage } from 'element-plus'
import { select, selectById, insert, update, deleteById } from '../axios/productline'
import { selectList } from '../axios/product'

const size = ref('')        //尺寸
const seachTex = ref('')    //搜索框
const tableData = ref([])   //表格数据
const userForm = ref({})    //表单信息
const proList = ref({})     //产品列表
const dialog = ref(false)   //对话框
const dialogTitle = ref('') //框标题
const total = ref(0)        //总条数
const current = ref(1)      //当前页
const pageSize = ref(10)    //页大小

const changePage = (val:number) => {
  current.value = val
  search()
}

//产品目录
const selectPro = async (id:number) => {
  proList.value = await selectList(id)
}

//打开表单
const onDialog = async (id:number) => {
  if(id >0){
    dialogTitle.value = '修改产品线信息'
    userForm.value = await selectById(id)
  } else {
    dialogTitle.value = '添加产品线信息'
    userForm.value = {}
  }
  dialog.value = true
}
//提交表单
const onSubmit = async (id:number) => {
  id > 0 ? await update(userForm.value) : await insert(userForm.value)
  await search()
}
//模糊搜索
const search = () => {
  select(seachTex.value,current.value,pageSize.value).then((res:any) => {
    total.value = res.total
    pageSize.value = res.size
    current.value = res.current
    tableData.value = res.records
  })
}
//删除数据
const remove = async (id:number) => {
  await deleteById(id)
  await search()
}
//页面加载
onMounted(() => {
  search()
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