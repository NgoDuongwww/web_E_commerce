import { createWebHistory, createRouter } from "vue-router";
// ↳ createRouter: Hàm để tạo một router instance.
// ↳ createWebHistory: Hàm để tạo một history bộ nhớ, nghiệm cơ bản là URL hành đồng của trang web.
import HelloWorld from "../components/HelloWorld.vue";
import test from "../components/test.vue";

const routes = [
  // ↳ Định nghĩa một mảng routes chứa các đối tượng cấu hình:
  { path: "/", redirect: "/hello" },
  { path: "/hello", component: HelloWorld },
  { path: "/test", component: test },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
