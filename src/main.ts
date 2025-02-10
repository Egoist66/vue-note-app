import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";



//@ts-ignore
import App from "./App.vue";
import router from "./router";
import { TodoStorePersister } from "./plugins/todostore-persister";
import { AppNotification } from "./plugins/app-notification";
import i18nPlugin from "./plugins/i18n";

import langFile from "./lang/lang.json";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(TodoStorePersister());
app.use(async () => await AppNotification());

app.use(i18nPlugin, langFile);

app.mount("#app");
