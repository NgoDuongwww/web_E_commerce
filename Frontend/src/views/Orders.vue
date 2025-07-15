<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Lịch sử đơn hàng</h1>
    <div v-if="orders.length === 0" class="text-gray-500">Bạn chưa có đơn hàng nào.</div>
    <div v-else>
      <table class="w-full">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 text-left">Mã đơn</th>
            <th class="p-2 text-left">Ngày đặt</th>
            <th class="p-2 text-right">Tổng tiền</th>
            <th class="p-2 text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td class="p-2">{{ order.id }}</td>
            <td class="p-2">{{ order.date }}</td>
            <td class="p-2 text-right">{{ order.total }}₫</td>
            <td class="p-2 text-center">
              <span :class="order.status === 'Đã giao' ? 'text-green-600' : 'text-yellow-600'">{{ order.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  { id: 'DH001', date: '2024-06-01', total: 1500000, status: 'Đã giao' },
  { id: 'DH002', date: '2024-06-10', total: 350000, status: 'Đang xử lý' },
])
</script> 