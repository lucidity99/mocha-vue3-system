import { UserInfo } from '~/types/index'
import { RouteComponent, RouteMeta, RouteRecordRaw } from 'vue-router'
import systemApi from '~/api/system'
import Layout from '~/layout/index.vue'
import { routeModuleList } from '~/router'
import { useUserStore } from '~/store/user'

// 后端接口返回的路由元素
interface AsyncRouteItem {
  path: string
  name: string
  component: string | RouteComponent
  meta?: RouteMeta
  children?: AsyncRouteItem[]
}

const modules = import.meta.glob('~/views/**/**.vue')

// 后端路由模式
async function getBackAsyncRoutes() {
  const useUser = useUserStore()
  return await systemApi.getRoutes({ userid: useUser.userid })
}

// 把接口路由组装成前端可用结构
function formatAsyncRoutes(routes: any[]) {
  routes.forEach((r) => {
    if (r.component === 'layout' || !r.component) {
      r.component = Layout
    } else {
      r.component = modules[`/src/views${r.component}`]
    }
    if (r.children && r.children.length > 0) {
      r.children = formatAsyncRoutes(r.children)
    }
  })
  return routes
}

// 过滤没有角色权限的路由
function filterRoute(route: RouteRecordRaw): boolean {
  const useUser = useUserStore()
  if (!route.meta?.roles) return true
  else if (route.meta.roles.includes(useUser.role)) return true
  else return false
}

function filterFunc(routes: RouteRecordRaw[]) {
  routes = routes.filter(filterRoute)

  routes.forEach((element) => {
    if (element.children) {
      element.children = filterFunc(element.children)
    }
    if (
      element.children &&
      !element.children?.some((val) => element.path + '/' + val.path === element.redirect)
    ) {
      element.redirect = element.path + '/' + element.children[0].path
    }
  })
  return routes
}

export async function addAsyncRoutes(router) {
  const useUser = useUserStore()
  const permissionMode = import.meta.env.VITE_PERMISSION_MODE

  let filteredRoutes = <RouteRecordRaw[]>[]
  // 前端动态路由模式
  if (permissionMode === 'FRONT') {
    filteredRoutes = filterFunc(routeModuleList)
  }
  // 后端动态路由模式
  if (permissionMode === 'BACK') {
    let routes = await getBackAsyncRoutes()
    filteredRoutes = formatAsyncRoutes(routes)
  }
  filteredRoutes.forEach((val) => router.addRoute(val))
  useUser.setAsyncRoutes(filteredRoutes)
}
