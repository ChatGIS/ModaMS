<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2023-11-14 14:07:01
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2023-11-14 15:10:43
 * @FilePath: \ModaMS\src\views\saying\components\dialog.vue
 * @Description: 
-->
<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" width="40%" @close="handleClose">
    <el-form ref=formRef :model=form label-width="70px" :rules="rules">
      <el-form-item label="语录" prop="name">
        <el-input v-model="form.name" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="书名" prop="book">
        <el-input v-model="form.book"></el-input>
      </el-form-item>
      <el-form-item label="文章名" prop="article">
        <el-input v-model="form.article"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, reactive, defineProps, watch } from "vue";
import { addSaying, editSaying } from "@/api/saying";
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const form = ref({
  name: '',
  author: '',
  book: '',
  article: ''
})
const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => { }
  }
})
const emits = defineEmits(['update:model-value', 'initUserList'])

const rules = reactive({
  name: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur',
    }
  ],
})

const handleClose = () => { 
  emits('update:model-value', false)
}
// 确认
const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === '添加语录'
        ? await addSaying(form.value)
        : await editSaying(form.value)
      ElMessage({
        message: '成功',
        type: 'success',
      })
      emits('initUserList')
      handleClose()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

watch(
  () => {
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>

</style>