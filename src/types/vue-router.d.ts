import { _RouteRecordBase, RouteMeta } from 'vue-router'

declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean
  }

  interface RouteMeta {
    order?: number
    roles?: array
  }
}
