/**
 * @type {import('tailwindcss').Config}
 *
 * Tailwind CSS configuration file
 *
 * @property {string[]} content - Danh sách các file mà Tailwind sẽ quét để tìm các class CSS được sử dụng.
 * @property {object} theme - Cấu hình chủ đề, nơi tùy chỉnh hoặc mở rộng các giá trị mặc định của Tailwind.
 * @property {object} theme.extend - Mở rộng các giá trị mặc định (ví dụ như màu sắc, spacing, fontFamily,...).
 * @property {Array} plugins - Mảng các plugin Tailwind muốn thêm vào để mở rộng tính năng.
 */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
