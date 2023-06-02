import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/page',
    name: 'page',
    component: Layout,
    redirect: '/page/tabs',
    meta: {
      title: 'pages',
      icon: 'ep-brush',
      order: 3
    },

    children: [
      {
        path: 'tabs',
        name: 'tabs',
        meta: {
          title: 'tab',
          icon: 'ep-price-tag'
        },

        component: () => import(/* webpackChunkName: "tabs" */ '~/views/pageDemo/tabs.vue')
      }
    ]
  }
]

export default routes
