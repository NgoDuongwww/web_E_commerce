import router from "@/router";
import { ref } from "vue";

/**
 * Lấy token xác thực từ localStorage.
 *
 * @returns {string|null} Token hoặc null nếu không tồn tại.
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Lấy thời gian hết hạn token từ localStorage.
 *
 * @returns {string|null} Giá trị thời gian hết hạn (epoch) hoặc null nếu không có.
 */
export function getTokenExpiration() {
  return localStorage.getItem("expirationTime");
}

export function getStatusToken() {
  return localStorage.getItem("statusToken");
}

/**
 * Xoá token và thời gian hết hạn khỏi localStorage.
 */
export function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
}

/**
 * Kiểm tra xem token đã hết hạn hay chưa.
 *
 * @returns {boolean} `true` nếu token đã hết hạn hoặc không tồn tại, ngược lại là `false`.
 */
export function tokenExpired() {
  if (!getTokenExpiration()) return true;
  return new Date().getTime() > parseInt(getTokenExpiration(), 10);
}

/**
 * Kiểm tra xem người dùng có đang được xác thực hay không.
 *
 * @returns {boolean} `true` nếu người dùng đã xác thực và token còn hiệu lực, ngược lại là `false`.
 */
export function isAuthenticated() {
  if (!getToken()) {
    return false;
  }
  return !tokenExpired();
}

/**
 * Xử lý token và điều hướng nếu token đã hết hạn.
 *
 * @param {boolean} [showAlert=true] - Cờ để hiển thị thông báo nếu phiên đăng nhập đã hết hạn.
 * @returns {boolean} `true` nếu token đã hết hạn và người dùng bị điều hướng đến trang đăng nhập, ngược lại là `false`.
 */
export function handleToken(showAlert = true) {
  if (getToken() && tokenExpired()) {
    clearAuthData();
    if (showAlert) alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    router.push("/admin/login");
    return true;
  }
  return false;
}
