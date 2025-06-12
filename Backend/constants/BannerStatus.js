module.exports = {
  // 👉 Định nghĩa các trạng thái (status) cho banner.

  INACTIVE: 0, // ⮕ 0: Banner không hoạt động
  ACTIVE: 1, // ⮕ 1: Banner đang hiển thị
  SCHEDULED: 2, // ⮕ 2: Banner được lên lịch sẵn để hiển thị
  EXPIRED: 3, // ⮕ 3: Banner đã hết hạn
}
