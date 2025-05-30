/**
 * @module vite.config
 * @description Cấu hình cho Vite - build tool cho dự án Vue.
 *
 * @typedef {import('vite').UserConfig} UserConfig
 * @typedef {import('vite').Plugin} Plugin
 *
 * @returns {UserConfig} Cấu hình Vite được định nghĩa với hỗ trợ Vue và alias đường dẫn.
 */

import { defineConfig } from "vite"; // ➡ Dùng để khai báo cấu hình Vite với hỗ trợ gợi ý (intellisense) và kiểm tra kiểu (type-check).
import vue from "@vitejs/plugin-vue"; // ➡ Giúp Vite xử lý các file .vue (template, script, style, ...).
import { fileURLToPath, URL } from "node:url";
// ↳ fileURLToPath chuyển URL về dạng đường dẫn hệ thống file.
// ↳ URL dùng để tạo URL tuyệt đối dựa trên import.meta.url (đại diện cho file hiện
import { resolve } from "node:path"; // ➡ Dùng để tạo đường dẫn tuyệt đối.

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    vue(), // ➡ Kích hoạt plugin Vue để Vite hiểu và xử lý các file .vue.
  ],
  resolve: {
    alias: {
      /**
       * @description Alias '@' trỏ tới thư mục 'src' để import dễ dàng hơn.
       * @type {string}
       */
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
