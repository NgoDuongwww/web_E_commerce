const Joi = require('joi')

class UpdateNewsRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu cập nhật tin tức.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.title = data.title // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.image = data.image
    this.content = data.content
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ string() yêu cầu trường đó phải là chuỗi.
      // ➡ uri() yêu cầu trường đó phải là một URL hợp lệ.
      // ➡ optional() cho phép trường đó có thể không có mặt trong dữ liệu (không bắt buộc).
      // ➡ allow("", null) cho phép trường đó có thể là chuỗi rỗng hoặc null.
      title: Joi.string().optional().allow('', null), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      image: Joi.string().uri().allow('', null).optional(),
      content: Joi.string().optional().allow('', null),
    })

    return schema.validate(data) // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = UpdateNewsRequest
