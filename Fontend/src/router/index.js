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
        requiresAuth: true, // ➡ Route cần login
        role: "admin", // ➡ Quyền admin
      },
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/admin/DashboardView.vue"),
        },
        {
          path: "products", // ➡ lưu ý: KHÔNG có dấu `/` đầu
          component: () => import("@/views/admin/ProductView.vue"),
          children: [
            {
              path: "",
              redirect: "/admin/products/product-list", // ➡ Mặc định load product-list
            },
            {
              path: "product-list",
              component: () => import("@/views/admin/products/ProductList.vue"),
            },
            {
              path: "brand-list",
              component: () => import("@/views/admin/brands/BrandList.vue"),
            },
            {
              path: "category-list",
              component: () =>
                import("@/views/admin/categories/CategoryList.vue"),
            },
          ],
        },
      ],
    },

    // Login admin routes
    {
      path: "/login-admin",
      component: () => import("@/views/Auth/admin/LoginView.vue"),
      meta: {
        noLayout: true, // ➡ Tắt layout cho view login
      },
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
    {
      path: "/404",
      component: () => import("@/views/NotFoundView.vue"),
      meta: {
        userLayout: true, // ➡ Bật layout cho view user
      },
    },
  ],
});

// ➡ Gọi trước mỗi lần chuyển trang
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // ➡ Kiểm tra xem người dùng đã đăng nhập.
  const role = localStorage.getItem("role"); // ➡ Kiểm tra quyền người dùng.
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth); // ➡ Kiểm tra xem route cần login.
  const matchRole = to.matched.find((record) => record.meta.role); // ➡ Tìm trong danh sách các route được kích hoạt.
  const requiredRole = matchRole?.meta.role; // ➡ Kiểm tra xem route cần quyền người dùng.

  if (requiresAuth && !token) {
    next("/login-admin");
  } else if (requiredRole && role !== to.meta.role) {
    next("/404");
  } else {
    next();
  }
});

export default router;
