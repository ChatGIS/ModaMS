<template>
  <el-menu
      active-text-color="#ffd04b"
      :background-color="variables.menuBg"
      class="el-menu-vertical-demo"
      :default-active=defaultActive
      text-color="#fff"
      unique-opened
      router
      :collapse="!$store.getters.siderType"
  >
    <el-sub-menu :index="item.id" v-for="(item, index) in menusList" :key="item.id">
      <template #title>
        <el-icon>
          <component :is = "iconList[index]"></component>
        </el-icon>
        <span>{{ $t(`menus.${item.path}`) }}</span>
      </template>
      <el-menu-item :index="'/' + it.path" v-for="it in item.children"
                    :key="it.id"
                    @click="savePath(it.path)">
        <template #title>
          <el-icon>
            <component :is = "icon"></component>
          </el-icon>
          <span> {{ $t(`menus.${it.path}`) }} </span>
        </template>

      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import {ref} from "vue";
import variables from '@/styles/variables.scss'

// 定义菜单图标
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')
const defaultActive = ref(sessionStorage.getItem('path') || '/users.js')
const menusList = ref([])
const initMenuList = async () => {
  menusList.value = await menuList()
}
initMenuList()

// 点击保存路径
const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`)
}
</script>

<style lang="scss" scoped>

</style>