/**
 * @module vite.config
 * @description Cấu hình cho Vite - build tool cho dự án Vue 3.
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

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * @type {Plugin[]}
   * @description Danh sách plugin sử dụng, bao gồm plugin Vue để hỗ trợ file .vue.
   */
  plugins: [
    vue(), // ➡ Kích hoạt plugin Vue để Vite hiểu và xử lý các file .vue.
  ],

  /**
   * @description Cấu hình CSS cho Vite, hỗ trợ SCSS và tự động chèn import toàn cục.
   */
  css: {
    preprocessorOptions: {
      /**
       * @description Cấu hình cho trình tiền xử lý SCSS.
       * `additionalData` sẽ được thêm vào đầu mỗi file SCSS tự động.
       *
       * @example
       * // Không cần import thủ công trong từng file:
       * .box {
       *   @include flex-center; // mixin từ file global
       * }
       */
      scss: {
        additionalData: `
          @import "@/assets/styles/_display-flex-column.scss";
          @import "@/assets/styles/_display-flex-row.scss";
          @import "@/assets/styles/_display-flex.scss";
          @import "@/assets/styles/_width-n-height.scss";
        `,
      },
    },
  },

  /**
   * @description Cấu hình alias để rút gọn đường dẫn khi import module.
   */
  resolve: {
    alias: {
      /**
       * @alias @
       * @type {string}
       * @description Alias '@' trỏ tới thư mục 'src', giúp viết import ngắn gọn hơn.
       *
       * @example
       * import MyComponent from '@/components/MyComponent.vue'
       */
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
