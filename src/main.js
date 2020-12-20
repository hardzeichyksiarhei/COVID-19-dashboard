import { createApp } from "vue";

import store from "./store";
import router from "./router";

import PrimeVue from "primevue/config";

import App from "./App.vue";

import "./plugins/axios";

import {
  numberFormat,
  dateFormat,
  capitalize,
} from "./services/formats.services";

/* Connect Styles */
import "@/themes/md-dark-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

/* Main Style */
import "./scss/main.scss";

export const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);

app.mount("#app");

/* Global Filters */
app.config.globalProperties.$filters = {
  numberFormat: (value) => numberFormat(value),
  dateFormat: (value) => dateFormat(value),
  capitalize: (value) => capitalize(value),
};
