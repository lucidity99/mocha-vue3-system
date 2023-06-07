/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __APP_INFO__: {
  pkg: {
    dependencies: {}
    devDependencies: {}
  }
  lastBuildTime: string
}

declare module 'vue-cropperjs'
