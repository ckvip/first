import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import { Button, Input, Layout, List, Menu, Space } from 'ant-design-vue'

const app = createApp(App)
app.use(Button).use(List).use(Space).use(Input).use(Layout).use(Menu)
app.use(store).use(router)
app.mount('#app')
