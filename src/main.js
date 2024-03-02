import './assets/main.css'
import Calendar from './obj/Calendar.js'
import CalWeek from './obj/CalWeek.js'
import CalDate from './obj/CalDate.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)

app.mount('#app')

