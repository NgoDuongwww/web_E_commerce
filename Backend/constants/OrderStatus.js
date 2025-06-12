module.exports = {
  // 👉 Định nghĩa các trạng thái (status) cho đơn hàng.

  PENDING: 1, // ⮕ 1: Đơn hàng đang chờ xử lý (chưa làm gì cả).
  PROCESSING: 2, // ⮕ 2: Đơn hàng đang được xử lý (đóng gói, chuẩn bị giao).
  SHIPPED: 3, // ⮕ 3: Đơn hàng đã giao cho bên vận chuyển.
  DELIVERED: 4, // ⮕ 4: Đơn hàng đã giao thành công đến khách hàng.
  CANCELLED: 5, // ⮕ 5: Đơn hàng đã bị huỷ (khách hoặc shop huỷ).
  REFUNDED: 6, // ⮕ 6: Đơn hàng đã hoàn tiền cho khách.
  FAILED: 7, // ⮕ 7: Đơn hàng giao thất bại (ví dụ khách không nhận hàng).
}
