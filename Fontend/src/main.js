/**
 * @module main
 * @description Entry point của ứng dụng Vue, tạo app, gắn router và mount vào DOM.
 */

import { createApp } from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import { Toaster } from 'vue-sonner'

// Import SCSS file
import '@/assets/styles/main.scss'
/**
 * Tạo instance ứng dụng Vue mới, sử dụng router, rồi mount vào phần tử HTML có id="app".
 *
 * @returns {void}
 */
createApp(App)
  .use(router) // Gắn router cho app Vue
  .component('Toaster', Toaster) // Gắn Toaster để hiển thị thông báo
  .mount('#app') // Mount app vào #app trong DOM
