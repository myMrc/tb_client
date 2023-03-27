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
        <el-input v-model="seachTex" placeholder="搜索消息" />
      </el-col>
      <el-col :span="20" style="text-align: right">
        <el-button :icon="Plus" text type="primary" size="large">添加信息</el-button>
      </el-col>
    </el-row>
    <el-descriptions>
      <el-descriptions-item>
        <el-table :size="size"
                  :cell-style="{ textAlign: 'center' }"
                  :header-cell-style="{ 'text-align': 'center','background': '#18222c' }"
                  :data="tableData"
        >
          <el-table-column label="num" type="index" min-width="30" />
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" min-width="200" />
          <el-table-column label="操作" align="right" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="updateRow(scope.$index)">Edit</el-button>
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
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useTitle } from '../store/index'

const size = ref('')
const seachTex = ref('')
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

const updateRow = (index: number) => {
  console.log(index)
}

const deleteRow = (index: number) => {
  console.log(index)
}

// onMounted(()=>{
//
// })
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
</style>