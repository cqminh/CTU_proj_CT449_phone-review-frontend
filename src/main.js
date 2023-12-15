import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueCookies from 'vue-cookies'
import './assets/main.css'

import router from "./router";
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueCookies)
app.mount("#app");

