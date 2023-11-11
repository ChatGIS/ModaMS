<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('tableSaying.placeholder')" clearable v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initSayingList">{{ $t('tableSaying.search') }}</el-button>
      <el-button type="primary" @click="handleDialogValue(null)">{{ $t('tableSaying.add') }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column :width="item.width" :prop=item.prop :label="$t(`tableSaying.${item.label}`)"
        v-for="(item, index) in options" :key="index">
        <template v-slot="{ row }" v-if="item.prop === 'id'">
          {{ row.id }}
        </template>
        <template v-slot="{ row }" v-if="item.prop === 'name'">
          {{ row.name }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'author'">
          {{ row.author }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'book'">
          {{ row.book }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'article'">
          {{ row.article }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{$filters.filterTimes(row.create_time)}}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'update_time'">
          {{$filters.filterTimes(row.update_time)}}
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" @click="handleDialogValue(row)"></el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDelSaying(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage=queryForm.pagenum v-model:page-size=queryForm.pagesize
      :page-sizes="[7, 10, 20, 50]" :small="small" :disabled="disabled" :background="background"
      layout="total, sizes, prev, pager, next, jumper" :total=total @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </el-card>
  <Dialog v-model="dialogVisible" :dialogTitle="dialogTitle" v-if=dialogVisible @initUserList="initSayingList"
    :dialogTableValue="dialogTableValue" :selectedTagIds="selectedTagIds"></Dialog>
</template>

<script setup>
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getSaying, deleteSaying } from "@/api/saying";
import { options } from "./options";
import Dialog from "./components/dialog"
import { isNull } from "@/utils/filters";

const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 7,
  type: 0
})
const total = ref(0)
const tableData = ref([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTableValue = ref({})

const initSayingList = async () => {
  const res = await getSaying(queryForm.value)
  console.log(res);
  total.value = res.total
  tableData.value = res.sayings;
}

initSayingList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initSayingList()
}

// 当前页切换
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initSayingList()
}

// 改变用户状态
const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state)
  ElMessage({
    message: '更新成功',
    type: 'success',
  })
}

// 添加/编辑弹框
const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加语录'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑语录'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}

/**
 * @description: 删除操作
 * @param {*} row
 * @return {*}
 */
const handleDelSaying = (row) => {
  ElMessageBox.confirm(
    '确定要删除吗?',
    'Warning',
    {
      confirmButtonText: '删除',
      cancelButtonText: '不删除',
      type: 'warning',
    }
  ).then(async () => {
    await deleteSaying(row.id)
    initSayingList()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  justify-content: right;
}
</style>
