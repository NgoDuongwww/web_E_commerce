<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow p-4 flex flex-col">
        <img :src="product.image" :alt="product.name" class="h-40 object-cover rounded mb-2" />
        <h2 class="font-semibold text-lg mb-1">{{ product.name }}</h2>
        <p class="text-gray-500 mb-2">{{ product.category }}</p>
        <div class="flex-1"></div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-indigo-600 font-bold text-xl">{{ product.price }}₫</span>
          <router-link :to="`/products/${product.id}`" class="text-sm text-indigo-600 hover:underline">Xem chi tiết</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([
  { id: 1, name: 'Sản phẩm 1', category: 'Điện tử', price: 1200000, image: 'https://via.placeholder.com/200x160' },
  { id: 2, name: 'Sản phẩm 2', category: 'Thời trang', price: 350000, image: 'https://via.placeholder.com/200x160' },
  { id: 3, name: 'Sản phẩm 3', category: 'Nhà cửa', price: 450000, image: 'https://via.placeholder.com/200x160' },
  { id: 4, name: 'Sản phẩm 4', category: 'Sách', price: 90000, image: 'https://via.placeholder.com/200x160' },
])

onMounted(() => {
  // TODO: Gọi API lấy danh sách sản phẩm
})
</script> 