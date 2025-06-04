/**
 * Lưu token và thời gian hết hạn vào localStorage.
 *
 * @param {string} token - Token xác thực (JWT hoặc tương tự).
 * @param {number} expiresIn - Thời gian sống của token (tính bằng milliseconds).
 */
export function saveAuthData(token, expiresIn) {
  localStorage.setItem("token", token);
  const expirationTime = new Date().getTime() + expiresIn;
  localStorage.setItem("expirationTime", expirationTime); // ⚠️ Lưu ý: sai chính tả từ "expirationTime"
}

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
export function isTokenExpired() {
  const expirationTime = getTokenExpiration();
  if (!expirationTime) return true;
  return new Date().getTime() > parseInt(expirationTime, 10);
}

/**
 * Kiểm tra xem người dùng có đang được xác thực hay không.
 *
 * @returns {boolean} `true` nếu người dùng đã xác thực và token còn hiệu lực, ngược lại là `false`.
 */
export function isAuthenticated() {
  const token = getToken();
  if (!token) {
    return false;
  }
  return !isTokenExpired();
}
