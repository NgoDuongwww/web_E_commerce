const Joi = require("joi");

class InsertNewsRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu thêm tin tức.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.title = data.title; // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
    this.image = data.image;
    this.content = data.content;
    this.product_ids = data.product_ids;
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ string() yêu cầu trường đó phải là chuỗi.
      // ➡ required() yêu cầu trường đó là bắt buộc phải có.
      // ➡ allow("", null) cho phép trường đó có thể là chuỗi rỗng hoặc null.
      // ➡ array() yêu cầu trường đó là một mảng.
      // ➡ items(Joi.number().integer()) yêu cầu trường đó là một mảng và mỗi phần tử trong mảng phải là số nguyên.
      title: Joi.string().required(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
      image: Joi.string().uri().allow("", null),
      content: Joi.string().required(),
      product_ids: Joi.array().items(Joi.number().integer()).required(),
    });

    return schema.validate(data); // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = InsertNewsRequest;
