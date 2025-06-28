class ResponseUser {
  // ↳ Tạo một class để đại diện cho phản hồi người dùng.
  constructor(user) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.id = user.id // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng
    this.user_code = user.user_code
    this.email = user.email
    this.password = user.password
    this.name = user.name
    this.role = user.role
    this.avatar = user.avatar
    this.phone = user.phone
    this.isLocked = user.isLocked
    this.password_changed_at = user.password_changed_at
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}

module.exports = ResponseUser
