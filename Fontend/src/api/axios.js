import axios from "axios";
import { useRoute } from "vue-router";

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

/**
 * Interceptor cho request:
 * - Trước khi gửi request, kiểm tra nếu tồn tại token trong `localStorage`.
 * - Nếu có, gán token vào header `Authorization` theo chuẩn Bearer Token.
 *
 * @param {import('axios').InternalAxiosRequestConfig} config - Cấu hình request trước khi gửi.
 * @returns {import('axios').InternalAxiosRequestConfig} - Cấu hình request đã được cập nhật (nếu cần).
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Interceptor cho response:
 * - Trả lại response nếu thành công.
 * - Nếu gặp lỗi 401 (Unauthorized):
 *   - Xoá token khỏi localStorage.
 *   - Chuyển hướng người dùng về trang gốc với query `?expired=1` để thông báo phiên đăng nhập đã hết hạn.
 *
 * @param {import('axios').AxiosResponse} response - Đối tượng phản hồi từ server.
 * @returns {import('axios').AxiosResponse} - Trả lại nguyên response nếu không có lỗi.
 *
 * @param {any} error - Lỗi xảy ra khi thực hiện request.
 * @returns {Promise<never>} - Trả về một promise bị từ chối với lỗi tương ứng.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/?expired=1";
    }
    return Promise.reject(error);
  }
);

export default api;
