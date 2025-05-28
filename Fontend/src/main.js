import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");
//createApp(App) tạo một instance ứng dụng Vue mới dựa trên component gốc là App.
//.mount('#app') gắn ứng dụng Vue vào phần tử HTML có id="app" trong file index.html.
