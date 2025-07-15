/**
 * @module router
 * @description Cấu hình Vue Router cho ứng dụng, bao gồm các route cho phần admin và public.
 */

import { createWebHistory, createRouter } from 'vue-router'
// ↳ createRouter: Hàm để tạo một router instance.
// ↳ createWebHistory: Hàm để tạo một history bộ nhớ, nghiệm cơ bản là URL hành đồng của trang web.
import { isAuthenticated, clearAuthData } from '@/utils/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ↳ Định nghĩa một mảng routes chứa các đối tượng cấu hình:
    // { path: "/", redirect: "/hello" },

    // Admin routes
    {
      path: '/admin',
      redirect: '/admin/dashboard', // ➡ Mặc định load dashboard
      meta: {
        adminLayout: true, // ➡ Bật layout cho view admin
        adminRequiresAuth: true, // ➡ Route cần login
      }, 
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
        },
        {
          path: 'products', // ➡ lưu ý: KHÔNG có dấu `/` đầu
          component: () => import('@/views/admin/ProductView.vue'),
          children: [
            {
              path: '',
              redirect: '/admin/products/product-list', // ➡ Mặc định load product-list
            },
            // Product routes
            {
              path: 'product-list',
              component: () => import('@/views/admin/products/ProductList.vue'),
            },
            // Brand routes
            {
              path: 'brand-list',
              component: () => import('@/views/admin/brands/BrandList.vue'),
            },
            // Category routes
            {
              path: 'category-list',
              component: () =>
                import('@/views/admin/categories/CategoryList.vue'),
            },
          ],
        },
      ],
    },

    // Login admin routes
    {
      path: '/admin/login',
      component: () => import('@/views/Auth/admin/LoginView.vue'),
      meta: {
        noLayout: true, // ➡ Tắt layout cho view login
      },
    },

    // Public routes
    {
      path: '/',
      component: () => import('@/views/HomePage.vue'),
      meta: {
        userLayout: true, // ➡ Bật layout cho view user
      },
    },

    // Page not found
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
    {
      path: '/404',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        userLayout: true, // ➡ Bật layout cho view user
      },
    },
  ],
})

/**
 * Hàm chặn điều hướng toàn cục của Vue Router.
 *
 * Hàm này kiểm tra xem route sắp truy cập có yêu cầu xác thực admin không.
 * Nếu có và người dùng chưa đăng nhập, nó sẽ xóa dữ liệu xác thực hiện tại
 * và chuyển hướng người dùng đến trang đăng nhập admin.
 * Ngược lại, cho phép tiếp tục điều hướng như bình thường.
 *
 * @param {Route} to - Route đích mà người dùng muốn truy cập.
 * @param {Route} from - Route hiện tại mà người dùng điều hướng đi.
 * @param {Function} next - Hàm được gọi để tiếp tục (hoặc chuyển hướng) quá trình điều hướng.
 */
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(
    (record) => record.meta.adminRequiresAuth
  )

  if (requiresAuth && !isAuthenticated()) {
    clearAuthData()
    next('/admin/login')
  } else {
    next()
  }
})

export default router
