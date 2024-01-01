/*
 * @Author: lucidity99 lucidity929@163.com
 * @Date: 2023-04-23 13:20:11
 * @LastEditors: lucidity99 lucidity929@163.com
 * @LastEditTime: 2023-11-09 13:28:43
 * @FilePath: /mocha-vue3-system/src/router/modules/comp.ts
 * @Description:
 *

 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/comp',
    name: 'comp',
    component: Layout,
    meta: {
      title: 'components',
      icon: 'ep-goods',
      order: 3
    },
    redirect: '/comp/table',
    children: [
      {
        path: 'infinite',
        name: 'infinite',
        meta: {
          title: 'infinite',
          icon: 'ep-list'
        },
        component: () =>
          import(/* webpackChunkName: "upload" */ '~/views/comp/infiniteList/index.vue')
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          title: 'table'
        },
        redirect: '/comp/table/basic',
        children: [
          {
            path: 'basic',
            name: 'basicTable',
            meta: {
              title: 'basicTable'
            },
            component: () => import('~/views/comp/table/basicTable/index.vue')
          },
          {
            path: 'seniorSearch',
            name: 'seniorSearch',
            meta: {
              title: 'seniorSearch'
            },
            component: () => import('~/views/comp/table/seniorSearchTable/index.vue')
          },
          {
            path: 'acrossTable',
            name: 'acrossTable',
            meta: {
              title: 'accrossTable'
            },
            component: () => import('~/views/comp/table/acrossTable/index.vue')
          }
        ]
      },
      {
        path: 'form',
        name: 'form',
        meta: {
          title: 'form'
        },
        children: [
          {
            path: 'basic',
            name: 'basicForm',
            meta: {
              title: 'basicForm'
            },
            component: () => import('~/views/comp/form/BasicForm.vue')
          },
          {
            path: 'selectorWithPage',
            name: 'selectorWithPage',
            meta: {
              title: 'selectorWithPage'
            },
            component: () => import('~/views/comp/form/SelectorWithPage.vue')
          }
        ]
      },
      {
        path: 'upload',
        name: 'upload',
        meta: {
          title: 'upload',
          icon: 'ep-upload'
        },
        component: () => import(/* webpackChunkName: "upload" */ '~/views/comp/upload/upload.vue')
      },
      {
        path: 'icon',
        name: 'icon',
        meta: {
          title: 'icons',
          icon: 'ep-sunrise'
        },
        component: () => import(/* webpackChunkName: "icon" */ '~/views/feat/icons/index.vue')
      },
      {
        path: 'svg',
        name: 'svg',
        meta: {
          title: 'svg',
          icon: 'ep-sunrise'
        },
        component: () => import(/* webpackChunkName: "icon" */ '~/views/comp/svg/index.vue')
      },
      {
        path: 'canvas',
        name: 'canvas',
        meta: {
          title: 'canvas'
        },
        component: () => import(/* webpackChunkName: "icon" */ '~/views/comp/canvas/index.vue')
      }
    ]
  }
]

export default routes
