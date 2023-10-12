<template>
  <div class="relative">
    <div class="absolute z-20 top-1 left-1">
      <el-button type="primary" @click="goBack" size="mini">全国</el-button>
    </div>
    <div class="bmap-box" id="bmapChartBox"></div>

    <div class="popWin" v-if="popShow" :style="{ left: popLeft + 'px', top: popTop + 'px' }">
      <div class="popWins">
        <div class="titleInfos">
          <p class="cityName">{{ name }}工厂</p>
          <span class="pop_close" @click="popShow = false">关闭</span>
        </div>
        <div class="popLine"></div>
        <div class="infoBody">
          <el-table class="homeTable" :data="tableData"></el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import basicDataApi from '~/api/basicData' //基础资料接口
import chinaMapData from './mapData/chinaMapData.json' //全国地图省份数据，自己取上面地址取
import { ElMessage, ElNotification } from 'element-plus'
import svg1 from './mapData/test'
import bg from '~/assets/images/img.jpg'

// const svg = `<?xml version='1.0' encoding='UTF-8' standalone='no'?>
// <svg height="209.973mm" baseProfile="tiny" xmlns:cc="http://creativecommons.org/ns#" viewBox="0 0 3507 2480" width="296.926mm" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//    <path name="哈哈" style="fill: #082141; fill-opacity: 0.9; stroke: transparent;" d="M726.185,1048.18 L2493.04,328.351 L2591.2,1898.89 L1020.66,2226.08 L726.185,1048.18"/>
// </svg>`

let myChart = ref()

let pointData = ref([]) //标点信息，需要动态获取，初始化全国地图的点位
let provinceCodeData = ref([]) //处理后全国省份数据带code
let mapStack = ref([]) //存储一下地图历史记录，用于返回
let nowChooseData = ref([]) //当前选择的数据源

let option = reactive({
  tooltip: {
    trigger: 'item'
  },
  geo: [
    {
      map: 'js',
      // aspectScale: 1,
      roam: true, // 是否允许缩放
      zoom: 1, // 默认显示级别
      center: [116.405285, 39.904989], // 地图中心点坐标
      label: {
        show: true, // 是否地图显示区域的文字，各省市的名字
        color: '#fff'
      },

      itemStyle: {
        // 区域颜色
        areaColor: {
          //image: bg,
          type: 'radial',
          x: 0.7,
          y: 0.5,
          r: 0.5,
          // 渐变效果
          colorStops: [
            {
              offset: 0,
              color: '#24cff4' // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: '#2babd9' // 50% 处的颜色
            },
            {
              offset: 1,
              color: '#236bb2' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },

        borderColor: '#37C1FD',
        borderWidth: 2
      },

      emphasis: {
        itemStyle: {
          shadowOffsetX: 5,
          shadowOffsetY: 5,
          areaColor: '#56dcf9' // 鼠标移入区域背景颜色
        },
        label: {
          show: 1,
          color: 'red'
        }
      },
      zlevel: 3
    }
  ],
  series: [
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      //symbol: 'diamond',
      showEffectOn: 'render',
      rippleEffect: {
        period: 10,
        scale: 6,
        brushType: 'fill'
      },
      zlevel: 10, // 这里是关键，一定要放在 series中，显示层级，
      emphasis: { scale: true },
      itemStyle: {
        // 点的颜色可以根据 params 参数里面的值去设定不通的颜色
        color: function (params) {
          if (params.name == '7300网关') {
            return 'red'
          }
          if (params.name == '700网关') {
            return 'yellow'
          }
          if (params.name == '5300网关') {
            return 'green'
          } else {
            return 'pink'
          }
        },
        shadowBlur: 10,
        shadowColor: '#333'
      },

      data: [] // 点的数据，包含经纬度
    }
  ]
})
// 测试标点数据
let gatewayPointData = reactive({
  黑龙江省: [
    {
      name: '7300网关',
      value: [126.642464, 45.756967]
    }
  ],
  哈尔滨市: [
    {
      name: '7300网关',
      value: [126.957401, 45.454116]
    },
    {
      name: '700网关',
      value: [126.394846, 45.778706]
    },
    {
      name: '5300网关',
      value: [126.606415, 45.807463]
    },
    {
      name: '300网关',
      value: [126.483958, 45.876779]
    },
    {
      name: '2300网关',
      value: [126.785501, 45.739871]
    }
  ]
})

let popShow = ref(false) //弹窗是否显示
let popLeft = ref(0) //弹窗X轴距离
let popTop = ref(0) //弹窗Y轴距离
let name = ref('') //当前点击省份
let tableData = ref([]) //table数据

onMounted(() => {
  // 渲染地图
  drawMap(chinaMapData, 0, [126.82862, 49.296976])
  getProvinceCode() //处理全国省份数据
  // 初始化mapStack数据，默认全国数据
  mapStack.value = []
  mapStack.value.push(chinaMapData)
})

// 处理全国省份数据
function getProvinceCode() {
  chinaMapData.features.forEach((item) => {
    provinceCodeData.value.push({
      name: item.properties.name,
      coordinateCenter: item.properties.center,
      cityCode: item.properties.adcode
    })
  })
}

// 返回全国
function goBack() {
  console.log(111)
  popShow.value = false
  mapStack.value = []
  mapStack.value.push(chinaMapData)
  drawMap(chinaMapData, 0, [126.82862, 49.296976])
}
// 设置地图配置信息
function setMapCenterZoomData(data, zoom, center) {
  option.series[0].data = data
  option.geo[0].zoom = zoom
  option.geo[0].center = center

  if (mapStack.value.length <= 1) {
    //设置图层位置
    option.geo[0].layoutSize = '100%'
    option.geo[0].layoutCenter = ['85%', '20%']
  } else {
    option.geo[0].layoutSize = ''
    option.geo[0].layoutCenter = []
  }
}
// 渲染地图
async function drawMap(json, type = 0, city) {
  // 防止echarts重复
  const dom = document.getElementById('bmapChartBox')
  if (!dom) {
    return
  }
  echarts.dispose(dom as HTMLElement)
  // 防止echarts重复

  myChart.value = echarts.init(dom)

  fetch(
    //'https://img.alicdn.com/imgextra/i3/O1CN0127O3dX20W68RLghAG_!!6000000006856-2-tps-662-108.png'
    'https://echarts.apache.org/examples/data/asset/geo/Sicily_prehellenic_topographic_map.svg',
    {
      mode: 'no-cors'
    }
  )
    .then((response) => response.blob())
    .then((myBlob) => {
      console.log(myBlob)
    })

  echarts.registerMap('js', json)
  // echarts.registerMap('js', { svg: svg1 })

  if (type == 1) {
    //地图点击进入
    pointData.value = gatewayPointData[city] //标点数据
    if (pointData.value) {
      //如果有标点数据
      setMapCenterZoomData(pointData.value, 1.2, pointData.value[0].value)
    } else {
      //如果没有标点数据
      // 使用测试数据 - 把当前选择地图数据作为标点数据
      nowChooseData.value.forEach((i) => {
        i.value = i.coordinateCenter
      })
      pointData.value = nowChooseData.value
      var center = nowChooseData.value[0].coordinateCenter //取当前选择省市区第一个数据的坐标
      setMapCenterZoomData(pointData.value, 1.2, center)
    }
  } else {
    //初始化进入
    myChart.value.clear()
    setMapCenterZoomData([], 1, [126.82862, 49.296976])
  }
  myChart.value.setOption(option)
  myChart.value.off('click')
  myChart.value.on('click', (param) => {
    // 点击弹窗方法
    // 点击获取经纬度
    let data = myChart.value.convertFromPixel('geo', [
      param.event.event.offsetX,
      param.event.event.offsetY
    ])
    popLeft.value = param.event.event.offsetX
    popTop.value = param.event.event.offsetY
    // 获取城市名称 list下的name值
    name.value = param.name
    popShow.value = true
    // 点击弹窗方法

    if (param.componentType == 'geo') {
      //点击地图
    } else {
      //点击标点不允许下钻
      return
    }
    // 省市区三级后跳出点击
    if (mapStack.value.length >= 3) {
      ElNotification.warning('没有更多啦！')

      return
    }

    const city = param.name
    // 获取点击对应的cityCode
    var cityCode = ''
    if (mapStack.value.length <= 1) {
      //初始化全国省份数据
      provinceCodeData.value.forEach((i) => {
        if (i.name == city) {
          cityCode = i.cityCode
        }
      })
    } else {
      //选择后的市区数据
      nowChooseData.value.forEach((i) => {
        if (i.name == city) {
          cityCode = i.cityCode
        }
      })
    }

    getHomeMapData(city, cityCode)
  })
}
// 获取基础配置数据
function getHomeMapData(city, cityCode) {
  var cityMapData //当前选中的省市区地图数据
  // 请求数据

  var data
  if (cityCode == 710000) {
    //台湾特殊处理，后缀没有_full
    data = {
      code: cityCode
    }
  } else {
    data = {
      code: cityCode + '_full'
    }
  }
  //通过接口获取点击下钻的地图数据
  basicDataApi
    .getHomeMapDataApi(data)
    .then((res) => {
      if (res) {
        cityMapData = res
        // 让历史数据一直保持在3个之内，存储显示过的地图数据
        if (mapStack.value.length < 3) {
          mapStack.value.push(cityMapData)
        }
        nowChooseData.value = []
        cityMapData.features.forEach((item) => {
          nowChooseData.value.push({
            name: item.properties.name,
            coordinateCenter: item.properties.center,
            cityCode: item.properties.adcode
          })
        })
        cityMapData && myChart.value.clear()
        cityMapData && drawMap(cityMapData, 1, city)
        getTableData() //获取table数据
      }
    })
    .catch((err: Error) => {
      ElMessage.error(err.message)
    })
}

//获取table数据
function getTableData() {
  tableData.value = [
    { num: 1, gatewayName: '网关1', status: '1', gatewayNum: '321', pointNum: '442' },
    { num: 1, gatewayName: '网关1', status: '2', gatewayNum: '321', pointNum: '442' },
    { num: 1, gatewayName: '网关1', status: '3', gatewayNum: '321', pointNum: '442' }
  ]
}
</script>

<style lang="scss" scoped>
.bmap-box {
  width: 100%;
  height: calc(100vh - 90px);
}

.popWin {
  position: absolute;
  left: 0;
  top: 0;
  background: #00305c;
  background-size: 100% 100%;
  width: 408px;
  height: 300px;
  z-index: 100;

  .popLine {
    width: 340px;
    height: 1px;
    background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
    opacity: 0.3;
    margin-left: 30px;
  }

  .titleInfos {
    text-align: center;
    margin-left: 30px;
    font-size: 22px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #00fdfe;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    align-content: flex-start;
    .pop_close {
      color: #bbb;
      cursor: pointer;
      padding: 5px;
      font-size: 12px;
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }
}

.infoBody {
  width: 100%;
  padding: 3%;
  .homeTable {
    border: 1px solid #0376ae;
    border-radius: 10px;
  }
}
.infoBody ::v-deep .plTableBox .el-table .cell.el-tooltip {
  border-bottom: 1px solid #086896;
}
.infoBody ::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
.infoBody ::v-deep .el-table tr {
  // background-color: transparent!important;
  background-color: #0b4d73;
}
.infoBody ::v-deep .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
}
.el-table::before {
  //去除底部白线
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.infoBody ::v-deep .plTableBox .el-table .el-table__header th {
  background-color: transparent;
}
.infoBody ::v-deep .plTableBox .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 77, 167, 1);
}
.infoBody ::v-deep .plTableBox .el-table--border td,
.infoBody ::v-deep .plTableBox .el-table--border th,
.infoBody
  ::v-deep
  .plTableBox
  .el-table__body-wrapper
  .el-table--border.is-scrolling-left
  ~ .el-table__fixed {
  border: none;
  color: #4daad3;
}
.infoBody ::v-deep .plTableBox .el-table--medium td {
  padding: 0;
}
.infoBody ::v-deep .plTableBox .el-table__header-wrapper {
  background-color: transparent;
}
.infoBody ::v-deep .plTableBox .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #103c5c;
}
</style>
