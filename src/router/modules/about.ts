import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    component: Layout,
    redirect: '/about/index',
    meta: {
      title: 'about',
      icon: 'ep-mic',
      order: 100
    },
    children: [
      {
        path: 'index',
        name: 'aboutPage',
        component: () => import('~/views/system/About.vue'),
        meta: {
          title: 'about'
        }
      }
    ]
  }
]

export default routes
