const Joi = require('joi')
const { UserRole } = require('../../../constants')

class RegisterUserRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu đăng ký người dùng.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.email = data.email // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.password = data.password
    this.name = data.name
    this.phone = data.phone
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ string() yêu cầu giá trị phải là một chuỗi.
      // ➡ email() yêu cầu giá trị phải là một địa chỉ email hợp lệ.
      // ➡ required() yêu cầu trường này là bắt buộc.
      // ➡ min(6) yêu cầu độ dài tối thiểu của chuỗi là 6 ký tự.
      // ➡ allow("") cho phép giá trị là chuỗi rỗng.
      // ➡ optional() cho phép trường này không có giá trị (không bắt buộc).
      email: Joi.string().email().optional(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      password: Joi.string().allow('').min(6).optional(),
      name: Joi.string().required(),
      phone: Joi.string().optional(),
    })

    return schema.validate(data) // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = RegisterUserRequest
