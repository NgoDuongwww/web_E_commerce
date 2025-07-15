<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div class="flex flex-col md:flex-row gap-8">
      <img :src="product.image" :alt="product.name" class="w-full md:w-1/2 h-80 object-cover rounded" />
      <div class="flex-1">
        <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-gray-500 mb-4">{{ product.category }}</p>
        <div class="text-2xl text-indigo-600 font-bold mb-4">{{ product.price }}₫</div>
        <p class="mb-6">{{ product.description }}</p>
        <button class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref({
  id: route.params.id,
  name: 'Sản phẩm demo',
  category: 'Điện tử',
  price: 1200000,
  image: 'https://via.placeholder.com/400x320',
  description: 'Mô tả sản phẩm chi tiết sẽ hiển thị ở đây.'
})

onMounted(() => {
  // TODO: Gọi API lấy chi tiết sản phẩm theo id
})
</script> 