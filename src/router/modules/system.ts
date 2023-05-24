import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'system',
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
          title: 'accountManagement'
        },
        component: () => import('~/views/system/account/index.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: 'roleManagement'
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
          title: 'deptManagement'
        },
        component: () => import('~/views/system/dept/index.vue')
      },
      {
        path: 'password',
        name: 'password',
        meta: {
          title: 'editPassword'
        },
        component: () => import('~/views/system/password/index.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        meta: {
          title: 'personalCenter'
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
