import { createApp } from "vue";

import store from "./store";
import router from "./router";

import PrimeVue from "primevue/config";

import App from "./App.vue";

/* Connect Styles */
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PrimeVue);

app.mount("#app");
