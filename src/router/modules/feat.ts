import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/feat',
    name: 'feat',
    meta: {
      title: 'feats',
      permiss: '2',
      icon: 'ep-reading',
      order: 2
    },
    children: [
      {
        path: 'download',
        name: 'download',
        meta: {
          title: 'download',
          permiss: '8'
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
      }
    ]
  }
]

export default routes
