<template>
  <el-dialog
      :model-value="dialogVisible"
      :title="dialogTitle"
      width="40%"
      @close="handleClose"
  >
    <el-form ref=formRef :model=form label-width="70px" :rules="rules">
      <el-form-item label="文章名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="所属网站" prop="website">
        <el-input v-model="form.website"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, reactive, defineProps, watch } from "vue";
import { addArticle, editArticle } from "@/api/article";
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const form = ref({
  name: '',
  url: '',
  type: '',
  website: ''
})
const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})

watch(
    () => props.dialogTableValue,
    () => {
      form.value = props.dialogTableValue
    },
    {deep: true, immediate: true})

const emits = defineEmits(['update:model-value', 'initUserList'])

const rules = reactive({
  name: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur',
    }
  ],
  url: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur',
    }
  ],
  website: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur',
    }
  ]
})

const handleClose = () => {
  emits('update:model-value', false)
}
const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === '添加文章'
          ? await addArticle(form.value)
          : await editArticle(form.value)
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
</script>

<style lang="scss" scoped>

</style>