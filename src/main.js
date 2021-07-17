import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import store from './store/index'
import 'element-plus/lib/theme-chalk/index.css'
createApp(App).use(ElementPlus).use(store).mount('#app')


