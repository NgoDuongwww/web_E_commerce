const Joi = require('joi')

class InsertFeedbackRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm tin tức.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.product_variant_id = data.product_variant_id // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.user_id = data.user_id
    this.order_id = data.order_id
    this.star = data.star
    this.content = data.content
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ number() yêu cầu trường đó phải là số.
      // ➡ required() yêu cầu trường đó là bắt buộc phải có (không được bỏ qua).
      // ➡ integer() yêu cầu trường đó phải là số nguyên.
      // ➡ optional() yêu cầu trường đó là không bắt buộc (có thể bỏ qua).
      // ➡ min(0) yêu cầu trường đó phải lớn hơn hoặc bằng 0.
      // ➡ max(5)  yêu cầu trường đó phải nhỏ hơn hoặc bằng 5.
      // ➡ text() yêu cầu trường đó phải là chuỗi văn bản.
      product_variant_id: Joi.number().integer().required(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      user_id: Joi.number().integer().required(),
      order_id: Joi.number().integer().required(),
      star: Joi.number().integer().min(0).max(5).required(),
      content: Joi.string().optional(),
    })

    return schema.validate(data) // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = InsertFeedbackRequest
