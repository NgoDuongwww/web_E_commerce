import { createApp } from "vue";
import router from "./router";
import "./style.css";
import App from "./App.vue";

createApp(App).use(router).mount("#app");
// ↳ createApp(App) tạo một instance ứng dụng Vue mới dựa trên component gốc là App.
// ↳ .use(router) gắn ứng router với ứng dụng Vue.
// ↳ .mount('#app') gắn ứng dụng Vue vào phần tử HTML có id="app" trong file index.html.
