/**
 * @module router
 * @description Cấu hình Vue Router cho ứng dụng, bao gồm các route cho phần admin và public.
 */

import { createWebHistory, createRouter } from "vue-router";
// ↳ createRouter: Hàm để tạo một router instance.
// ↳ createWebHistory: Hàm để tạo một history bộ nhớ, nghiệm cơ bản là URL hành đồng của trang web.

// Admin import
import Dashboard from "../views/admin/DashboardView.vue";
import index from "../views/admin/index.vue";
import LoginView from "../views/admin/LoginView.vue";
import ProductView from "../views/admin/ProductView.vue";
// Admin/Prodcut import
import ProductList from "../views/admin/products/ProductList.vue";
// Admin/Brand import
import BrandList from "../views/admin/brands/BrandList.vue";
// Admin/Category import
import CategoryList from "../views/admin/categories/CategoryList.vue";

// Public import
import HomePage from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ↳ Định nghĩa một mảng routes chứa các đối tượng cấu hình:
    // { path: "/", redirect: "/hello" },

    // Admin routes
    {
      path: "/admin",
      component: index,
      children: [
        {
          path: "login",
          component: LoginView,
        },
        {
          path: "",
          redirect: "/admin/dashboard", // ➡ Mặc định load dashboard
        },
        {
          path: "dashboard", // ➡ lưu ý: KHÔNG có dấu `/` đầu
          component: Dashboard,
        },
        {
          path: "products",
          component: ProductView,
          children: [
            {
              path: "",
              redirect: "/admin/products/product-list", // ➡ Mặc định load product-list
            },
            {
              path: "product-list",
              component: ProductList,
            },
            {
              path: "brand-list",
              component: BrandList,
            },
            {
              path: "category-list",
              component: CategoryList,
            },
          ],
        },
      ],
    },

    // Public routes
    { path: "/", component: HomePage },

    // Page not found
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

export default router;
