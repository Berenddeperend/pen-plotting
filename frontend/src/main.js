import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import DatGui from "@cyrilf/vue-dat-gui";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
1;
