import axios from 'axios'
import { useRouter } from 'vue-router'
import { autoError } from '@/utils/toast.js'

const router = useRouter()
/**
 * @file api.js
 * @description Tạo một instance của Axios để sử dụng cho toàn bộ ứng dụng với cấu hình mặc định và interceptor xử lý lỗi.
 */

/**
 * Tạo một instance Axios tùy chỉnh để gọi API backend.
 *
 * - `baseURL` được lấy từ biến môi trường `VITE_API_URL`, cho phép cấu hình động theo môi trường (dev, staging, production).
 * - Mặc định gửi các request với header `'Content-Type': 'application/json'`.
 * - Có thể dùng `api` để thực hiện các request như `api.get`, `api.post`, v.v...
 * - Instance này có thể mở rộng với interceptors để xử lý token hoặc lỗi toàn cục.
 *
 * @constant {AxiosInstance} api - Axios instance cấu hình sẵn cho toàn bộ ứng dụng.
 *
 * @example
 * api.get('/users') // GET https://your-api.com/users
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Interceptor cho tất cả request gửi đi từ `api` (Axios instance).
 *
 * - Trước khi gửi mỗi request, interceptor sẽ kiểm tra xem có `token` trong `localStorage` không.
 * - Nếu có, token sẽ được gắn vào header `Authorization` dưới dạng `Bearer <token>`.
 * - Điều này giúp tất cả các request API đều tự động gửi kèm token để xác thực người dùng.
 * - Nếu có lỗi trong quá trình xử lý request config, interceptor sẽ reject với lỗi tương ứng.
 *
 * @example
 * // Sau khi thiết lập interceptor, tất cả các request sẽ kèm token nếu có:
 * api.get('/admin/products') // tự động kèm Authorization header
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Interceptor cho tất cả phản hồi từ API (Axios response).
 *
 * - Cho phép xử lý lỗi toàn cục khi có phản hồi từ server.
 * - Nếu server trả về lỗi 401 (Unauthorized), điều đó thường có nghĩa là token hết hạn hoặc không hợp lệ.
 * - Trong trường hợp đó:
 *   - Xóa `token` và `expirationTime` khỏi localStorage.
 *   - Gọi hàm `autoError` để hiển thị thông báo lỗi cho người dùng.
 *   - Điều hướng người dùng đến trang đăng nhập admin (`/admin/login`).
 * - Nếu là lỗi khác, tiếp tục trả về lỗi để các phần khác xử lý.
 *
 * @example
 * api.get('/admin/dashboard') // Nếu token hết hạn, sẽ bị redirect và hiển thị lỗi.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('expirationTime')
      autoError('Your session has expired. Please log in again.')
      router.push('/admin/login')
    }
    return Promise.reject(error)
  }
)

export default api
