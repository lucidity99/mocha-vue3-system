import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/chart',
    name: 'chart',
    component: Layout,
    redirect: '/chart/echart',
    meta: {
      title: 'chart',
      icon: 'ep-pie-chart',
      order: 9
    },
    children: [
      {
        path: 'echart',
        name: 'echart',
        meta: {
          title: 'eChart'
        },
        component: () => import('~/views/chart/EChart.vue')
      },
      {
        path: 'map',
        name: 'map',
        meta: {
          title: 'map'
        },
        component: () => import('~/views/chart/echartMap.vue')
      }
    ]
  }
]

export default routes
