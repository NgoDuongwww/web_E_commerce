<template>
  <div class="max-w-md mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Đăng ký tài khoản</h1>
    <form @submit.prevent="register" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Họ tên</label>
        <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Email</label>
        <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Mật khẩu</label>
        <input v-model="form.password" type="password" class="w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label class="block mb-1 font-medium">Nhập lại mật khẩu</label>
        <input v-model="form.confirmPassword" type="password" class="w-full border rounded px-3 py-2" required />
      </div>
      <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Đăng ký</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function register() {
  // TODO: Gửi dữ liệu đăng ký lên API
  alert('Đăng ký thành công!')
}
</script> 