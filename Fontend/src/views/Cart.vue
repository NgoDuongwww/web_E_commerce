<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Giỏ hàng</h1>
    <div v-if="cart.length === 0" class="text-gray-500">Giỏ hàng của bạn đang trống.</div>
    <div v-else>
      <table class="w-full mb-6">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 text-left">Sản phẩm</th>
            <th class="p-2 text-center">Số lượng</th>
            <th class="p-2 text-right">Giá</th>
            <th class="p-2 text-right">Tổng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td class="p-2 flex items-center gap-2">
              <img :src="item.image" class="w-12 h-12 object-cover rounded" />
              <span>{{ item.name }}</span>
            </td>
            <td class="p-2 text-center">{{ item.quantity }}</td>
            <td class="p-2 text-right">{{ item.price }}₫</td>
            <td class="p-2 text-right">{{ item.price * item.quantity }}₫</td>
            <td class="p-2 text-right">
              <button class="text-red-500 hover:underline" @click="removeItem(item.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center">
        <div class="font-bold text-lg">Tổng cộng: {{ totalPrice }}₫</div>
        <router-link to="/checkout" class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Thanh toán</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cart = ref([
  { id: 1, name: 'Sản phẩm 1', price: 1200000, quantity: 1, image: 'https://via.placeholder.com/80x80' },
  { id: 2, name: 'Sản phẩm 2', price: 350000, quantity: 2, image: 'https://via.placeholder.com/80x80' },
])

const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

function removeItem(id) {
  cart.value = cart.value.filter(item => item.id !== id)
}
</script> 