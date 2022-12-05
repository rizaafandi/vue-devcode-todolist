import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";

import Modal from "vue-universal-modal";
import "vue-universal-modal/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(Modal, {
  teleportTarget: "body",
  modalComponent: "Modal",
});

app.mount("#app");
