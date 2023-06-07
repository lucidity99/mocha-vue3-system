import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/feat',
    name: 'feat',
    component: Layout,
    meta: {
      title: 'feats',
      icon: 'ep-reading',
      order: 2
    },
    children: [
      {
        path: 'download',
        name: 'download',
        meta: {
          title: 'download'
        },
        component: () => import(/* webpackChunkName: "feat" */ '~/views/feat/download.vue')
      },
      {
        path: 'previewPDF',
        name: 'previewPDF',
        meta: {
          title: 'previewPDF'
        },
        component: () => import(/* webpackChunkName: "feat" */ '~/views/feat/PreviewPDF.vue')
      },
      {
        path: 'directives',
        name: 'directives',
        meta: {
          title: 'customDirectives'
        },
        children: [
          {
            path: 'index',
            name: 'diretivesAll',
            meta: {
              title: 'customDirectives'
            },
            component: () => import(/* webpackChunkName: "feat" */ '~/views/feat/direct/index.vue')
          },
          {
            path: 'watermark',
            name: 'watermark',
            meta: {
              title: 'watermark'
            },
            component: () =>
              import(/* webpackChunkName: "feat" */ '~/views/feat/direct/Watermark.vue')
          },
          {
            path: 'adaptive',
            name: 'adaptive',
            meta: {
              title: 'adaptiveHeight'
            },
            component: () =>
              import(/* webpackChunkName: "feat" */ '~/views/feat/direct/Adaptive.vue')
          }
        ]
      },
      {
        path: 'avatar',
        name: 'avatar',
        meta: {
          title: 'avatar'
        },
        component: () => import(/* webpackChunkName: "feat" */ '~/views/feat/Avatar.vue')
      },
      {
        path: 'GSAP',
        name: 'GSAP',
        meta: {
          title: 'GSAP'
        },
        component: () => import(/* webpackChunkName: "feat" */ '~/views/feat/GSAP.vue')
      }
    ]
  }
]

export default routes
