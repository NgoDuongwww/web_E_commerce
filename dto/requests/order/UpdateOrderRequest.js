const Joi = require("joi");
const { OrderStatus } = require("../../../constants");

class UpdateOrderRequest {
  // ↳ Tạo một class để đại diện cho yêu cầu cập nhật đơn hàng.
  constructor(data) {
    // ↳ Hàm khởi tạo (constructor), nhận dữ liệu từ client gửi lên (thường là req.body).
    this.status = data.status; // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
  }

  static validate(data) {
    // ↳ Hàm tĩnh dùng để kiểm tra tính hợp lệ của dữ liệu.
    const schema = Joi.object({
      // ↳ Tạo một schema Joi để định nghĩa các ràng buộc (validate rules) cho từng trường.
      // ➡ number() yêu cầu giá trị phải là một số.
      // ➡ integer() yêu cầu giá trị phải là một số nguyên.
      // ➡ valid() yêu cầu giá trị phải trong một mảng.
      // ➡ string() yêu cầu giá trị phải là một chuỗi.
      // ➡ min(1) yêu cầu giá trị phải lớn hơn hoặc bằng 1.
      // ➡ string() yêu cầu giá trị phải là một chuỗi.
      // ➡ optional() cho phép trường đó không có trong dữ liệu gửi lên.
      // ➡ allow("") cho phép trường đó có thể là một chuỗi rỗng.
      status: Joi.number()
        .integer()
        .valid(...Object.values(OrderStatus))
        .optional(), // ➡ Mỗi dòng là một trường dữ liệu cần kiểm tra.
    });

    return schema.validate(data); // ➡ Thực hiện kiểm tra dữ liệu và trả về kết quả (có thể có error nếu không hợp lệ).
  }
}

module.exports = UpdateOrderRequest;
