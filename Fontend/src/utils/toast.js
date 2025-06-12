import { toast } from 'vue-sonner'

/**
 * Hiển thị thông báo thành công
 *
 * @param {string} message Nội dung của thông báo
 */
export const Success = (message) => {
  toast.success(message)
}

/**
 * Hiển thị thông báo lỗi
 *
 * @param {string} message Nội dung của thông báo
 */
export const Error = (message) => {
  toast.error(message)
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
