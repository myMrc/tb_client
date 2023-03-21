import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import  { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
