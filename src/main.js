import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // импортируем настроенный роутер
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
const app = createApp(App)
app.use(vuetify)
app.use(router) // использовать роутер в приложении
app.mount('#app')

