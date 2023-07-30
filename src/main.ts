import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "primeicons/primeicons.css";
import { vMaska } from "maska";
import PrimeVue from "primevue/config";
import "@/app/style/global.scss";


const app = createApp(App);
app.use(PrimeVue);

app.directive("maska", vMaska);

// createApp(App).mount("#app");
app.mount("#app");
