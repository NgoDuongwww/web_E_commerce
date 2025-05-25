const Joi = require("joi");

class UpdateFeedbackRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm tin tức.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.product_variant_id = data.product_variant_id; // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.user_id = data.user_id;
    this.order_id = data.order_id;
    this.star = data.star;
    this.content = data.content;
    this.is_visible = data.is_visible;
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ number() yêu cầu trường đó phải là số.
      // ➡ optional() yêu cầu trường đó là không bắt buộc (có thể bỏ qua).
      // ➡ integer() yêu cầu trường đó phải là số nguyên.
      // ➡ min(0) yêu cầu trường đó phải lớn hơn hoặc bằng 0.
      // ➡ max(5)  yêu cầu trường đó phải nhỏ hơn hoặc bằng 5.
      // ➡ text() yêu cầu trường đó phải là chuỗi văn bản.
      // ➡ boolean() yêu cầu trường đó phải là kiểu boolean (true/false).
      product_variant_id: Joi.number().integer().optional(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      user_id: Joi.number().integer().optional(),
      order_id: Joi.number().integer().optional(),
      star: Joi.number().integer().min(0).max(5).optional(),
      content: Joi.string().optional(),
      is_visible: Joi.boolean().optional(),
    });

    return schema.validate(data); // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = UpdateFeedbackRequest;
