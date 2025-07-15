<template>
  <div class="max-w-2xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Thanh toán</h1>
    <form @submit.prevent="submitOrder" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Họ tên</label>
        <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Địa chỉ</label>
        <input v-model="form.address" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Số điện thoại</label>
        <input v-model="form.phone" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Ghi chú</label>
        <textarea v-model="form.note" class="w-full border rounded px-3 py-2"></textarea>
      </div>
      <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Đặt hàng</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  address: '',
  phone: '',
  note: ''
})

function submitOrder() {
  // TODO: Gửi dữ liệu đặt hàng lên API
  alert('Đặt hàng thành công!')
}
</script> 