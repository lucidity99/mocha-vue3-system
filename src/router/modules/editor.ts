import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/editor',
    name: 'editor',
    meta: {
      title: 'editor',
      permiss: '8',
      icon: 'ep-document',
      order: 8
    },
    children: [
      {
        path: 'tinymce',
        name: 'tinymce',
        meta: {
          title: 'tinymce',
          permiss: '8'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/Tinymce.vue')
      },
      {
        path: 'wangEditor',
        name: 'wangEditor',
        meta: {
          title: 'wangEditor',
          permiss: '8'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/WangEditor.vue')
      },
      {
        path: 'markdown',
        name: 'markdown',
        meta: {
          title: 'markdownEditor',
          permiss: '9'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/Markdown.vue')
      },
      {
        path: 'codemirror',
        name: 'codemirror',
        meta: {
          title: 'codemirror',
          permiss: '9'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/Codemirror.vue')
      }
    ]
  }
]

export default routes
