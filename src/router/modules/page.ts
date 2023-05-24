import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/page',
    name: 'page',
    meta: {
      title: 'pages',
      icon: 'ep-brush',
      order: 3
    },
    redirect: '/page/tabs',
    children: [
      {
        path: 'tabs',
        name: 'tabs',
        meta: {
          title: 'tab',
          permiss: '3',
          icon: 'ep-price-tag'
        },

        component: () => import(/* webpackChunkName: "tabs" */ '~/views/pageDemo/tabs.vue')
      }
    ]
  }
]

export default routes
