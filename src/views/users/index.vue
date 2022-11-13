<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('tableUser.placeholder')"
          clearable
          v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUsersList">{{ $t('tableUser.search') }}</el-button>
      <el-button type="primary" @click="handleDialogValue(null)">{{ $t('tableUser.adduser') }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column :width="item.width"
          :prop=item.prop :label="$t(`tableUser.${item.label}`)" v-for="(item, index) in options" :key="index">
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.state" @change="changeState(row)"/>
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{$filters.filterTimes(row.create_time)}}
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" @click="handleDialogValue(row)"></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="delUser(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:currentPage=queryForm.pagenum
        v-model:page-size=queryForm.pagesize
        :page-sizes="[5, 10, 20, 50]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total=total
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-card>
  <Dialog v-model="dialogVisible"
          :dialogTitle="dialogTitle"
          v-if=dialogVisible
          @initUserList="initGetUsersList"
          :dialogTableValue="dialogTableValue"></Dialog>
</template>

<script setup>
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUser, changeUserState,deleteUser } from "@/api/users";
import { options } from "./options";
import Dialog from "./components/dialog"
import { isNull } from "@/utils/filters";
import { useI18n } from "vue-i18n";

const i18n = useI18n()
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 5
})
const total = ref(0)
const tableData = ref([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTableValue = ref({})

const initGetUsersList = async () => {
  const res = await getUser(queryForm.value)
  total.value = res.total
  tableData.value = res.users
}

initGetUsersList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1
  queryForm.value.pagesize = pageSize
  initGetUsersList()
}

// 当前页切换
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum
  initGetUsersList()
}

// 改变用户状态
const changeState = async (info) => {
  await changeUserState(info.id, info.state)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success',
  })
}

// 添加/编辑用户弹框显隐
const handleDialogValue = (row) => {
  if (isNull(row)){
    dialogTitle.value = '添加用户'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }

  dialogVisible.value = true
}
const delUser = (row) => {
  ElMessageBox.confirm(
    '确定要删除用户?',
    'Warning',
    {
      confirmButtonText: '删除',
      cancelButtonText: '不删除',
      type: 'warning',
    }
  ).then(async () => {
    await deleteUser(row.id)
    initGetUsersList()
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
