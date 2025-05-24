const Joi = require("joi");

class UpdateDiscountRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm tin tức.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.code = data.code; // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.percent_value = data.percent_value;
    this.max_discount = data.max_discount;
    this.min_total = data.min_total;
    this.brand_id = data.brand_id;
    this.category_id = data.category_id;
    this.expires_at = data.expires_at;
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ string() yêu cầu trường đó phải là chuỗi.
      // ➡ optional() yêu cầu trường đó là không bắt buộc phải có (có thể bỏ qua).
      // ➡ number() yêu cầu trường đó phải là số.
      // ➡ integer() yêu cầu trường đó phải là số nguyên.
      // ➡ min(0) yêu cầu trường đó phải lớn hơn hoặc bằng 0.
      // ➡ max(100) yêu cầu trường đó phải nhỏ hơn hoặc bằng 100.
      // ➡ date() yêu cầu trường đó phải là một ngày hợp lệ.
      // ➡ greater("now") yêu cầu trường đó phải lớn hơn ngày hiện tại.
      code: Joi.string().optional(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      percent_value: Joi.number().min(0).max(100).optional(),
      max_discount: Joi.number().min(0).optional(),
      min_total: Joi.number().min(0).optional(),
      brand_id: Joi.number().integer().optional(),
      category_id: Joi.number().integer().optional(),
      expires_at: Joi.date().greater("now").optional(),
    });

    return schema.validate(data); // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = UpdateDiscountRequest;
