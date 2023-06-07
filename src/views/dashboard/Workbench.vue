<template>
  <div class="container">
    <div class="flex items-center justify-between px-6 pt-4 mb-8">
      <div class="flex items-center">
        <el-avatar size="large" class="mr-4" :src="imgurl" />
        <div>
          <p class="mb-2">早安, Vivian, 开始您一天的工作吧！</p>
          <p class="text-gray-400">今日晴，20℃ - 32℃！</p>
        </div>
      </div>
      <div class="flex">
        <div class="mr-10 text-right">
          <p class="mb-2 text-gray-400">待办</p>
          <p class="text-xl">2/10</p>
        </div>
        <div class="mr-10 text-right">
          <p class="mb-2 text-gray-400">项目</p>
          <p class="text-xl">5</p>
        </div>
        <div class="text-right">
          <p class="mb-2 text-gray-400">应收</p>
          <p class="text-xl">5000</p>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="w-2/3 mr-4">
        <el-card class="box-card">
          <template #header>
            <div class="flex justify-between card-header">
              <span>最新动态</span>
              <el-link v-permiss="['2']">查看更多</el-link>
              <el-link v-auth="'super1'">查看更多</el-link>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
      </div>
      <div class="w-1/3">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>快捷导航</span>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
        <el-card class="mt-4"><PieChart /></el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Workbench">
import { reactive } from 'vue'
import imgurl from '~/assets/images/img.jpg'
import PieChart from './components/PieChart.vue'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()

const name = userStore.username
const role: string = name === 'admin' ? '超级管理员' : '普通用户'

const options = {
  type: 'bar',
  title: {
    text: '最近一周各品类销售图'
  },
  xRorate: 25,
  labels: ['周一', '周二', '周三', '周四', '周五'],
  datasets: [
    {
      label: '家电',
      data: [234, 278, 270, 190, 230]
    },
    {
      label: '百货',
      data: [164, 178, 190, 135, 160]
    },
    {
      label: '食品',
      data: [144, 198, 150, 235, 120]
    }
  ]
}
const options2 = {
  type: 'line',
  title: {
    text: '最近几个月各品类销售趋势图'
  },
  labels: ['6月', '7月', '8月', '9月', '10月'],
  datasets: [
    {
      label: '家电',
      data: [234, 278, 270, 190, 230]
    },
    {
      label: '百货',
      data: [164, 178, 150, 135, 160]
    },
    {
      label: '食品',
      data: [74, 118, 200, 235, 90]
    }
  ]
}
const todoList = reactive([
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: true
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: true
  }
])
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
</style>
