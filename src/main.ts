import { createApp } from "vue";
import App from "./App.vue";

import "primeicons/primeicons.css";
import { vMaska } from "maska";
import PrimeVue from "primevue/config";
import Toast from "vue-toastification";
import router from "@/app/config/router/init";
import { i18n } from "@/app/config/i18n/i18n";
import { createPinia } from "pinia";

import "@/app/style/global.scss";
import "primeicons/primeicons.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
app.use(router);

app.use(PrimeVue);
app.use(Toast, {
  closeOnClick: false,
  timeout: 3000,
  transition: "Vue-Toastification__fade",
});

app.directive("maska", vMaska);

app.mount("#app");
