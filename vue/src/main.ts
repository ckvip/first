import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import { Alert, Button, Form, Input, Layout, List, Menu, Modal, Radio, Select, Space, Switch } from 'ant-design-vue'

const app = createApp(App)
app.use(Button).use(List).use(Space).use(Form).use(Select).use(Input).use(Layout).use(Menu).use(Modal).use(Alert)
  .use(Radio).use(Switch)
app.use(store).use(router)
app.mount('#app')
