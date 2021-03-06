import { createApp } from "vue";

import store from "./store";
import router from "./router";

import mitt from "mitt";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

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

const emitter = mitt();

export const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);

app.mount("#app");

/* Global Emitter */
app.config.globalProperties.emitter = emitter;

/* Global Filters */
app.config.globalProperties.$filters = {
  numberFormat: (value) => numberFormat(value),
  dateFormat: (value) => dateFormat(value),
  capitalize: (value) => capitalize(value),
};
