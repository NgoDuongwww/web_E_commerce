import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";
import { getToken, getTokenExpiration, clearAuthData } from "@/utils/auth.js";
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
function checkTokenExpired() {
  const expirationTime = getTokenExpiration(); // ➡ Lấy thời gian hết hạn token từ đâu đó
  if (!expirationTime) return true; // ➡ Nếu không có thời gian hết hạn
  return new Date().getTime() > parseInt(expirationTime, 10);
  // ↳ So sánh thời gian hiện tại với thời gian hết hạn.
  // ↳ Nếu hiện tại > thời gian hết hạn, tức là token đã hết hạn → trả về true.
}

api.interceptors.request.use(
  (config) => {
    const token = getToken(); // ➡ Lấy token từ localStorage
    if (token) {
      if (checkTokenExpired()) {
        clearAuthData(); // ➡ Xóa token và thời gian hết hạn khỏi localStorage
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        router.push("/admin/login"); // ➡ Chuyển trang
        return Promise.reject(new Error("Token đã hết hạn")); // ➡ Hủy request hiện tại
      }
      config.headers.Authorization = `Bearer ${token}`; // ➡ Gán token vào header
    }
    return config;
  },
  (error) => Promise.reject(error) // ➡ Nếu gặp lỗi
);

/**
 * Interceptor cho response:
 * - Trả lại response nếu thành công.
 * - Nếu gặp lỗi 401 (Unauthorized):
 *   - Xoá token khỏi localStorage.
 *   - Chuyển hướng người dùng về trang đăng nhập.
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
      clearAuthData(); // ➡ Xóa token và thời gian hết hạn khỏi localStorage
      router.push("/admin/login"); // ➡ Chuyển trang
    }
    return Promise.reject(error); // ➡ Hủy request hiện tại
  }
);

export default api;
