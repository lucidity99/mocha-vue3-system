import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/level',
    name: 'level',
    meta: {
      title: 'level',
      icon: 'ep-connection',
      order: 10
    },
    children: [
      {
        path: 'menu1',
        name: 'menu1',
        meta: {
          title: 'menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'menu1-1',
            meta: {
              title: 'menu11'
            },
            component: () => import('~/views/level/Menu1.vue')
          }
        ]
      },
      {
        path: 'menu2',
        name: 'menu2',
        meta: {
          title: 'menu2'
        },
        children: [
          {
            path: 'menu2-1',
            name: 'menu2-1',
            meta: {
              title: 'menu21'
            },

            children: [
              {
                path: 'menu2-1-1',
                name: 'menu2-1-1',
                meta: {
                  title: 'menu211'
                },
                component: () => import('~/views/level/Menu2.vue')
              }
            ]
          }
        ]
      }
    ]
  }
]

export default routes
