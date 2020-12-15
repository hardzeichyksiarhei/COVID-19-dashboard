import { createApp } from "vue";

import store from "./store";
import router from "./router";

import PrimeVue from "primevue/config";

import App from "./App.vue";

import "./plugins/axios";

/* Connect Styles */
import "@/themes/md-dark-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

/* Main Style */
import "./scss/main.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);

app.mount("#app");
