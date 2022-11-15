<template>
  <el-dialog :model-value="dialogVisible" :title="dialogTitle" width="40%" @close="handleClose">
    <el-form ref=formRef :model=form label-width="70px" :rules="rules">
      <el-form-item label="网站名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="favicon">
        <el-input v-model="form.favicon"></el-input>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-select v-model="selectedTags" multiple placeholder="Select" style="width: 400px">
          <el-option v-for="item in allTags" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" type="textarea" />
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
import { addWebsite, editWebsite } from "@/api/website";
import { ElMessage } from 'element-plus'
import { getTags } from "@/api/tag";
// 编辑时，已存在的标签
const selectedTags = ref([])
// 所有标签，用于生成选择框选项
const allTags = ref([])
const formRef = ref(null)
const form = ref({
  name: '',
  url: '',
  tags: '',
  description: '',
  favicon: ''
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
// 侦听器
watch(
  () => props.dialogTableValue,
  () => {debugger
    form.value = props.dialogTableValue
    // 将字符串（例如"1,2"）转换成整数数组（例如：[1,2]）
    let tags = []
    if (form.value.tags_id) {
      let tagsStrArr = form.value.tags_id.split(",");
      for (let i = 0; i < tagsStrArr.length; i++) {
        tags.push(parseInt(tagsStrArr[i]))
      }
    }

    selectedTags.value = tags
    console.log(form.value.tags_id)
  },
  { deep: true, immediate: true }
)

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
      required: false,
      message: '请选择标签',
      trigger: 'change',
    }
  ]
})

const handleClose = () => { 
  emits('update:model-value', false)
}
// 确认
const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      debugger
      form.value.tags = selectedTags.value
      props.dialogTitle === '添加网站'
        ? await addWebsite(form.value)
        : await editWebsite(form.value)
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

// 获取标签的条件
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 100
})

const getTag = async () => {
  const res = await getTags(queryForm.value)
  allTags.value = res.tags
}
getTag()
</script>

<style lang="scss" scoped>

</style>