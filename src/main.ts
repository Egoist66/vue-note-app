import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { TodoStorePersister } from './plugins/todostore-persister'
import { AppNotification } from './plugins/app-notification'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TodoStorePersister())
app.use( async () => await AppNotification())


app.mount('#app')
