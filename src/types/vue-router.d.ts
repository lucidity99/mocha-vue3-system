import { _RouteRecordBase } from 'vue-router'

declare module 'vue-router' {
  interface _RouteRecordBase {
    meta: {
      order?: number
    }
    hidden?: boolean
  }
}
