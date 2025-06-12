const Joi = require('joi')

class InsertBannerDetailRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm chi tiết tin tức.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.product_id = data.product_id // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.banner_id = data.banner_id
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ number() yêu cầu trường này phải là một số.
      // ➡ integer() yêu cầu trường này phải là một số nguyên.
      // ➡ required() yêu cầu trường này là bắt buộc (không được để trống).
      product_id: Joi.number().integer().required(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      banner_id: Joi.number().integer().required(),
    })

    return schema.validate(data) // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = InsertBannerDetailRequest
