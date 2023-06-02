import { RouteRecordRaw } from 'vue-router'
import { RoleEnum } from '~/enums/roleEnum'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: {
      title: 'system',
      icon: 'ep-setting',
      order: 5
    },
    redirect: '/system/account',
    children: [
      {
        path: 'account',
        name: 'account',
        meta: {
          title: 'accountManagement',
          roles: [RoleEnum.USER]
        },
        component: () => import('~/views/system/account/index.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: 'roleManagement',
          roles: [RoleEnum.SUPER]
        },
        component: () => import('~/views/system/role/index.vue')
      },

      {
        path: 'menu',
        name: 'menu',
        meta: {
          title: 'menuManagement'
        },
        component: () => import('~/views/system/menu/index.vue')
      },
      {
        path: 'dept',
        name: 'dept',
        meta: {
          title: 'deptManagement',
          roles: [RoleEnum.SUPER]
        },
        component: () => import('~/views/system/dept/index.vue')
      },
      {
        path: 'password',
        name: 'password',
        meta: {
          title: 'editPassword',
          roles: [RoleEnum.USER]
        },
        component: () => import('~/views/system/password/index.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        meta: {
          title: 'personalCenter',
          roles: [RoleEnum.USER]
        },
        component: () => import('~/views/system/profile/index.vue')
      },
      {
        path: 'messageCenter',
        name: 'messageCenter',
        meta: {
          title: 'messageCenter'
        },
        component: () => import('~/views/messageCenter/index.vue')
      }
    ]
  }
]

export default routes
