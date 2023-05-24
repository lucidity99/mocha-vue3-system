import { App } from 'vue'
import color from './color'
import watermark from './watermark'
import adaptive from './adaptive'
import permiss from './permiss'

export default (app: App) => {
  app.directive('color', color)
  app.directive('watermark', watermark)
  app.directive('adaptive', adaptive)
  app.directive('permiss', permiss)
}
