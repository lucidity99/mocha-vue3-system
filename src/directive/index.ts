import { App } from 'vue'

const modules = import.meta.glob('../directive/**/*.ts', {
  eager: true
})

let mapDirective = new Map()

Object.keys(modules).forEach((key) => {
  if (modules[key] && modules[key].default) {
    const newKey = key.replace(/^\.\/|\.ts|\.js/g, '')
    mapDirective.set(newKey, modules[key].default)
  }
})

export default (app: App) => {
  mapDirective.forEach((value, key) => {
    app.directive(key, value)
  })
}
