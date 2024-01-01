/*
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2023-06-05 22:42:28
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2023-10-26 14:05:13
 * @FilePath: /mocha-vue3-system/src/router/modules/feat.ts
 * @Description:
 *
 * 湖南灵之心, All Rights Reserved.
 */
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
        path: 'media',
        name: 'media',
        meta: {
          title: 'media'
        },
        redirect: 'previewPDF',
        children: [
          {
            path: 'previewPDF',
            name: 'previewPDF',
            meta: {
              title: 'previewPDF'
            },
            component: () =>
              import(/* webpackChunkName: "feat" */ '~/views/feat/media/PreviewPDF.vue')
          },
          {
            path: 'videojs',
            name: 'videojs',
            meta: {
              title: 'videojs'
            },
            component: () => import(/* webpackChunkName: "feat" */ '~/views/feat/media/Videojs.vue')
          }
        ]
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
