/**
 * @module router
 * @description Cấu hình Vue Router cho ứng dụng, bao gồm các route cho phần admin và public.
 */

import { createWebHistory, createRouter } from "vue-router";
// ↳ createRouter: Hàm để tạo một router instance.
// ↳ createWebHistory: Hàm để tạo một history bộ nhớ, nghiệm cơ bản là URL hành đồng của trang web.

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ↳ Định nghĩa một mảng routes chứa các đối tượng cấu hình:
    // { path: "/", redirect: "/hello" },

    // Admin routes
    {
      path: "/admin",
      redirect: "/admin/dashboard", // ➡ Mặc định load dashboard
      meta: {
        adminLayout: true, // ➡ Bật layout cho view admin
      },
      children: [
        {
          path: "login",
          component: () => import("@/views/admin/LoginView.vue"),
          meta: {
            noLayout: true, // ➡ Tắt layout cho view login
          },
        },
        {
          path: "dashboard",
          component: () => import("@/views/admin/DashboardView.vue"),
          meta: {
            adminLayout: true, // ➡ Bật layout cho view admin
          },
        },
        {
          path: "products", // ➡ lưu ý: KHÔNG có dấu `/` đầu
          component: () => import("@/views/admin/ProductView.vue"),
          meta: {
            adminLayout: true, // ➡ Bật layout cho view admin
          },
          children: [
            {
              path: "",
              redirect: "/admin/products/product-list", // ➡ Mặc định load product-list
              meta: {
                adminLayout: true, // ➡ Bật layout cho view admin
              },
            },
            {
              path: "product-list",
              component: () => import("@/views/admin/products/ProductList.vue"),
              meta: {
                adminLayout: true, // ➡ Bật layout cho view admin
              },
            },
            {
              path: "brand-list",
              component: () => import("@/views/admin/brands/BrandList.vue"),
              meta: {
                adminLayout: true, // ➡ Bật layout cho view admin
              },
            },
            {
              path: "category-list",
              component: () =>
                import("@/views/admin/categories/CategoryList.vue"),
              meta: {
                adminLayout: true, // ➡ Bật layout cho view admin
              },
            },
          ],
        },
      ],
    },

    // Public routes
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
      meta: {
        userLayout: true, // ➡ Bật layout cho view user
      },
    },

    // Page not found
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

export default router;
