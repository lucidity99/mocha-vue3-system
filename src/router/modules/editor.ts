import { RouteRecordRaw } from 'vue-router'
import Layout from '~/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    meta: {
      title: 'editor',
      icon: 'ep-document',
      order: 8
    },
    children: [
      {
        path: 'tinymce',
        name: 'tinymce',
        meta: {
          title: 'tinymce'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/Tinymce.vue')
      },
      {
        path: 'wangEditor',
        name: 'wangEditor',
        meta: {
          title: 'wangEditor'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/WangEditor.vue')
      },
      {
        path: 'markdown',
        name: 'markdown',
        meta: {
          title: 'markdownEditor'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/Markdown.vue')
      },
      {
        path: 'codemirror',
        name: 'codemirror',
        meta: {
          title: 'codemirror'
        },
        component: () => import(/* webpackChunkName: "editor" */ '~/views/editor/Codemirror.vue')
      }
    ]
  }
]

export default routes
