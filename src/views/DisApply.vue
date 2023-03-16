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
        <el-input v-model="state.seachTex" placeholder="模糊搜索" />
      </el-col>
      <el-col :span="20" style="text-align: right">
        <el-button :icon="Plus" >添加数据</el-button>
      </el-col>
    </el-row>
    <el-descriptions>
      <el-descriptions-item>
        <el-table :size="size"
                  :cell-style="{ textAlign: 'center' }"
                  :header-cell-style="{ 'text-align': 'center' }"
                  :data="state.tableData" style="width: 100%"
        >
          <el-table-column label="num" type="index" width="80" />
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
              >Edit
              </el-button>
              <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteRow(scope.$index)"
              >Remove
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { useTitle } from '../store/index'

const size = ref('')
const state = reactive({
  seachTex: '',
  tableData: [
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
  ]
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
</style>