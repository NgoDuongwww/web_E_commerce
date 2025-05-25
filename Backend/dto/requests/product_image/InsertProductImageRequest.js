const Joi = require("joi");

class insertProductImageRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm ảnh sản phẩm.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.image_url = data.image_url; // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.product_id = data.product_id;
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // string() yêu cầu giá trị phải là một chuỗi.
      // number() yêu cầu giá trị phải là một số.
      // required() yêu cầu trường đó là bắt buộc phải có trong dữ liệu gửi lên.
      // integer() yêu cầu giá trị phải là số nguyên.
      image_url: Joi.string().required(),
      product_id: Joi.number().integer().required(),
    });

    return schema.validate(data); // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = insertProductImageRequest;
