<template>
  <div class="max-w-2xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Thông tin tài khoản</h1>
    <div class="bg-white rounded shadow p-6">
      <div class="mb-4">
        <label class="block font-medium mb-1">Họ tên</label>
        <input v-model="user.name" type="text" class="w-full border rounded px-3 py-2" />
      </div>
      <div class="mb-4">
        <label class="block font-medium mb-1">Email</label>
        <input v-model="user.email" type="email" class="w-full border rounded px-3 py-2" disabled />
      </div>
      <button class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700" @click="updateProfile">Cập nhật</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'Nguyễn Văn A',
  email: 'user@example.com'
})

function updateProfile() {
  // TODO: Gửi dữ liệu cập nhật lên API
  alert('Cập nhật thành công!')
}
</script> 