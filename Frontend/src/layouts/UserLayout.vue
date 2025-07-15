<template>
  <div class="user-layout min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-indigo-600">
              ShopApp
            </router-link>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <router-link
              to="/"
              class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-indigo-600"
            >
              Trang chủ
            </router-link>
            <router-link
              to="/products"
              class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-indigo-600"
            >
              Sản phẩm
            </router-link>
            <router-link
              to="/categories"
              class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-indigo-600"
            >
              Danh mục
            </router-link>
            <router-link
              to="/about"
              class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-indigo-600"
            >
              Giới thiệu
            </router-link>
            <router-link
              to="/contact"
              class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-indigo-600"
            >
              Liên hệ
            </router-link>
          </nav>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Cart -->
            <router-link
              to="/cart"
              class="relative p-2 text-gray-700 hover:text-indigo-600"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ cartItemCount }}
              </span>
            </router-link>

            <!-- User Menu -->
            <div class="relative" v-if="isAuthenticated">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
              >
                <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {{ userInitials }}
                </div>
                <span class="hidden md:block">{{ user?.name || 'User' }}</span>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Hồ sơ
                </router-link>
                <router-link
                  to="/orders"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đơn hàng
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            <!-- Login/Register -->
            <div v-else class="flex space-x-2">
              <router-link
                to="/login"
                class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Đăng nhập
              </router-link>
              <router-link
                to="/register"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Đăng ký
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">ShopApp</h3>
            <p class="text-gray-300">
              Nền tảng mua sắm trực tuyến hàng đầu với đa dạng sản phẩm chất lượng cao.
            </p>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-4">Danh mục</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white">Điện tử</a></li>
              <li><a href="#" class="hover:text-white">Thời trang</a></li>
              <li><a href="#" class="hover:text-white">Nhà cửa</a></li>
              <li><a href="#" class="hover:text-white">Sách</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-4">Hỗ trợ</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white">Trung tâm trợ giúp</a></li>
              <li><a href="#" class="hover:text-white">Chính sách đổi trả</a></li>
              <li><a href="#" class="hover:text-white">Vận chuyển</a></li>
              <li><a href="#" class="hover:text-white">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-md font-semibold mb-4">Theo dõi</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2024 ShopApp. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, clearAuthData } from '@/utils/auth'
import { toast } from 'vue-sonner'

const router = useRouter()
const searchQuery = ref('')
const showUserMenu = ref(false)
const user = ref(null)

// Mock cart data - in real app, this would come from a store
const cartItemCount = ref(0)

const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() }
    })
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
  clearAuthData()
  showUserMenu.value = false
  toast.success('Đăng xuất thành công')
  router.push('/')
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Mock user data - in real app, this would come from auth store
  user.value = {
    name: 'Nguyễn Văn A',
    email: 'user@example.com'
  }
  cartItemCount.value = 3
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 