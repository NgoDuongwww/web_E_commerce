import axios from "axios";
import router from "@/router";
import { getToken, tokenExpired, handleToken } from "@/utils/auth";

/**
 * @file api.js
 * @description Tạo một instance của Axios để sử dụng cho toàn bộ ứng dụng với cấu hình mặc định và interceptor xử lý lỗi.
 */

/**
 * Instance của Axios được cấu hình sẵn với `baseURL` và `headers` mặc định.
 *
 * - `baseURL` được lấy từ biến môi trường `VITE_API_URL`.
 * - `Content-Type` mặc định là `application/json` cho tất cả các request.
 *
 * Interceptor được cấu hình để:
 * - Giữ nguyên response nếu thành công.
 * - Nếu response trả về lỗi 401 (unauthorized), token sẽ bị xóa và người dùng sẽ bị chuyển hướng về trang đăng nhập.
 *
 * @constant {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
