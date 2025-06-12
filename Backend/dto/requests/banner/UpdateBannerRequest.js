const Joi = require('joi')

class UpdateBannerRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm tin tức.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.name = data.name // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.image = data.image
    this.status = data.status
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ string() yêu cầu trường đó phải là chuỗi.
      // ➡ optional() yêu cầu trường đó là không bắt buộc phải có.
      // ➡ uri() yêu cầu trường đó phải là một URL hợp lệ.
      // ➡ allow("", null) cho phép trường đó có thể là chuỗi rỗng hoặc null.
      // ➡ number() yêu cầu trường đó phải là số.
      // ➡ integer() yêu cầu trường đó phải là số nguyên.
      // ➡ min(1) yêu cầu trường đó phải lớn hơn hoặc bằng 1.
      name: Joi.string().optional(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      image: Joi.string().allow('', null).optional(),
      status: Joi.number().integer().min(1).optional(),
    })

    return schema.validate(data) // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = UpdateBannerRequest
