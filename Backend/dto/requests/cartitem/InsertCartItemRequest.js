const Joi = require('joi')

class InsertCartItemRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm chi tiết giỏ hàng.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.cart_id = data.cart_id // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.product_variant_id = data.product_variant_id
    this.quantity = data.quantity
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ number() yêu cầu trường đó phải là số.
      // ➡ integer() yêu cầu trường đó phải là số nguyên.
      // ➡ required() yêu cầu trường đó là bắt buộc phải có trong dữ liệu gửi lên.
      // ➡ min(1) yêu cầu trường đó phải lớn hơn hoặc bằng 1.
      cart_id: Joi.number().integer().required(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      product_variant_id: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).required(),
    })

    return schema.validate(data) // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = InsertCartItemRequest
