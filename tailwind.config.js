/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode:'class',
  important: 'body',
  theme: {
    extend:{
      colors: {
        primary: 'rgba(var(--color-primary), <alpha-value>)',
      }
    }

  },
  plugins: [],
  corePlugins: {
    container: false // 如果您不打算在您的项目中使用 container 类，您可以通过在配置文件的 corePlugins 部分将 container 属性设置为 false 来完全禁用它
  }
}
