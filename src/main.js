import './assets/main.css'

import { createApp } from 'vue'
import store from '@/stores/index.js'

import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App)

app.use(store)
app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
