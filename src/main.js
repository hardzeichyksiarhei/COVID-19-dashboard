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

export const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);

app.mount("#app");

/* Global Filters */
const NumberFormat = new Intl.NumberFormat("ru");

app.config.globalProperties.$filters = {
  numberFormat(value) {
    return NumberFormat.format(value);
  },
  capitalize(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
};
