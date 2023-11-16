<!--
 * @Author: Dreamice dreamice13@foxmail.com
 * @Date: 2022-11-13 17:44:03
 * @LastEditors: Dreamice dreamice13@foxmail.com
 * @LastEditTime: 2023-11-20 09:07:21
 * @FilePath: \ModaMS\src\views\dashbord\index.vue
 * @Description: 
-->
<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-card shadow="always"> 
        <span>语录数量</span>
        <div class="big-number" >
          {{ sayingTotalCount }} 
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="always"> 
        <span>网站数量</span>
        <div class="big-number" >
          {{ webTotalCount }} 
        </div>
      </el-card>
    </el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple-light" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="4"><div class="grid-content ep-bg-purple-light" /></el-col>
  </el-row>
  <div id="sayingPie" style="width: 70%; height: 400px;"></div>
  <div ref="chartRef" style="width: 70%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { groupSaying, totalSaying } from "@/api/saying"
import { groupWeb, totalWeb } from "@/api/website"
import * as echarts from 'echarts';

const chartRef = ref(null);
const sayingTotalCount = ref(0);
const webTotalCount = ref(0);

onMounted(() => {
  initTotal();
  initSayingGroup();
  initWebGroup();

  
});
const initTotal = async () => {
  const resSaying = await totalSaying()
  sayingTotalCount.value = resSaying.total;
  const resWeb = await totalWeb()
  webTotalCount.value = resWeb.total;
}
/**
 * @description: 初始化语录分组
 * @return {*}
 */
const initSayingGroup = async () => {
  const res = await groupSaying()
  const chart = echarts.init(document.getElementById('sayingPie'));
  const option = {
    title: {
      text: '语录',
      subtext: '按作者分组',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right'
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: '50%',
        data: res.group,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  chart.setOption(option);
}

/**
 * @description: 初始化网站分组
 * @return {*}
 */
const initWebGroup = async() => {
  const res = await groupWeb()
  const chart = echarts.init(chartRef.value);
  const option = {
    title: {
      text: '网站',
      subtext: '按标签分组',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right'
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: '50%',
        data: res.group,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  chart.setOption(option);
}

</script>
<style scoped>
/* 设置大屏数字的字体样式 */
.big-number {
  font-family: Arial, sans-serif; /* 设置字体家族 */
  font-size: 48px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体粗细 */
  color: #348ae5; /* 设置字体颜色 */
  text-align: center; /* 设置文本居中 */
}
</style>
