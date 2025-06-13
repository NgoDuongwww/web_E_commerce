import { h, markRaw } from 'vue'
import { toast } from 'vue-sonner'
import ErrorNotification from '@/components/notification/error-notification.vue'

let activeMessage = 0 // ➡ Số lượng thông báo hiện thị
const maxMessages = 5 // ➡ Số lượng thông báo hiển thị tối đa

/**
 * Hiển thị thông báo thành công
 *
 * @param {string} message Nội dung của thông báo
 */
export const Success = (message) => {
  toast.success(message)
}

/**
 * Hiển thị một toast thông báo lỗi tùy chỉnh với thời gian hiển thị vô hạn.
 *
 * Hàm này tạo một toast bằng `toast.custom` và hiển thị component `ErrorNotification`.
 * Component này nhận `message` (thông điệp lỗi) và một hàm `close` để đóng toast khi người dùng bấm nút đóng.
 *
 * - `toast.custom` trả về một `toastId` — ID duy nhất của toast.
 * - Hàm `close` sử dụng `toast.dismiss(toastId)` để đóng toast tương ứng khi được gọi.
 * - `duration: Infinity` đảm bảo toast không tự động biến mất, buộc người dùng phải tự đóng.
 * - `markRaw` được dùng để đánh dấu component là "không reactive", giúp Vue không theo dõi sự thay đổi bên trong component này — điều này tăng hiệu suất.
 *
 * @param {string} message - Thông điệp lỗi cần hiển thị trong toast.
 */
export const Error = (message) => {
  const toastId = toast.custom(
    () =>
      h(markRaw(ErrorNotification), {
        message,
        close: () => toast.dismiss(toastId),
      }),
    {
      duration: Infinity,
    }
  )
}

/**
 * Hiển thị một toast thông báo lỗi khi đăng nhập thất bại.
 *
 * Nếu đã có đủ số lượng toast ({maxMessages}), hàm sẽ không hiển thị toast nữa.
 *
 * Hàm này tạo một toast bằng `toast.custom` và hiển thị component `ErrorNotification`.
 * Component này nhận `message` (thông điệp lỗi) và một hàm `close` để đóng toast khi người dùng bấm nút đóng.
 *
 * - `toast.custom` trả về một `toastId` — ID duy nhất của toast.
 * - Hàm `close` sử dụng `toast.dismiss(toastId)` để đóng toast tương ứng khi được gọi.
 * - `duration: 5000` đảm bảo toast sẽ tự động biến mất sau 5 giây.
 * - `onAutoClose: () => activeMessage--` giảm số lượng toast đang hiển thị xuống 1 khi toast tự động biến mất.
 *
 * @param {string} message - Thông điệp lỗi cần hiển thị trong toast.
 */
export const errorLogin = (message) => {
  if (activeMessage >= maxMessages) return

  const toastId = toast.custom(
    () =>
      h(markRaw(ErrorNotification), {
        message,
        close: () => toast.dismiss(toastId),
      }),
    {
      duration: 5000,
      onAutoClose: () => activeMessage--,
    }
  )
  activeMessage++
}

/**
 * Hiển thị thông báo cảnh báo
 *
 * @param {string} message Nội dung của thông báo
 */
export const Warning = (message) => {
  toast.warning(message)
}

/**
 * Hiển thị thông báo thông tin
 *
 * @param {string} message Nội dung của thông báo
 */
export const Info = (message) => {
  toast.info(message)
}

/**
 * Hiển thị toast loading, success và error cho một Promise.
 *
 * @param {Promise<any>} promise - Promise cần theo dõi.
 * @param {Object} [messages] - Thông điệp tùy chọn.
 * @param {string} [messages.loading] - Thông báo khi đang xử lý.
 * @param {string|function} [messages.success] - Thông báo khi thành công.
 * @param {string|function} [messages.error] - Thông báo khi lỗi.
 *
 * @returns {Promise<any>} - Trả về Promise ban đầu.
 */

export const showPromise = (
  promise,
  {
    loading = 'Đang xử lý...',
    success = 'Thành công!',
    error = 'Có lỗi xảy ra!',
  } = {}
) => {
  return toast.promise(promise, {
    loading,
    success,
    error,
  })
}
